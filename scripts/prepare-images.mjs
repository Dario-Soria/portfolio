// Resizes the raw originals into web-ready images in src/assets/work/<slug>/.
// - max 2400px on the long edge, JPEG (mozjpeg); Astro turns them into WebP + srcset at build
// - auto-rotates from EXIF, then writes NO metadata (removes GPS, camera serials, timestamps)
// Usage: npm run images
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'originals');
const OUT = path.join(ROOT, 'src', 'assets', 'work');
const MAX = 2400;

// Photo series: folder in originals/ -> slug
const SERIES = {
  '202602 - San Francisco': 'san-francisco',
  '202312 - San Telmo': 'san-telmo',
  '202305 - Cataratas': 'iguazu',
};

// Drawings were photographed on a desk: crop to the paper, rotate, tone.
// extract = { left, top, width, height } in the original's pixels (full-res files from Creativity.zip).
const DRAWINGS = {
  'flor-del-ciruelo': { extract: { left: 944, top: 136, width: 6000, height: 5800 } },
  'birdcage': { extract: { left: 600, top: 12, width: 2640, height: 1756 } },
  'lilies': { extract: { left: 0, top: 0, width: 6000, height: 8000 }, tone: true },
  'hand-studies': { extract: { left: 143, top: 8, width: 2703, height: 3850 }, rotate: -90 },
};

async function writeJpeg(pipeline, file) {
  await pipeline
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(file); // sharp drops all metadata unless .withMetadata() is called
}

for (const [folder, slug] of Object.entries(SERIES)) {
  const dir = path.join(SRC, folder);
  const files = (await fs.readdir(dir)).filter((f) => /\.jpe?g$/i.test(f)).sort();
  await fs.mkdir(path.join(OUT, slug), { recursive: true });
  for (const f of files) {
    const out = path.join(OUT, slug, f.replace(/\.jpe?g$/i, '.jpg').toLowerCase());
    await writeJpeg(sharp(path.join(dir, f)).rotate(), out);
    console.log('✓', slug, f);
  }
}

await fs.mkdir(path.join(OUT, 'drawings'), { recursive: true });
for (const [name, cfg] of Object.entries(DRAWINGS)) {
  let p = sharp(path.join(SRC, 'drawings', `${name}.jpg`)).rotate().extract(cfg.extract);
  if (cfg.rotate) p = sharp(await p.toBuffer()).rotate(cfg.rotate);
  if (cfg.tone) p = p.modulate({ saturation: 0.35 }).normalise({ lower: 1, upper: 99 });
  await writeJpeg(p, path.join(OUT, 'drawings', `${name}.jpg`));
  console.log('✓ drawing', name);
}

// Social-share preview image (shown when the link is pasted in LinkedIn, email, etc.)
await sharp(path.join(OUT, 'san-francisco', 'dsc_0004.jpg'))
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(ROOT, 'public', 'og.jpg'));
console.log('✓ og.jpg');

import type { ImageMetadata } from 'astro';
import arrangement from './arrangement.json';

// All prepared images (output of `npm run images`).
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/work/**/*.jpg', {
  eager: true,
});

function img(path: string): ImageMetadata {
  const mod = files[`../assets/work/${path}`];
  if (!mod) throw new Error(`Missing image: src/assets/work/${path}`);
  return mod.default;
}

export interface Photo {
  /** "<folder>/<file>", e.g. "san-francisco/dsc_0004" — used by arrangement.json */
  id: string;
  src: ImageMetadata;
  alt: string;
  hidden?: boolean;
}

export interface Project {
  hidden?: boolean;
  slug: string;
  title: string;
  year: string;
  categories: string[];
  /** Rows in the "Information" box: [label, value] */
  info: [string, string][];
  description: string;
  /** Default cover. Once a project is arranged, its first visible photo is the cover. */
  cover: ImageMetadata;
  /** CSS object-position for the cover crop on the home grid */
  coverPosition?: string;
  images: Photo[];
}

const photos = (folder: string, list: [string, string][]): Photo[] =>
  list.map(([file, alt]) => ({ id: `${folder}/${file}`, src: img(`${folder}/${file}.jpg`), alt }));

// ─────────────────────────────────────────────────────────────
// ORDER AND HIDING live in arrangement.json, edited with the
// local editor: `npm run dev`, then open http://localhost:4321/arrange
// The list below holds titles, text and captions. Photos not yet
// in arrangement.json keep the order given here.
// ─────────────────────────────────────────────────────────────
const allProjects: Project[] = [
  {
    slug: 'san-francisco',
    title: 'San Francisco',
    year: '2026',
    categories: ['Photography'],
    info: [
      ['Location', 'San Francisco, USA'],
      ['Camera', 'Nikon D7500'],
    ],
    description:
      'Street and architecture photography across San Francisco: Chinatown’s Dragon Gate, the Transamerica Pyramid, North Beach, Lombard Street and the Palace of Fine Arts. The series looks for strong colour and the layered geometry of a city built on hills.',
    cover: img('san-francisco/dsc_9957.jpg'),
    images: photos('san-francisco', [
      ['dsc_0004', 'Golden Gate Bridge over the bay under a streaked blue sky'],
      ['dsc_9957', 'Dragon Gate at the entrance to Chinatown'],
      ['dsc_9956', 'Dragon Gate and the green-tiled rooflines of Chinatown'],
      ['dsc_9962', 'Transamerica Pyramid seen from Grant Avenue beside a painted mural'],
      ['dsc_9972', 'Cable car approaching down a sunlit street'],
      ['dsc_9967', 'North Beach rooftops and the twin spires of Saints Peter and Paul Church'],
      ['dsc_9978', 'Coit Tower above a dense hillside of houses'],
      ['dsc_9981', 'Narrow alley framing a view of the bay'],
      ['dsc_9992', 'Palace of Fine Arts rotunda reflected in its lagoon at golden hour'],
      ['dsc_9973', 'The curves of Lombard Street'],
      ['dsc_0007', 'The Painted Ladies above Alamo Square park'],
      ['dsc_9989', 'Painted heart sculpture on a street corner'],
      ['dsc_9987', 'Union Square tunnel lettering in yellow'],
      ['dsc_9959', 'Chinatown street corner with a vintage police call box'],
    ]),
  },
  {
    slug: 'hand-studies',
    title: 'Hand Studies',
    year: '2026',
    categories: ['Drawing', 'Ink'],
    info: [
      ['Medium', 'Ink on paper'],
      ['Format', 'Sketchbook spread'],
    ],
    description:
      'Timed three-minute observational studies of hands in continuous pen line. The time limit forces decisions about gesture and proportion before detail — an exercise in seeing quickly and committing to the line.',
    cover: img('drawings/hand-studies.jpg'),
    coverPosition: '40% 50%',
    images: photos('drawings', [['hand-studies', 'Sketchbook page of four quick pen studies of hands']]),
  },
  {
    slug: 'san-telmo',
    title: 'San Telmo',
    year: '2023',
    categories: ['Photography', 'Portrait'],
    info: [
      ['Location', 'Buenos Aires, Argentina'],
      ['Camera', 'Nikon D7500'],
    ],
    description:
      'An environmental portrait session through the passages, antique shops and markets of San Telmo, Buenos Aires’ oldest neighbourhood. The work balances the subject with the saturated colour and texture of the barrio — coloured light, old mirrors, umbrellas and hand-painted signs.',
    cover: img('san-telmo/dsc_8242.jpg'),
    images: photos('san-telmo', [
      ['dsc_8238', 'Colourful umbrellas suspended over a passage'],
      ['dsc_8242', 'Woman looking back over her shoulder in a busy arcade'],
      ['dsc_8251', 'Portrait under magenta light beside an iron grille'],
      ['dsc_8264', 'Portrait framed inside a vintage yellow television set'],
      ['dsc_8252', 'Reflection in a coloured glass window'],
      ['dsc_8231', 'Looking up towards tall windows in a weathered courtyard'],
      ['dsc_8230', 'Profile looking up in a weathered courtyard'],
      ['dsc_8239', 'White, yellow and blue umbrellas hanging overhead'],
      ['dsc_8240', 'Hand-lettered sign: “La felicidad es ese pedacito de tiempo…”'],
      ['dsc_8235', 'Smiling reflection in an antique shop mirror'],
      ['dsc_8249', 'Profile against a purple wall with climbing plants'],
      ['dsc_8260', 'Antique shop table with feathers and glassware'],
    ]),
  },
  {
    slug: 'iguazu',
    title: 'Iguazú',
    year: '2023',
    categories: ['Photography', 'Wildlife'],
    info: [
      ['Location', 'Iguazú Falls'],
      ['Camera', 'Nikon D7500, GoPro HERO11'],
    ],
    description:
      'Wildlife and landscape around Iguazú Falls. Close bird portraits isolated against soft backgrounds, alongside the falls and the Atlantic rainforest that surrounds them.',
    cover: img('iguazu/dsc_7065.jpg'),
    images: photos('iguazu', [
      ['dsc_7107', 'Waterfalls glimpsed through the rainforest'],
      ['dsc_7065', 'Flamingo portrait in profile'],
      ['dsc_7069', 'Curassow portrait with barred plumage'],
      ['dsc_7091', 'Green parakeet portrait against a deep blue background'],
      ['dsc_7074', 'Parrot portrait against black'],
      ['gopr0032_1685471835334', 'Looking up into the rainforest canopy'],
      ['gopr0019_alta1266905402674517775', 'Wide-angle self-portrait above the falls'],
      ['gopr0051_1685471835334', 'Wide-angle view of a timber pavilion among the trees'],
    ]),
  },
  {
    slug: 'birdcage',
    title: 'Birdcage',
    year: '2023',
    categories: ['Ink', 'Watercolour'],
    info: [
      ['Medium', 'Ink and watercolour on paper'],
      ['Date', '13 June 2023'],
    ],
    description:
      'The domed top of an ornate birdcage rendered in tight parallel hatching and cross-hatching, set against a loose, wet green wash. The contrast between controlled line and uncontrolled water is the point of the piece.',
    cover: img('drawings/birdcage.jpg'),
    coverPosition: '28% 50%',
    images: photos('drawings', [['birdcage', 'Ink drawing of a domed birdcage with a green watercolour wash']]),
  },
  {
    slug: 'flor-del-ciruelo',
    title: 'Flor del Ciruelo',
    year: '2023',
    categories: ['Watercolour', 'Ink'],
    info: [['Medium', 'Ink and watercolour on paper']],
    description:
      'A single plum blossom drawn in fine pen over layered watercolour, with soft blooms of colour behind it and a handwritten verse: “En el templo de la flor del ciruelo, las voces se elevan desde las colinas.”',
    cover: img('drawings/flor-del-ciruelo.jpg'),
    coverPosition: '55% 50%',
    images: photos('drawings', [
      ['flor-del-ciruelo', 'Watercolour and ink plum blossom with a handwritten Spanish verse'],
    ]),
  },
  {
    slug: 'lilies',
    title: 'Lilies',
    year: '2023',
    categories: ['Ink'],
    info: [['Medium', 'Ink on paper']],
    description:
      'Two lilies and surrounding foliage in black ink, built from contour line, directional hatching, cross-hatched leaves and stippled petals.',
    cover: img('drawings/lilies.jpg'),
    images: photos('drawings', [['lilies', 'Pen and ink drawing of two lilies with leaves and buds']]),
  },
];

// ── Apply arrangement.json (order + hidden) ─────────────────
interface Arrangement {
  projects: string[];
  hiddenProjects: string[];
  photos: Record<string, string[]>;
  hidden: string[];
}
const arr = arrangement as Arrangement;

/** Sort by a saved order; anything not in it keeps its original place after the saved ones. */
function byOrder<T>(items: T[], key: (t: T) => string, order: string[] | undefined): T[] {
  if (!order?.length) return items;
  const pos = new Map(order.map((k, i) => [k, i]));
  const rank = (t: T, i: number) => pos.get(key(t)) ?? order.length + i;
  return items
    .map((t, i) => [t, rank(t, i)] as const)
    .sort((a, b) => a[1] - b[1])
    .map(([t]) => t);
}

/** Every project and photo, in display order, with hidden flags — used by the editor. */
export const arrangedProjects: Project[] = byOrder(allProjects, (p) => p.slug, arr.projects).map((p) => {
  // Not arranged yet: default cover goes first
  const defaultOrder = [p.images.find((ph) => ph.src.src === p.cover.src)?.id ?? ''];
  const images = byOrder(p.images, (ph) => ph.id, arr.photos[p.slug] ?? defaultOrder).map((ph) => ({
    ...ph,
    hidden: arr.hidden.includes(ph.id),
  }));
  return { ...p, hidden: arr.hiddenProjects.includes(p.slug), images };
});

/** What the site shows: hidden photos/projects removed; first visible photo is the cover. */
export const projects: Project[] = arrangedProjects.flatMap((p) => {
  const images = p.images.filter((ph) => !ph.hidden);
  if (p.hidden || images.length === 0) return [];
  const cover = images[0].src;
  return [{ ...p, images, cover, coverPosition: cover.src === p.cover.src ? p.coverPosition : undefined }];
});

export const projectIndex =(p: Project) => String(projects.indexOf(p) + 1).padStart(2, '0');

# Portfolio

Photography and illustration portfolio built with [Astro](https://astro.build). It's a static site that deploys to Vercel or GitHub Pages.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
```

## Edit content

| What | Where |
|---|---|
| Name, tagline, bio, contact links, CV | `src/data/site.ts` (look for `TODO`) |
| Projects: order, titles, text, which photos | `src/data/projects.ts` |
| Colours, spacing, corner radius, font | `src/styles/global.css` (`:root`) |
| CV download | put `cv.pdf` in `public/`, then set `cv: 'cv.pdf'` in `site.ts` |

## Add or update photos

Raw originals go in `originals/` (git-ignored, never uploaded):

```
originals/
  202602 - San Francisco/   ← folder names are mapped to slugs in scripts/prepare-images.mjs
  drawings/
```

Then run:

```bash
npm run images
```

This resizes everything to max 2400px into `src/assets/work/<slug>/` and **removes all EXIF metadata, including GPS location**. Astro then generates WebP versions in several sizes at build time.

For a new series: add the folder → slug line in `SERIES` in `scripts/prepare-images.mjs`, run `npm run images`, and add a project entry in `src/data/projects.ts`.

## Deploy

**Vercel (recommended)**
1. Push this folder to a GitHub repo.
2. On vercel.com, click New Project, import the repo, and keep the defaults (it detects Astro).
3. Optional: under Settings → Environment Variables, set `SITE_URL` to your final URL so link previews show the image.

**GitHub Pages**
1. Push to a repo, then go to Settings → Pages → Source: **GitHub Actions**.
2. `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
3. If the repo is named `<username>.github.io`, change `BASE_PATH` in the workflow to `/`.

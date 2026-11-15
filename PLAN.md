# Portfolio Website — Build Plan

A professional photography + illustration portfolio for employers, using the layout and interaction style of yuriroga.com, hosted for free as a static site.

---

## 1. What the reference design actually is

From inspecting yuriroga.com in a browser:

| Element | How it looks / behaves |
|---|---|
| **Overall** | White page, black text, tiny type (10px Helvetica/Arial, 0.8px letter-spacing). Images do all the talking. |
| **Header** | One row of 4 equal columns of light-grey (#f4f4f4) **pill bars** (fully rounded), ~6px gap, sticky at the top and slightly translucent over images. |
| — col 1–2 | Name in bold caps on the left, tagline ("Creative Direction + Visual Production") right-aligned. |
| — col 3 | **Work ▾** pill — opens a frosted-glass dropdown table: `#  Title  Categories  Year`, one row per project. |
| — col 4 | **About ▾** pill — opens an accordion: Information, Services, Clients, Contact. |
| **Home** | Large empty band under the header, then a **4-column grid of tall cards** (≈3:4 portrait) with very large corner radius (~45px) and ~6px gutters. |
| **Hover** | A small grey pill with the project name follows the cursor over each card. |
| **Project page** | Col 1: grey rounded **info panel** (Information: client/categories/year → Description → Credits), sticky. Col 2: "Back to Overview ◂" pill. Cols 3–4: image stack — one wide image spanning both columns, then pairs of tall images, all with the same big radius. |
| **Footer** | Email + Instagram icons, credit line, © year. |

We copy the **layout, spacing and interactions**, not their code, text, logo or images. All CSS/JS is written from scratch.

---

## 2. Content inventory

### Photography (from the 3 zips — 34 photos, ~400 MB total)
| Series | File | Photos | Date |
|---|---|---|---|
| San Francisco | `202602 - San Francisco-1-001.zip` | 14 | Feb 2026 |
| San Telmo (Buenos Aires) | `202312 - San Telmo-1-001.zip` | 12 | Dec 2023 |
| Cataratas del Iguazú | `202305 - Cataratas-1-001.zip` | 8 (5 Nikon + 3 GoPro) | May 2023 |

Originals are 4–25 MB each — far too heavy for the web. They must be resized (see §4).

### Drawings (the 4 attached images)
| Title | Technique | Year |
|---|---|---|
| Flor del ciruelo (plum blossom + haiku) | Ink + watercolour | ? |
| Birdcage dome | Ink hatching + watercolour wash | Jun 2023 (signed "dari") |
| Lilies | Ink, hatching & stippling | ? |
| Hand studies — "3 minute exercises" | Ink line, timed studies | Apr 2026 |

**Problem:** these are phone photos with the desk, keyboard, monitor and a hand in frame, some at an angle and one rotated 90°. They need cropping, straightening and white-balance before they go on the site (or, better, re-scan/re-photograph flat in daylight).

### Proposed Work index (the dropdown table + home grid)
```
#   Title                    Categories              Year
01  San Francisco            Photography             2026
02  Hand Studies             Drawing, Ink            2026
03  San Telmo                Photography             2023
04  Iguazú Falls             Photography             2023
05  Birdcage                 Ink, Watercolour        2023
06  Flor del Ciruelo         Watercolour, Ink        ----
07  Lilies                   Ink                     ----
```
7 cards = 2 rows on desktop (4 + 3). Option: add an 8th card (e.g. a "Sketchbook" collection or another series) to fill the grid.

---

## 3. Tech stack & hosting

**Recommendation: Astro (static) → deployed on Vercel.**

- **Astro** outputs plain HTML/CSS with almost no JavaScript, which is ideal for an image portfolio. Projects live as Markdown files, so adding a new series is "drop photos in a folder + write a 10-line `.md`". Its built-in `<Image>` component generates responsive WebP/AVIF sizes automatically.
- **Vercel**: connect the GitHub repo and every push deploys. Free tier, HTTPS, preview URLs for each branch, and a custom domain if you want one.
- **GitHub Pages alternative**: same Astro project plus a GitHub Actions workflow (`withastro/action`). The site would live at `username.github.io/portfolio` unless you add a custom domain. Both are free; Vercel is less setup.

(If you'd rather avoid any build tool, plain `index.html` + `project.html` + vanilla JS works too, but you'd maintain the image sizes by hand.)

---

## 4. Image pipeline

1. Unzip originals into `originals/` (git-ignored; never committed, too large).
2. A script (`scripts/prepare-images.mjs` using **sharp**) for each photo:
   - resize to max 2400px long edge (full view) + 900px (grid thumbnail)
   - export WebP (~85 quality) and a JPG fallback
   - **strip EXIF metadata**, including GPS coordinates, camera serials and timestamps (important for privacy)
   - auto-rotate from EXIF orientation
3. Output to `src/assets/work/<series>/`. Target: under 400 KB per full image, under 120 KB per thumbnail.
4. Drawings get cropped and corrected manually first (Photoshop/GIMP/Lightroom, or a phone scanner app), then go through the same script.
5. Curate: pick **6–10 strongest** photos per series. Employers judge you by your weakest image, so cut anything that's merely "fine".

---

## 5. Project structure

```
portfolio/
├─ originals/                 # raw unzipped files (git-ignored)
├─ scripts/prepare-images.mjs
├─ public/
│  ├─ cv.pdf                  # downloadable CV
│  └─ favicon.svg
├─ src/
│  ├─ assets/work/<series>/   # optimized images
│  ├─ content/work/           # one .md per project (frontmatter below)
│  ├─ components/
│  │  ├─ Header.astro         # 4 pill bars
│  │  ├─ WorkDropdown.astro   # frosted index table
│  │  ├─ AboutDropdown.astro  # accordion
│  │  ├─ ProjectCard.astro    # rounded tall card
│  │  ├─ CursorLabel.astro    # pill that follows the mouse
│  │  ├─ InfoPanel.astro      # project info box
│  │  └─ Lightbox.astro       # click image → fullscreen, ← → keys
│  ├─ layouts/Base.astro
│  ├─ pages/
│  │  ├─ index.astro          # grid
│  │  └─ work/[slug].astro    # project page
│  └─ styles/global.css
└─ astro.config.mjs
```

Project frontmatter:
```yaml
title: San Telmo
order: 3
year: 2023
categories: [Photography]
location: Buenos Aires, Argentina
camera: Nikon D…            # optional
cover: ./cover.webp
description: >
  Street photography in Buenos Aires' oldest barrio…
images: [01.webp, 02.webp, …]
```

---

## 6. Design tokens

```css
--bg: #ffffff;   --fg: #000;   --muted: #9a9a9a;
--pill: #f4f4f4; --glass: rgba(240,240,240,.75) + backdrop-filter: blur(20px);
--gap: 6px;      --radius-card: 44px;   --radius-pill: 999px;
--font: "Helvetica Neue", Helvetica, Arial, sans-serif;
--fs: 10px (body/nav), letter-spacing .06em; section labels uppercase + muted.
```
Responsive: 4 cols ≥1024px → 2 cols ≥600px → 1 col on phones. On mobile the 4 header pills collapse to 2 (name | Menu), and the cursor label is turned off since touch screens have no hover.

The tiny type is a stylistic choice of the reference. For employers and accessibility, consider 12–13px with the same feel.

---

## 7. Pages & content to write

- **Home**: grid of 7 cards, cover image, hover label = title.
- **Project page** (×7): info panel (Information / Description / Details: camera, technique, location) + image stack + lightbox + "Next project →" at the bottom.
- **About dropdown**:
  - *Information*: 3–4 sentence bio aimed at the job you're applying for
  - *Disciplines*: Photography · Ink illustration · Watercolour · Observational drawing
  - *Tools*: cameras, GoPro, Lightroom, pens/brushes…
  - *Contact*: email, Instagram, LinkedIn, **Download CV**
- **Footer**: contact icons, © 2026.
- **SEO/sharing**: `<title>`, meta description, Open Graph image (a strong cover photo), so the link looks good when pasted into an email or LinkedIn.

---

## 8. Build order

1. **Set up**: `npm create astro@latest`, git init, push to GitHub, connect Vercel. You get a live URL on day one.
2. **Images**: unzip, curate, run `prepare-images` script; crop/correct the drawings.
3. **Global styles + Header** (pills, sticky, translucent).
4. **Home grid + cursor label.**
5. **Work dropdown table + About accordion** (keyboard accessible, closes on Esc / outside click).
6. **Project page template + lightbox.**
7. **Write content**: 7 project `.md` files, bio, CV.
8. **Polish**: mobile layout, lazy loading, fade-in on load, favicon, OG image, 404 page.
9. **QA**: Lighthouse (aim for 90+ performance), test on phone, check that no EXIF/GPS remains, proofread.
10. **Launch**: optional custom domain (~$10–15/yr), add the link to CV/LinkedIn.

Estimated effort: ~1–2 days of build plus your curation/writing time.

---

## 9. Decisions needed from you

1. **Name & tagline** for the header (e.g. "DARIO SORIA — Photography + Illustration"?).
2. **Language**: English, Spanish, or both (a language toggle adds some work).
3. **Vercel or GitHub Pages**, and whether you want a custom domain.
4. **Contact links** to show (email, Instagram, LinkedIn) and a **CV PDF**.
5. **What kind of role** you're targeting, which shapes the bio and which work leads the grid.
6. Years for *Flor del Ciruelo* and *Lilies*, and titles/captions for any photos you want named.
7. Can you provide **better scans** of the drawings, or should we crop the phone photos?

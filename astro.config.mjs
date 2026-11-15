import { defineConfig } from 'astro/config';

// SITE_URL: your final address (used for social-share image links).
// BASE_PATH: only for GitHub Pages project sites, e.g. '/portfolio'. Leave unset on Vercel.
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  base: process.env.BASE_PATH || '/',
});

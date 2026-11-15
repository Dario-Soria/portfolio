// Builds links that respect Astro's `base` (needed for GitHub Pages project sites).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path = '') => `${base}/${path.replace(/^\//, '')}`;

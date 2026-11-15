// ─────────────────────────────────────────────────────────────
// Site-wide text. Edit this file to change name, bio and links.
// Facts below come from Dario's LinkedIn profile (Nov 2026).
// ─────────────────────────────────────────────────────────────

export interface ListItem {
  text: string;
  meta?: string; // shown muted on the right (dates, etc.)
  href?: string;
}

export const site = {
  name: 'Dario Soria',
  tagline: 'Photography + Illustration + Code',
  description:
    'Dario Soria — photography, ink and watercolour illustration, and software. Based in Greater Buenos Aires, Argentina.',

  about: {
    information: [
      'I’m Dario Soria, based in Greater Buenos Aires. I make things across disciplines (photography, ink and watercolour, music and software), and I approach them all the same way: look closely, find the structure, and edit down to what matters.',
      'By trade I build software. I spent 15+ years in enterprise automation, pre-sales and professional services, most recently as an AI Solutions Engineer at DevRev. Today I design and ship my own AI-powered products end to end.',
      'Away from the screen I’m training as a mountain guide at Centro Andino Buenos Aires.',
    ],

    // Each section becomes a collapsible row in the About menu.
    sections: [
      {
        title: 'Disciplines',
        items: [
          { text: 'Travel, street & portrait photography' },
          { text: 'Wildlife photography' },
          { text: 'Pen & ink illustration' },
          { text: 'Watercolour' },
          { text: 'Observational drawing' },
          { text: 'Music' },
          { text: 'Software & AI product development' },
        ],
      },
      {
        title: 'Things I’ve built',
        items: [
          { text: 'Postty — AI marketing agent for small businesses', href: 'https://www.posttyai.com/' },
          { text: 'Amoblalo — AI furniture design & DIY plans', href: 'https://amoblalo.com.ar' },
          { text: 'Flasheala — event-photo app with beat-synced videos', href: 'https://flasheala.com.ar' },
          { text: 'Dosaly — health-tracking web app', href: 'https://dosaly.com.ar' },
        ],
      },
      {
        title: 'Experience',
        items: [
          { text: 'Founder & Engineer, Independent AI & Digital Products', meta: '2026–' },
          { text: 'AI Solutions Engineer, DevRev', meta: '2025–26' },
          { text: 'Sr. Manager Professional Services, Fortra', meta: '2022–25' },
          { text: 'Professional Services, HelpSystems', meta: '2012–22' },
          { text: 'Technical Consultant, Tango/04', meta: '2007–12' },
        ],
      },
      {
        title: 'Education',
        items: [
          { text: 'Systems Engineering, Universidad Tecnológica Nacional' },
          { text: 'Mountain Guide (Técnico Superior), Centro Andino Buenos Aires' },
        ],
      },
      {
        title: 'Tools',
        items: [
          { text: 'Nikon D7500 · GoPro HERO11 Black' },
          { text: 'Pen & ink · Watercolour' },
          { text: 'Python · TypeScript · Next.js · Flask' },
          { text: 'Claude · Gemini · AWS · Cloudflare' },
        ],
      },
    ] satisfies { title: string; items: ListItem[] }[],
  },

  contact: {
    location: 'Greater Buenos Aires, Argentina',
    email: 'ds.dariosoria@gmail.com',
    instagram: '', // e.g. 'https://instagram.com/yourhandle' (leave '' to hide)
    linkedin: 'https://www.linkedin.com/in/dario-soria-11198324/',
    cv: '', // put cv.pdf in /public and set to 'cv.pdf' (leave '' to hide)
  },
};

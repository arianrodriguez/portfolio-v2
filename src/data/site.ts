/** Single source of truth for personal / contact info. */
export const site = {
  name: 'Arian Rodriguez',
  brand: 'arian dev',
  role: 'Software Engineer · AI Specialist',
  location: 'Lima, PE',
  email: 'arianmrv12@gmail.com',
  phone: '+51 946 547 814',
  phoneHref: '+51946547814',
  locationFull: 'Lima, Perú · Remoto global',
  /** Drop your real photo URL here (e.g. an import from /src/assets). */
  heroPhoto: undefined as string | undefined,
  social: {
    linkedin: '#',
    github: '#',
  },
} as const;

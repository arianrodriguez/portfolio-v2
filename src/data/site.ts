import mePhoto from '@/assets/me.jpeg';

/** Single source of truth for personal / contact info. */
export const site = {
  name: 'Arian Rodriguez',
  brand: 'ariandev',
  role: 'Software Engineer',
  location: 'Lima, PE',
  email: 'arianmrv12@gmail.com',
  phone: '+51 946 547 814',
  phoneHref: '+51946547814',
  locationFull: 'Lima, Perú · Remoto global',
  heroPhoto: mePhoto as string | undefined,
  social: {
    linkedin: 'https://www.linkedin.com/in/arianrodriguezv/',
    github: 'https://github.com/arianrodriguez',
  },
} as const;

import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'cariotipado',
    number: 'P.01 — Genética + IA',
    badge: 'Visión por computadora',
    title: 'Cariotipado Digital',
    role: 'Identificación cromosómica automatizada',
    description:
      'Herramienta de análisis de cariotipos que detecta, segmenta y clasifica cromosomas mediante un modelo de visión entrenado a medida — acelerando el diagnóstico genético con precisión repetible.',
    tags: ['Computer Vision', 'Python', 'Bioinformática', 'Deep Learning'],
    stats: [
      { value: '46+', label: 'cromosomas / muestra' },
      { value: '~95%', label: 'precisión de clasificación' },
    ],
    imagePlaceholder: 'Screenshot — Cariotipado Digital',
    caseHref: '#contacto',
  },
  {
    id: 'skeen',
    number: 'P.02 — Salud + IA móvil',
    badge: 'App móvil · Salud',
    title: 'Skeen — Dermatología Inteligente',
    role: 'Detección temprana de cáncer de piel',
    description:
      'Aplicación móvil que analiza lesiones cutáneas con un modelo entrenado de clasificación dermatológica, ofreciendo una evaluación de riesgo instantánea desde la cámara del teléfono.',
    tags: ['Visión Artificial', 'Mobile', 'ML', 'Salud'],
    stats: [
      { value: 'On-device', label: 'análisis en segundos' },
      { value: 'Privado', label: 'imagen no sale del móvil' },
    ],
    imagePlaceholder: 'Screenshot — App Skeen',
    reversed: true,
    caseHref: '#contacto',
  },
  {
    id: 'aethelred',
    number: 'P.03 — Comercio + IA',
    badge: 'E-commerce · IA',
    title: 'Aethelred — Ecommerce Inteligente',
    role: 'Tienda con precios dinámicos y recomendación',
    description:
      'Plataforma de comercio de alto rendimiento con motor de recomendaciones, precios dinámicos asistidos por IA y una arquitectura optimizada para conversión y costos operativos.',
    tags: ['Next.js', 'Recomendación IA', 'Precios Dinámicos', 'UX'],
    stats: [
      { value: 'Headless', label: 'arquitectura escalable' },
      { value: '+ Conversión', label: 'recomendación personalizada' },
    ],
    imagePlaceholder: 'Screenshot — Ecommerce con IA',
    caseHref: '#contacto',
  },
];

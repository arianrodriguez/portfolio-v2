import type { Project } from '@/types';
import cariotipado from '@/assets/cariotipado.png';
import skeen from '@/assets/skeen.png';
import volcanizado from '@/assets/volcanizado.png';

export const projects: Project[] = [
  {
    id: 'cariotipado',
    number: 'P.01 — Genética + IA',
    badge: 'Visión por computadora',
    title: 'Cariotipado Digital',
    role: 'Identificación cromosómica automatizada',
    description:
      'Modelo basado en visión por computadora para identificar, clasificar y recuentar automáticamente cromosomas a partir de imágenes de metafase. Se entrenó con un dataset de cariotipos humanos para detectar anomalías cromosómicas.',
    tags: ['Python', 'Bioinformática', 'Deep Learning', 'OpenCV'],
    stats: [
      { value: '46+', label: 'cromosomas / muestra' },
      { value: '~95%', label: 'precisión de clasificación' },
    ],
    imageSrc: cariotipado,
    imagePlaceholder: 'Screenshot — Cariotipado Digital',
    caseHref: '#contacto',
  },
  {
    id: 'skeen',
    number: 'P.02 — Salud + IA móvil',
    badge: 'App móvil · Salud',
    title: 'skeen — Dermatología Inteligente',
    role: 'Detección temprana de cáncer de piel',
    description:
      'Aplicación móvil que analiza lesiones cutáneas con un modelo entrenado de clasificación dermatológica, ofreciendo una evaluación de riesgo instantánea desde la cámara del teléfono.',
    tags: ['Realidad Aumentada', 'Flutter', 'Deep Learning', 'Salud'],
    stats: [
      { value: 'On-device', label: 'análisis en segundos' },
      { value: 'Privado', label: 'imagen no sale del móvil' },
    ],
    imageSrc: skeen,
    imageFit: 'contain',
    imagePlaceholder: 'Screenshot — App skeen',
    reversed: true,
    caseHref: '#contacto',
  },
  {
    id: 'volcanizado',
    number: 'P.03 — Ecommerce',
    badge: 'E-commerce',
    title: 'volcanizado',
    role: 'Tienda de minerales y cristales.',
    description:
      'Plataforma de comercio electrónico especializada en la venta de minerales y cristales con sistema de búsqueda avanzado y pasarela de pagos integrada.',
    tags: ['TypeScript', 'UX', 'Shopify'],
    stats: [
      { value: 'Headless', label: 'arquitectura escalable' },
      { value: '+ Conversión', label: 'recomendación personalizada' },
    ],
    imageSrc: volcanizado,
    imagePlaceholder: 'Screenshot — Ecommerce',
    caseHref: '#contacto',
  },
];

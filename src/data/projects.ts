import type { Project } from '@/types';
import cariotipado from '@/assets/cariotipado.png';
import impulza from '@/assets/impulza.jpg';
import skeen from '@/assets/skeen.png';
import volcanizado from '@/assets/volcanizado.png';

export const projects: Project[] = [
  {
    id: 'impulza',
    number: 'P.01 — Producto + IA',
    badge: 'Producto full-stack',
    title: 'impulza.pe',
    role: 'Plataforma de empleabilidad con IA',
    description:
      'Plataforma propia para impulza.pe: generador de CV optimizado con IA (formato ATS), catálogo de cursos con video propio, y suscripciones con pagos recurrentes. Arquitectura completa desde cero: frontend, backend serverless, base de datos y modelo de IA integrado.',
    tags: ['React', 'Supabase', 'Claude API', 'Vercel', 'Mercado Pago'],
    stats: [
      { value: '<30s', label: 'generación de CV optimizado con IA' },
      { value: '100%', label: 'compatible con filtros ATS' },
    ],
    // Captura actual del landing (1550×860). Reemplaza src/assets/impulza.png si
    // prefieres mostrar el generador de CV o el catálogo de cursos.
    imageSrc: impulza,
    imagePlaceholder: 'Screenshot — impulza.pe',
    // Imagen a la derecha: espejo de Cariotipado Digital.
    reversed: true,
    caseHref: 'https://impulza.pe',
  },
  {
    id: 'cariotipado',
    number: 'P.02 — Genética + IA',
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
    number: 'P.03 — Salud + IA móvil',
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
    number: 'P.04 — Ecommerce',
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

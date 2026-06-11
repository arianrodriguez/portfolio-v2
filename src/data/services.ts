import type { Service } from '@/types';

export const services: Service[] = [
  {
    number: '01',
    title: 'Agentes de IA',
    description:
      'Agentes y copilotos que automatizan tareas, consultan tus datos y toman decisiones — integrando OpenAI, Gemini y LangChain en flujos reales de negocio.',
    tags: ['OpenAI', 'Gemini', 'LangChain', 'RAG', 'n8n'],
  },
  {
    number: '02',
    title: 'Modelos de visión a medida',
    description:
      'Modelos de Machine Learning entrenados para identificar cualquier objeto con precisión: salud, genética, industria y control de calidad.',
    tags: ['Computer Vision', 'PyTorch', 'Python', 'Deep Learning'],
  },
  {
    number: '03',
    title: 'Arquitecturas escalables',
    description:
      'Microservicios, APIs RESTful y sistemas en la nube diseñados con código limpio y patrones que escalan sin romperse ni disparar costos.',
    tags: ['Microservicios', '.NET', 'Node.js', 'Docker', 'Cloud'],
  },
  {
    number: '04',
    title: 'Automatización & optimización de costos',
    description:
      'Transformo procesos manuales en flujos automáticos y optimizo el consumo cloud para reducir gastos operativos de forma medible.',
    tags: ['n8n', 'CI/CD', 'Cloud FinOps', 'MQTT'],
  },
];

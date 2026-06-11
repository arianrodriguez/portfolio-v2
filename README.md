# Portafolio — Arian Rodriguez

Portafolio profesional de una sola vista (Ingeniero de Software & IA). Implementado
desde un mockup de Claude Design a una app **React + TypeScript + Vite + Tailwind CSS v4**
con una arquitectura limpia y desacoplada.

## Stack

- **Vite** — bundler / dev server
- **React 19 + TypeScript** — UI con tipado estático
- **Tailwind CSS v4** — design tokens en `@theme`; CSS-only para efectos irreducibles
- Sin dependencias de runtime extra (iconos SVG y `cn` propios)

## Arranque

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # type-check + build de producción -> dist/
npm run preview  # sirve el build de producción
```

## Arquitectura

Las **pantallas/secciones** están desacopladas de los **widgets reutilizables** y del **contenido**.

```
src/
├── main.tsx              # punto de entrada (monta React)
├── App.tsx               # composición de la página
├── styles/index.css      # tokens (@theme) + base + helpers CSS
├── types/                # contratos TypeScript (Service, Project, ...)
├── data/                 # CONTENIDO separado de la UI
│   ├── site.ts           #   perfil + datos de contacto (single source of truth)
│   ├── navigation.ts     #   enlaces del nav
│   ├── services.ts       #   servicios
│   ├── projects.ts       #   proyectos destacados
│   └── projectTypes.ts   #   chips del formulario
├── hooks/                # lógica reutilizable
│   ├── useScrolled.ts    #   estado del nav al hacer scroll
│   └── useInView.ts      #   reveal on scroll (IntersectionObserver)
├── lib/cn.ts             # combinador de classNames
├── components/
│   ├── ui/               # WIDGETS reutilizables
│   │   ├── Button, Tag, Eyebrow, Container, Reveal, ImageSlot, icons
│   └── layout/           # Navbar, Footer
└── sections/             # SECCIONES (pantallas): Hero, Services, Projects, Contact
```

### Principios

- **Contenido fuera de la UI** — editar textos, servicios o proyectos se hace en `src/data`,
  sin tocar componentes.
- **Widgets reutilizables** — `Button`, `Tag`, `ImageSlot`, `Reveal`, etc. no conocen el dominio.
- **Secciones componibles** — `App.tsx` solo ordena secciones; cada una es autónoma.
- **Design tokens** — colores, fuentes y radios viven en `@theme` y generan utilidades de Tailwind.

## Personalización rápida

| Quiero cambiar...            | Edita                                    |
| ---------------------------- | ---------------------------------------- |
| Nombre, email, teléfono      | `src/data/site.ts`                       |
| Tu foto del hero             | `src/data/site.ts` → `heroPhoto`         |
| Servicios                    | `src/data/services.ts`                   |
| Proyectos / métricas         | `src/data/projects.ts`                   |
| Screenshots de proyectos     | `src/data/projects.ts` → `imageSrc`      |
| Paleta / tipografía          | `src/styles/index.css` (`@theme`)        |

## Pendientes opcionales

- **Imágenes reales** — coloca tus capturas en `src/assets/` e impórtalas en `imageSrc`
  (hero y proyectos). Mientras tanto se muestra un placeholder elegante.
- **Formulario de contacto** — hoy solo muestra el estado de éxito en cliente. Conéctalo a
  un servicio (Formspree, Resend, una API propia) en `src/sections/Contact.tsx` → `handleSubmit`.

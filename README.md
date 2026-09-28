# NOIRÉ — Parisian Restaurant

Premium restaurant website built as a modern full-stack-ready frontend experience with a strong focus on visual design, motion, performance and responsive UX.

**Live:** https://noire-paris.vercel.app/

---

## Overview

NOIRÉ is a premium restaurant website concept inspired by contemporary Parisian dining.

The project focuses on creating an immersive digital experience rather than a conventional restaurant landing page.

The interface combines:

- Editorial typography
- Large cinematic imagery
- Smooth scrolling
- Parallax effects
- Scroll-triggered animations
- Micro-interactions
- Responsive layouts
- SEO metadata
- Structured data
- Dynamic routing

The website is designed to feel like a real premium restaurant brand rather than a generic portfolio template.

---

## Features

### Restaurant experience

- Hero section with cinematic introduction
- Restaurant philosophy
- Signature dish presentation
- Menu preview
- Chef section
- Restaurant experience section
- Image gallery
- Reservation CTA
- Dedicated About page
- Dedicated Menu page
- Individual menu item routes
- Gallery item routes
- Reservation page

### Navigation

- React Router
- Route-based page architecture
- Scroll-to-top behavior between pages
- Responsive navigation
- Mobile menu
- Animated header interactions

### Animations

- GSAP animations
- GSAP ScrollTrigger
- Lenis smooth scrolling
- Parallax image effects
- Scroll reveal animations
- Staggered content animations
- Magnetic interactions
- Custom cursor interactions
- Reduced-motion support

### SEO

- Page-specific titles
- Page-specific meta descriptions
- Canonical URLs
- Open Graph metadata
- Twitter Card metadata
- Robots directives
- XML sitemap
- Restaurant structured data using JSON-LD
- SEO-friendly route structure
- Favicon

---

## Pages

| Route            | Description                                  |
| ---------------- | -------------------------------------------- |
| `/`              | Main restaurant experience                   |
| `/about`         | Restaurant story, philosophy, chef and space |
| `/menu`          | Full restaurant menu                         |
| `/menu/:slug`    | Individual menu item                         |
| `/gallery/:slug` | Individual gallery item                      |
| `/reservation`   | Reservation page                             |

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- SCSS

### Animation

- GSAP
- GSAP ScrollTrigger
- Lenis

### SEO

- React Helmet Async
- Schema.org / JSON-LD
- Open Graph
- XML Sitemap
- Robots.txt

### Tooling

- ESLint
- TypeScript
- Sharp
- Vite

---

## Architecture

The project follows a modular component-based architecture.

```text
src/
├── app/
│   ├── router/
│   └── styles/
│
├── entities/
│   └── menu/
│
├── pages/
│   ├── home/
│   ├── about/
│   ├── menu/
│   ├── menu-item/
│   ├── gallery-item/
│   └── reservation/
│
├── shared/
│   ├── animations/
│   ├── seo/
│   └── ui/
│
├── widgets/
│   ├── header/
│   ├── footer/
│   └── smooth-scroll/
│
├── App.tsx
└── main.tsx
```

The architecture separates:

- Pages
- Reusable UI
- Business/domain data
- Global animations
- SEO configuration
- Layout components

This makes the project easier to maintain and extend.

---

## Animation System

Animations are built around GSAP and ScrollTrigger.

The project uses animation patterns such as:

```text
Page load
    ↓
Hero reveal
    ↓
Scroll-triggered sections
    ↓
Parallax imagery
    ↓
Content reveal
    ↓
Micro-interactions
```

Lenis provides smooth scrolling while GSAP's ticker keeps scroll-based animations synchronized.

Animations also account for users who prefer reduced motion.

---

## SEO

The project includes a centralized SEO system.

Each main page has its own:

- `<title>`
- Meta description
- Canonical URL
- Open Graph metadata
- Twitter metadata

The homepage additionally provides Restaurant structured data.

Example production URLs:

```text
https://noire-paris.vercel.app/
https://noire-paris.vercel.app/about
https://noire-paris.vercel.app/menu
https://noire-paris.vercel.app/reservation
```

The project also includes:

```text
public/
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

---

## Responsive Design

The website is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

Layouts, typography, imagery and animations adapt to different viewport sizes.

---

## Performance

Performance considerations include:

- Optimized WebP images
- Lazy-loaded images where appropriate
- Async image decoding
- Component-based rendering
- Route-level lazy loading
- Optimized production builds
- Controlled animation complexity

---

## Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Deployment

The project is deployed on Vercel.

Production:

**https://noire-paris.vercel.app/**

The project uses SPA routing with Vercel rewrites so direct navigation to application routes works correctly.

---

## Project Goals

The main goals of the project were:

1. Create a visually distinctive restaurant website.
2. Build reusable and maintainable React architecture.
3. Implement professional scroll-based animation.
4. Create a responsive premium UI.
5. Implement production-oriented SEO.
6. Demonstrate modern frontend development practices.
7. Create a realistic portfolio project suitable for commercial client work.

---

## Status

**Completed**

The current version includes the main website experience, responsive layouts, routing, animations, SEO infrastructure and Vercel deployment.

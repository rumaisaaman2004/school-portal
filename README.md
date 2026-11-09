# School Portal

React + TypeScript + Vite + Tailwind CSS + React Router starter with three role areas
(student, parent, admin), public auth pages and a reusable component library.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run preview    # serve the build at http://localhost:4173
```

## Routes

| Path | Description |
| --- | --- |
| `/login`, `/register` | Public auth pages (pick a role on login to enter that area) |
| `/demo` | Component demo – every component and variant |
| `/student/*` | Dashboard, Courses, Assignments, Timetable, Grades |
| `/parent/*` | Dashboard, Children, Attendance, Fees, Messages |
| `/admin/*` | Dashboard, Users, Classes, Reports, Settings |

Deep links keep working after a page refresh, because Vite's dev and preview servers
serve `index.html` for every path. If you deploy to a static host, add an SPA fallback
rule that serves `index.html` for every path.

## Project structure

```
src/
  app/              App root + router (routes generated from config)
  components/
    ui/             Button, Input, Select, Card, Modal, Toast, Table, Badge, Spinner, EmptyState
    icons/          Inline SVG icon set
  config/
    navigation.ts   Single source for each area's sidebar + routes
  hooks/            useDisclosure, useToast
  layouts/          AreaLayout (sidebar / mobile drawer), AuthLayout, PageHeader
  lib/cn.ts         clsx + tailwind-merge helper
  pages/            public/, student/, parent/, admin/, shared/
```

### Conventions

- **Colours:** every colour is defined in `tailwind.config.ts`. The default Tailwind
  palette is *replaced*, not extended, so classes like `bg-red-500` are never generated.
  Use the semantic scales: `primary`, `neutral`, `success`, `warning`, `danger`, `info`, `surface`.
- **Font:** Inter (Google Fonts), set as `font-sans`.
- **Components:** variants are typed maps (`variant`, `size`, `tone`). Every component accepts
  `className`, and overrides are merged safely with `cn()`.
- **Adding a page:** add one entry to an area's `nav` in `src/config/navigation.ts`. The
  sidebar link and the route are both created from it.
- **Responsive:** sidebar at `lg` (≥1024px); top bar + drawer below. Tables scroll
  horizontally inside their card. Checked at 1440px and 390px.

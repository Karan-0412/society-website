# Apex Techno Warriors 

A full-stack-ready React + Vite + TypeScript website styled with Tailwind CSS. This project is designed for a **college society or organization** and includes multiple pages, routing, and a premium dark theme with glassmorphism.

---

## Features

* Multi-page setup:

  * Home
  * Events
  * Gallery
  * Contact
  * Sign In / Sign Up (premium UI with glassmorphism)
  * 404 Not Found page
* Responsive design for mobile, tablet, and desktop
* Global theming with `next-themes`
* Tooltips, toast notifications, and loading states
* Query management with React Query
* Social login buttons (Google & GitHub)
* Easy to extend and customize

---

## Tech Stack

* React + TypeScript
* Vite
* Tailwind CSS
* React Router DOM
* React Query (`@tanstack/react-query`)
* next-themes (dark/light/system theme switcher)
* react-icons

---

## Prerequisites

* Node.js (LTS recommended)
* npm (or yarn / pnpm)

---

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the browser at `http://localhost:5173`

---

## Project Structure

```
src/
  components/     # UI components (toaster, tooltip, navbar, etc.)
  pages/          # Each page (Index, Events, Gallery, Contact, SignIn, NotFound)
  App.tsx         # Routes configuration
  main.tsx        # App entry point
```

---

## Routes Setup (`App.tsx`)

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/events" element={<Events />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

---

## Tailwind Notes

* Tailwind is configured in `tailwind.config.ts`
* `backdrop-blur` and transparent backgrounds are used for glassmorphism
* Theme colors can be changed in `tailwind.config.ts`

---

## Deployment

1. Build the project:

```bash
npm run build
```

2. Deploy the `dist/` folder to any static hosting (Netlify, Vercel, GitHub Pages)

---

## License

Free to use and modify for personal or educational purposes.

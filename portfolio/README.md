# Portfolio (React + Vite)

Interactive personal portfolio UI powered by React (Vite).  
Features:
- Collapsible sections & dynamic filtering
- Lightweight, no external UI framework
- Data-driven modules (easy to extend)

## Scripts
- dev: run local dev server
- build: production build
- preview: preview build
- extract:transcript: heuristic PDF transcript keyword extraction

## Structure
src/
  App.jsx (layout & routing stub)
  components/Section.jsx (collapsible wrapper)
  data/profile.js (central data map)
  main.jsx (bootstrap)

You can extend data/profile.js to add new sections without touching layout.

## Roadmap
- Dark mode toggle
- Badge grid animation
- Accessibility polish

PRs welcome.

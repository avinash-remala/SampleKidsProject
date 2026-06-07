# Solar System Explorer

An interactive, browser-based guide to the eight planets of our solar system. Built with plain HTML, CSS, and JavaScript — no frameworks or dependencies.

## Features

- Click any planet in the navigation bar to switch views instantly
- Each planet has a unique color theme, animated sphere (with rings for Saturn and Uranus), and curated facts
- Stats bar shows key figures: diameter, moons, distance from the Sun, and more
- Overview, four feature cards, and a fun fact for every planet
- Smooth fade-in animations on every view switch
- Fully responsive — works on phones, tablets, and desktops

## Project Structure

```
index.html   — page structure and HTML template
styles.css   — all styling, animations, and responsive layout
script.js    — planet data, theming logic, and DOM updates
```

## Getting Started

No build step required. Open `index.html` directly in a browser:

```bash
open index.html
```

Or serve it locally with any static file server:

```bash
npx serve .
```

## How It Works

- `script.js` holds a `PLANETS` object with data for all eight planets plus a Home screen
- Selecting a planet calls `render(key)`, which applies a CSS variable theme and fills every section with that planet's content
- CSS variables (`--accent`, `--hero`, `--deep`, etc.) are swapped at runtime so colors transition smoothly across the whole page
- The starfield and floating planet animations are pure CSS

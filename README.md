# Solar System Explorer

An interactive, browser-based guide to the eight planets of our solar system. Built with **HTML and CSS only** — no JavaScript, no frameworks, no dependencies.

## Features

- Click any planet in the nav to switch views instantly
- Each planet has a unique color theme, animated sphere (with rings for Saturn and Uranus), and curated facts
- Stats bar shows key figures: diameter, moons, distance from the Sun, and more
- Overview, four feature cards, and a fun fact for every planet
- Emoji icons — easy to read and change
- Fully responsive — works on phones, tablets, and desktops

## Project Structure

```
index.html   — all nine planet pages written directly in HTML
styles.css   — all styling, color themes, and the radio switch system
script.js    — empty (no longer needed)
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

## How It Works (no JavaScript!)

The whole app is powered by a CSS trick using hidden radio buttons:

1. **Hidden radios** — nine `<input type="radio">` elements sit at the top of `index.html`, one per planet
2. **Label nav** — each planet name in the nav is a `<label>` linked to one of those radios via `for`/`id`
3. **CSS detects the click** — when you click a label, its radio becomes `:checked`
4. **`~` sibling selector** — CSS uses `#r-earth:checked ~ .app` to reach forward in the HTML and apply Earth's color variables to the whole page
5. **Show/hide pages** — the same selector pattern reveals the matching planet page and hides all others

To add a new planet: add a radio input, a nav label, a planet page in HTML, and a color theme block in the CSS.

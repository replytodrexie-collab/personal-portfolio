# Drexie Jaira Litaoen — Portfolio

A responsive personal portfolio with a glassmorphism look, blue-to-violet gradients, and floating animated objects.

## Project files

- `index.html` — portfolio content, navigation, and floating background objects
- `styles.css` — glass styling, gradient theme, floating animations, and responsive layout
- `script.js` — scroll reveals, mouse parallax for floating objects, cursor glow, and card tilt

## Run locally

Open `index.html` in a modern browser. No build tools are required. Fonts load from Google Fonts when online and fall back to system fonts offline.

## Customize

- Gradient colors: edit `--sky`, `--indigo`, `--violet`, and `--pink` at the top of `styles.css`.
- Floating objects: edit the `.scene` block in `index.html`. Each object's `data-depth` sets how strongly it reacts to the mouse.
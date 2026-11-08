# Portfolio — Gopu Vishal

A personal portfolio web app. **Standalone: it has no dependency on any other project** (no cluster, no backend, no live data). Pure static site.

> Status: design brief. `index.html` in this folder is an early prototype used as a visual reference only; it is not the final implementation.

## Goal

Show who I am and what I've built, in a way that reflects my interests: **DevOps, networking, and how systems work**. It should feel like something an infrastructure person made, without sacrificing readability for recruiters who spend 30 seconds on it.

## Inspiration (and how it must differ)

A friend's portfolio is a "portfolio disguised as a desktop" (Linux desktop with folders, dock and windows). I liked the idea of a metaphor-driven interface, but mine must **not look like it**. His theme is Linux distros and a pastel desktop. Mine is **a network operations console**: dark, technical, data-flavoured.

## Look and feel

- **Theme:** NOC / ops console. Dark background with a faint grid and soft glows, glass-like panels, subtle noise.
- **Palette:** near-black ink `#070b10`, text `#dbe7f3`, accents cyan `#38e1d0` and amber `#f5b942`, status green `#4ee38a`, red `#ff6b6b`.
- **Type:** Space Grotesk (display, very large name) + JetBrains Mono (everything else).
- **Hero:** huge "Gopu Vishal" with a blinking amber cursor, a one-line intro, and three buttons.
- **Decorative topology map (right side):** an animated network diagram (nodes, links, packets flowing) drawn on canvas/SVG. It is purely decorative and local; nodes may open sections. Nothing is fetched from a server.
- **Windows:** sections open as draggable, focusable glass windows with a title bar and close button (Esc closes). On phones they become full-screen sheets.
- **tmux-style status bar** at the bottom: `0:about 1:experience 2:projects 3:skills 4:terminal 5:contact`, with `*` on the focused window. Number keys open windows.
- **Fake terminal window:** a small working shell with commands like `help`, `whoami`, `ls`, `open <section>`, `skills`, `contact`, `neofetch`, `ping`, `traceroute`, and a few jokes (`sudo`). Up-arrow history.
- **Motion:** gentle only. Respect `prefers-reduced-motion` (no packets, no blinking).
- **Responsive:** on mobile the map is hidden and replaced by a card grid; tmux bar is fixed to the bottom.
- **Accessible:** real buttons, visible focus ring, keyboard access to everything, good contrast, semantic headings.

## Sections

| Key | Section | Content |
|---|---|---|
| 0 | about | Short intro, education, achievements |
| 1 | experience | Cyberparadigm internship (Kubernetes, Kata, Cilium, WireGuard, CI/CD, etc.) |
| 2 | projects | Cards for each project with stack, description, repo and demo links |
| 3 | skills | Grouped: networking, platform, observability, data, backend, languages, AI, foundations |
| 4 | terminal | Interactive fake shell |
| 5 | contact | Email, LinkedIn, GitHub, résumé PDF |

Content comes from my résumé (LaTeX source in `../src`). Keep all text in **one data file** (JSON/TS) so editing content never means touching layout code. Phone number is intentionally not shown.

## Requirements

- Fully static output; hostable on GitHub Pages / Cloudflare Pages / any nginx.
- Fast: no heavy libraries, small JS, fonts with fallback, good Lighthouse score.
- Works with JS disabled at a basic level (contact links visible).
- SEO basics: title, description, Open Graph image.
- Dark theme only is fine; light theme optional.

## Framework — undecided

Options to choose from later:

| Option | Pros | Cons |
|---|---|---|
| **Next.js** (static export) | Familiar, React ecosystem, easy deploy | Heavier than needed for a static page |
| **Astro** | Ships almost no JS, great for content sites | Interactive windows/terminal need islands |
| **Vite + React/Svelte** | Light, fast dev, simple static build | Manual SEO/OG setup |
| **Plain HTML/CSS/JS** (current prototype) | Zero build, tiny | Harder to maintain as it grows |

Decision pending. Whatever is chosen, the design above stays the same.

## Existing files in this folder

- `index.html` — single-file prototype of the design (windows, tmux bar, terminal, canvas map). Its cluster/metrics parts are leftovers from an earlier idea and should be removed or replaced with static content.
- `Dockerfile`, `nginx.conf`, `docker-entrypoint.d/`, `config.js`, `.dockerignore` — optional container packaging for the static site. Not required.
- `my-frnd-protfolio.jpg` — screenshot of the inspiration site (reference only; don't copy its look).

## Open questions

- Framework (see above).
- Keep the decorative topology map, or replace it with something else?
- Domain name and hosting.
- Add a blog / writing section later?

# Portfolio — Gopu Vishal

A personal portfolio, built as a **server rack**. Each unit in the rack is a server; clicking one slides it out of the rack and shows its section on a KVM console. Pure static site: no backend, no live data, no dependency on any other project.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static output in dist/
npm run preview   # serve the build locally
```

Hosting: any static host. Cloudflare Pages or Vercel with build command `npm run build` and output directory `dist`.

## Stack

Vite + React + TypeScript, `zustand` for UI state, self-hosted fonts (Space Grotesk, JetBrains Mono). No UI or animation libraries; the rack, cables and background are plain CSS and SVG.

## Concept

- **Rack hero:** a 3D-tilted rack with a patch panel, six servers, a UPS, a cable tray and a base. Each server is a different machine (server, compute node, storage chassis, switch, console server, router).
- **Servers are the windows:** click one (or press `0`–`5`) and it slides out with a KVM console. `Esc` closes, `←` `→` browse, `Tab` stays inside the open server. On phones it becomes a full-screen sheet.
- **Pluggable cables:** click a patch cable to unplug it (desktop). The status bar tracks `links n/8`.
- **Sections:** about, experience, projects (drive caddies), skills (cable-coloured port groups), terminal (working fake shell), contact.
- **Look:** a data-center aisle in real-world colours: charcoal rack, steel rails, standard LED green/amber/blue, standard Cat6 cable colours, cool room light with a warm overhead pool.
- **Tone:** professional.
- **Accessible:** real buttons, visible focus ring, keyboard access to everything, `prefers-reduced-motion` respected.

## Where things live

| File | What |
|---|---|
| `src/content.ts` | **All site text.** Edit content here, never in layout code. |
| `src/Rack.tsx`, `src/Hardware.tsx` | The rack and the front panel of each machine |
| `src/Console.tsx`, `src/Sections.tsx`, `src/Terminal.tsx` | The pulled-out server and its content |
| `src/Hero.tsx` | Left side: prompt, name, asset tag, stats |
| `src/App.css`, `src/Polish.css`, `src/Console.css` | Styles |
| `legacy/` | The first single-file prototype, kept for reference only |
| `my-frnd-protfolio.jpg` | Inspiration screenshot (reference only; don't copy its look) |

Content comes from the résumé (LaTeX in `../src`). The phone number is intentionally not shown.

## Still to do

- Set the final domain, then make `og:image` in `index.html` an absolute URL (`https://<domain>/og.png`).
- Add the résumé PDF and a download link in the contact section.
- Deploy (Cloudflare Pages recommended).
- Optional: blog / writing section later.

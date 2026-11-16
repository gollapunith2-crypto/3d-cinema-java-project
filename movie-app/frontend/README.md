# Vantage

**Find your best seat.** Vantage is a procedural, single-file 3D cinema
seat-preview experience — pick a theatre, a showtime and a seat, then step
inside a fully modelled auditorium and see the *exact* view from that chair
before you book.

Everything you see is generated in code. There are **no downloaded 3D models or
scanned assets** — every hall, seat, curtain and screen is built procedurally
with [Three.js](https://threejs.org/).

<!-- Add a screenshot or GIF here once deployed, e.g.:
![Vantage screenshot](public/screenshot.png) -->

---

## Features

- **Four hand-tuned auditoriums**, each with its own architecture, palette,
  seating plan and curtain:
  - **CineGalaxy IMAX, Mumbai** — concentric curved single-sweep stalls, pleated
    velvet curtains.
  - **Lumière Grand, New York** — a wide four-block orchestra, big draped
    curtains.
  - **Shibuya Prime, Tokyo** — a grand three-tier hall with two deep, curved
    balconies and a sleek rising screen curtain.
  - **The Regent Palace, Brooklyn** — an ornate movie palace with a gilded
    proscenium, barley-twist columns, a coffered ceiling and a lifting festoon
    curtain.
- **Preview any seat** — click a seat to select it, click again to fly into a
  first-person view, complete with a view score, price and audio rating.
- **Live screen** — play real YouTube trailers on the theatre screen, with
  play/pause, and curtains that open when the show starts and close (pausing the
  film) when it ends — your chosen trailer is remembered across theatres.
- **Explore mode** — walk the hall in first person (WASD / arrow keys).
- **A real 2D seat map** synced with the 3D view.
- **Cinematic rendering** — post-process bloom, SSAO ambient occlusion, FXAA,
  a fresnel projector light shaft, screen glow, softly beveled geometry, and
  per-seat variation so rows don't look machine-stamped.

## Tech

- **[Three.js r128](https://threejs.org/)** for all rendering (loaded from CDN),
  plus its official post-processing add-ons (bloom, SSAO, FXAA).
- **[Vite](https://vitejs.dev/)** for the dev server and build.
- The entire application lives in **`index.html`** (markup, styles and an inline
  module of procedural geometry + app logic). No framework, no bundled assets.

## Running locally

Requires **Node.js 20+**.

```bash
npm install      # installs Vite (the only dependency)
npm run dev      # start the dev server, then open the printed localhost URL
```

To build a production bundle:

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

> **Note:** the YouTube trailers and Vercel Analytics only work in a real
> browser tab (not an embedded/sandboxed preview). YouTube embeds require the
> app to be served over `http(s)` — `npm run dev` is fine.

## Controls

| Action | How |
| --- | --- |
| Rotate / pan / zoom | The left tool rail, or drag / scroll on the stage |
| Look up / down / around | The on-screen d-pad |
| Jump to a framed angle | **Panorama / Left / Right / Screen** view buttons |
| Walk the hall (first person) | **Explore** (WASD / arrow keys) |
| Select a seat | Click a seat (in 3D or on the map below) |
| Sit in a seat | Click the selected seat again, or the seat pill |
| Play a trailer | **Movie ▸ Live screen** menu |
| Curtains / lights / play-pause | Controls on the stage |

## Analytics

Vantage ships with [Vercel Web Analytics](https://vercel.com/docs/analytics)
(privacy-friendly, cookieless). After deploying to Vercel, enable **Web
Analytics** in the project dashboard to see visitors, referrers and countries.
It is a no-op anywhere other than a Vercel deployment.

## License

Vantage is released under the **[PolyForm Noncommercial License 1.0.0](LICENSE.md)** —
you are free to use, study, modify and share it for any **noncommercial**
purpose (personal projects, learning, hobby, research, education, etc.).

**Commercial use requires a separate license.** See
**[COMMERCIAL-LICENSE.md](COMMERCIAL-LICENSE.md)**.

Third-party libraries loaded at runtime keep their own licenses — see
**[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)**.

## Author & contact

Built by **thebuggeddev**.

- Email — [thebuggeddev@gmail.com](mailto:thebuggeddev@gmail.com)
- X — [@thebuggeddev](https://x.com/thebuggeddev)
- GitHub — [@thebuggeddev](https://github.com/thebuggeddev)

## Support

If Vantage is useful or you just enjoyed it, you can
**[buy me a coffee](https://paypal.me/gunalesujata)** — thank you!

---

© 2026 thebuggeddev. Noncommercial use under the PolyForm Noncommercial License 1.0.0.

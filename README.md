# Wedding Invitation — Qahhar & Risma

Vite + React + TypeScript + Tailwind. Single-page invitation site with cinematic intro, fixed background video, scroll-triggered reveals, and dynamic guest names from URL slug.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produces dist/
```

## Dynamic guest

The first URL path segment is decoded, normalized (`-`, `_`, `+`, `%20` → space), and title-cased.

| URL | Greeting |
|---|---|
| `/` | Guest |
| `/john-doe` | John Doe |
| `/budi_santoso` | Budi Santoso |
| `/SRI%20WAHYUNI` | Sri Wahyuni |

## Container deploy (Podman / Docker)

```bash
# build
podman build -t wedding-invite .

# run on host port 8090 → container 8080
podman run -d --name wedding-invite --restart=always -p 8090:8080 wedding-invite

# logs
podman logs -f wedding-invite
```

The image is multi-stage: Node 20 builds the SPA, Caddy 2 alpine serves `dist/` with SPA fallback, gzip/zstd compression, and long-cache headers on hashed assets.

## Content edits

Single source of truth: [`src/data/content.ts`](./src/data/content.ts).

## Assets

Served from `public/assets/`:
- `video/bg.mp4` — fixed page background
- `audio/bgm.mp3` — background music (toggle in floating button)
- `photos/stock_*.jpg` — couple/love-story/gallery imagery
- `logos/bca.png`, `logos/mandiri.png` — bank logos for gift section

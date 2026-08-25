# Dockerization & PDF Fix — Technical Documentation

> Project: `karouma_o_carry` (backend `server/`)
> Reference (source of truth): `karouma_o_carry-App-Version-AR-FR`
> Date: 2026-08-25
> Branch: `Final-version-AR-FR-deployed-in-vercel`

---

## Table of contents

1. [Problem summary](#1-problem-summary)
2. [Root cause (proven)](#2-root-cause-proven)
3. [Architecture](#3-architecture)
4. [What was created / modified](#4-what-was-created--modified)
5. [Why each choice was made](#5-why-each-choice-was-made)
6. [Useful commands](#6-useful-commands)
7. [Tests performed & results](#7-tests-performed--results)
8. [Deploying on Render](#8-deploying-on-render)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Problem summary

PDF declarations generated in production (Render) were visually different
from the ones generated locally:

| Evidence | correct PDF (local) | wrong PDF (Render) |
|---|---|---|
| Producer | `Skia/PDF m150` (system Chrome 150+) | `Skia/PDF m140` = `@sparticuz/chromium@140` |
| Embedded fonts | `TimesNewRomanPSMT` ×3 only | DejaVu Sans + Liberation Serif + **13 Type-3 fonts** |
| File size | ~532 KB | ~968 KB |

Type-3 fonts are synthesized by Chromium when a glyph is missing from every
installed font — this is what destroyed the Arabic text rendering and shifted
every table metric (widths, line breaks, page breaks, RTL alignment).

## 2. Root cause (proven)

- **Locally**, `/usr/bin/google-chrome` exists AND real Times New Roman fonts
  (with **Arabic glyphs** — verified U+0627–U+06AF present) are installed in
  `/usr/share/fonts/truetype/msttcorefonts/`. Everything renders inside a
  single coherent font.
- **On Render** there was no system Chrome, so `puppeteer-pool.js` fell back
  to `@sparticuz/chromium@140` — a minimal AWS-Lambda-oriented Chromium build:
  - runs as `headless: "shell"` (different mode),
  - ships only a tiny font set (no Times New Roman, no serious Arabic coverage),
  - therefore Chromium substituted DejaVu/Liberation and synthesized Arabic
    glyphs as Type-3 fonts → different metrics everywhere.

Secondary difference found and removed: an extra CSS rule
`#table3 { margin-left: auto; }` existed only in the production
`server/print_js/printjs.css` (absent from the reference), shifting the
postal-code/year table.

Templates (`formulaire_declaration_tva.hbs`, `fdt_with_data.hbs`) and images
(`image1.png`, `image2.png`) were verified byte-identical between both
projects — they were never the problem.

## 3. Architecture

```
LOCAL ──── DOCKER ──── RENDER            (backend / PDF generation)
   │
   └──── VERCEL                          (React frontend, unchanged)

Browser (Vercel SPA)
   │  POST /print_doc  (axios, REACT_APP_API_URL, credentials)
   ▼
Express on Render (Docker container)
   │  Handlebars renders formulaire_declaration_tva.hbs → temp HTML file
   │  Puppeteer pool → Google Chrome (inside container)
   │  page.goto(file://…, networkidle0) → createPDFStream({ format: 'A4' })
   ▼
PDF streamed back to browser
```

Goal achieved: **LOCAL = DOCKER = RENDER** use the exact same rendering stack
(same Chrome channel, same font files).

## 4. What was created / modified

### Created

| File | Role |
|---|---|
| `server/Dockerfile` | Reproducible image: Node 18 + Google Chrome + Times New Roman |
| `server/.dockerignore` | Keeps node_modules/.env/PDFs/SQL dumps out of the image |
| `docker-compose.yml` | One-command local run of the backend container |
| `server/fonts/Times_New_Roman.ttf` | Real TNR Regular (contains Arabic glyphs) |
| `server/fonts/Times_New_Roman_Bold.ttf` | Bold |
| `server/fonts/Times_New_Roman_Italic.ttf` | Italic |
| `server/fonts/Times_New_Roman_Bold_Italic.ttf` | Bold Italic |

### Modified

| File | Change |
|---|---|
| `server/puppeteer-pool.js` | Aligned with reference: `executablePath = CHROME_PATH || /usr/bin/google-chrome`, `headless: true`, args `--no-sandbox --disable-setuid-sandbox --lang=ar --disable-features=IsolateOrigins,site-per-process`, default pool size 10; removed `@sparticuz/chromium` fallback entirely |
| `server/package.json` + lockfile | Removed `@sparticuz/chromium` dependency |
| `server/print_js/printjs.css` | Removed extra `#table3 { margin-left: auto; }` → now byte-identical to reference |
| `server/.env.example` | Normalized to `KEY=value` (no spaces around `=`) so `docker run --env-file` accepts it |

NOT touched (no regression): auth/login, CORS/helmet, email (Gmail API),
`db.js`, contact, calculations, all frontend code, Vercel config.

### Dockerfile explained

```dockerfile
FROM node:18-bookworm-slim        # matches local Node 18.x
ENV NODE_ENV=production \
    CHROME_PATH=/usr/bin/google-chrome \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# 1) Install real Google Chrome from Google's official apt repo
#    (pulls every shared-library dependency automatically)
# 2) COPY the 4 Times_New_Roman*.ttf into /usr/share/fonts/truetype/msttcorefonts/
#    + fc-cache -f
# 3) npm ci --omit=dev (lockfile-driven, reproducible)
# 4) COPY app sources + ca.pem + pages/ print_js/ utils/
# 5) chown node:node && USER node     (non-root; temp HTML files writable)
EXPOSE 5002
CMD ["node", "app.js"]            # app.js listens on 0.0.0.0:$PORT
```

Key points:

- `app.js` writes a temporary `_temp_*.html` next to the templates before
  `page.goto(file://…)`, so `/app/print_js` must be writable by the running
  user (handled by `chown node:node /app`).
- `DB_SSL_CA=./ca.pem` resolves correctly because WORKDIR is `/app`
  and `ca.pem` is copied into the image.
- Chrome launches fine as non-root because the pool passes `--no-sandbox`.

## 5. Why each choice was made

| Choice | Reason |
|---|---|
| System Google Chrome instead of @sparticuz | Same Skia engine/channel as the working local setup (`m151` vs reference `m150`); @sparticuz is built for AWS Lambda, not Render/Docker |
| Copy the exact `.ttf` files | The Debian package `ttf-mscorefonts-installer` installs the OLD corefonts v2.x which has **no Arabic glyphs**. The local files do (verified). Byte-identical fonts ⇒ byte-identical metrics |
| Only Times New Roman needed | The template uses `font-family: "Times New Roman", Times, serif`; TNR covers Latin + digits + symbols + Arabic, which is why the correct PDF embeds nothing else |
| Keep `puppeteer-core` (not full puppeteer) | Lighter; we drive the system Chrome explicitly, no bundled download needed |
| Pool default 10, env-tunable | Matches reference; set `PDF_MAX_CONCURRENT=2` on small plans (~< 1 GB RAM) since each Chrome instance costs memory |
| Vercel untouched | PDF generation happens server-side only; frontend just receives bytes |

## 6. Useful commands

```bash
# Build the image
cd karouma_o_carry
docker build -t karouma-o-carry-server ./server

# Run locally (env file must use KEY=value without spaces)
docker compose up --build
# or manually:
docker run --rm -p 5002:5002 --env-file server/.env karouma-o-carry-server

# Check what's inside the image
docker run --rm --entrypoint /bin/sh karouma-o-carry-server -c \
  "google-chrome --version && fc-list | grep -i times"

# Quick smoke tests
curl http://localhost:5002/welcome          # → {"authorized":"false"}
curl -X POST http://localhost:5002/login \
     -H "Content-Type: application/json" -d '{}'   # → validation error (DB reachable)

# Forensic check of ANY generated PDF (the definitive test)
pdfinfo my.pdf | grep Producer       # expect: Skia/PDF m1xx  (NOT m140)
pdffonts my.pdf                      # expect: only TimesNewRomanPS* CID TrueType
pdffonts my.pdf | grep -c "Type 3"   # expect: 0
```

Frontend note: CRA bakes `REACT_APP_API_URL` at **build time** — after
changing it in Vercel you MUST redeploy.

## 7. Tests performed & results

| Test | Result |
|---|---|
| Font glyph coverage check (Arabic ا ب م ة گ, é è ç à € % digits) | ✅ all present in bundled TTFs |
| `docker build` | ✅ success |
| Chrome + fonts inside image | ✅ Chrome 151.0.7922.173, TNR ×4 via fc-list |
| PDF generated **inside container** (full pipeline: Handlebars → temp HTML → Chrome → createPDFStream) | ✅ 12 pages A4, Producer `Skia/PDF m151`, only TimesNewRomanPSMT ×3, **0 Type-3**, 530 KB ≈ reference 532 KB |
| Local output vs Docker output (same data) | ✅ text content strictly identical |
| Server boot in container with real `.env` | ✅ `[POOL] 10/10 browsers ready`, Aiven DB reachable over SSL (`ca.pem`), login validation OK |
| HTTP smoke tests through mapped port | ✅ `/welcome` 200 `{"authorized":"false"}`, `/print_doc` auth guard OK, `/login` DB-backed validation message |
| `0.0.0.0:$PORT` binding | ✅ confirmed host→container curl |
| Production deploy (Render Docker runtime) | ✅ live, `[POOL] 2/2 browsers ready` (PDF_MAX_CONCURRENT=2) |

Reference samples used for comparison lived at repo root
(`déclarations_2020-01-01 correcte.pdf` / `fausse 1.pdf`) and must NOT be
committed (real customer data).

## 8. Deploying on Render

Dashboard → backend service → Settings:

1. **Runtime**: `Docker`
2. **Dockerfile path**: `./server/Dockerfile`
3. **Docker build context directory**: `./server`
4. Environment variables (dashboard only — no `.env` in prod):

   | Variable | Note |
   |---|---|
   | `SESSION_SECRET` | required or process exits |
   | `db`, `db_host`, `DB_PORT`, `db_user`, `db_password` | Aiven MySQL |
   | `DB_SSL_CA` | `/app/ca.pem` (path inside image) |
   | `FRONTEND_URL` | exact Vercel origin, e.g. `https://app.vercel.app` (CORS + cookies) |
   | `EMAIL_USER`, `EMAIL_PASS` or `GMAIL_*` | contact/reset emails |
   | `ADMIN_EMAIL` | notifications |
   | `PDF_MAX_CONCURRENT` | `2` on Starter plan, `10` if ≥ 1 GB RAM |

5. Deploy latest commit → expected logs:

   ```
   server started on port 10000
   [POOL] N/N browsers ready
   ==> Your service is live 🎉
   ```

6. In **Vercel**: Settings → Environment Variables →
   `REACT_APP_API_URL=https://karouma-o-carry-3.onrender.com` → **Redeploy**
   (mandatory, CRA freezes env vars at build time).

## 9. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Build log shows `npm warn using --force` | Normal: comes from `npm cache clean --force`. Harmless. |
| `[POOL] All browsers failed to launch` | Chrome missing/crashing: check `CHROME_PATH`, RAM limit; try `PDF_MAX_CONCURRENT=1` |
| Login works but session lost across requests | `FRONTEND_URL` on Render doesn't match the Vercel origin exactly (CORS/cookies, `sameSite:none; secure`) |
| Downloaded PDF opens but fonts look wrong again | Run `pdffonts`: any `Type 3` or DejaVu means fonts didn't load — verify `fc-list \| grep -i times` inside the deployed image |
| Container OOM-killed while printing | Too many concurrent browsers for the plan → lower `PDF_MAX_CONCURRENT` |
| Changed `REACT_APP_API_URL` but app still calls old URL | Forgot to redeploy on Vercel (build-time variable) |
| Timeout waiting for browser slot under load | Increase plan RAM and/or `PDF_MAX_CONCURRENT`; pool auto-replaces dead browsers |

---

*Maintainer note: keep `server/fonts/*.ttf` in sync with the reference
machine's `/usr/share/fonts/truetype/msttcorefonts/Times_New_Roman*.ttf`.
If the reference ever upgrades its font version, re-copy the files here.*

# ---- Stage: production server with Google Chrome + Times New Roman fonts ----
FROM node:18-bookworm-slim

ENV NODE_ENV=production \
    CHROME_PATH=/usr/bin/google-chrome \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app

# Google Chrome (same channel as the reference machine: /usr/bin/google-chrome)
RUN apt-get update && apt-get install -y --no-install-recommends \
        wget gnupg ca-certificates fontconfig \
    && wget -q -O- https://dl.google.com/linux/linux_signing_key.pub \
        | gpg --dearmor -o /usr/share/keyrings/google.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/google.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
        > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y --no-install-recommends google-chrome-stable \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Times New Roman (with Arabic glyphs) — byte-identical to the reference environment
COPY fonts/Times_New_Roman.ttf \
     fonts/Times_New_Roman_Bold.ttf \
     fonts/Times_New_Roman_Italic.ttf \
     fonts/Times_New_Roman_Bold_Italic.ttf \
     /usr/share/fonts/truetype/msttcorefonts/
RUN fc-cache -f

# Dependencies (lockfile-driven, no dev deps)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Application sources
COPY app.js db.js puppeteer-pool.js ca.pem ./
COPY pages ./pages
COPY print_js ./print_js
COPY utils ./utils

# Writable dir for the temp HTML files generated before page.goto(file://...)
RUN chown -R node:node /app
USER node

EXPOSE 5002
CMD ["node", "app.js"]

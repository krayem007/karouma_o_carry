const puppeteer = require("puppeteer-core");
const fs = require("fs");

const CHROME_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--lang=ar",
  "--disable-features=IsolateOrigins,site-per-process",
];

const CHROME_PATHS = [
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
];

function findChromePath() {
  for (const p of CHROME_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

class PuppeteerPool {
  constructor(maxBrowsers) {
    this.maxBrowsers = maxBrowsers;
    this.browsers = [];
    this.available = [];
    this.waiting = [];
    this.activeCount = 0;
    this.initialized = false;
    this.shuttingDown = false;
  }

  async initialize() {
    if (this.initialized) return;
    this.initialized = true;
    const results = [];
    for (let i = 0; i < this.maxBrowsers; i++) {
      if (i > 0) await new Promise(r => setTimeout(r, 500));
      try {
        await this._launchBrowser(i);
        results.push({ status: "fulfilled", value: i });
      } catch (e) {
        results.push({ status: "rejected", reason: e, index: i });
        console.error(`[POOL] Browser ${i} failed to launch:`, e.message);
      }
    }
    const ok = results.filter(r => r.status === "fulfilled").length;
    if (ok === 0) {
      console.error("[POOL] All browsers failed to launch");
      return;
    }
    console.log(`[POOL] ${ok}/${this.maxBrowsers} browsers ready`);
  }

  async _launchBrowser(index) {
    const systemChrome = findChromePath();
    let executablePath;
    let useBundledChromium = false;

    if (systemChrome) {
      executablePath = systemChrome;
      console.log(`[POOL] Using system Chrome: ${systemChrome}`);
    } else {
      const chromium = require("@sparticuz/chromium");
      executablePath = await chromium.executablePath();
      useBundledChromium = true;
      console.log(`[POOL] Using @sparticuz/chromium: ${executablePath}`);
    }

    const browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: useBundledChromium
        ? [...CHROME_ARGS, "--disable-gpu", "--disable-dev-shm-usage"]
        : CHROME_ARGS,
    });
    const entry = { browser, index, alive: true };
    this.browsers.push(entry);
    this.available.push(entry);
    browser.on("disconnected", () => {
      entry.alive = false;
      this._removeFromAvailable(entry);
      console.log(`[POOL] Browser ${index} disconnected`);
      if (!this.shuttingDown) {
        this._launchBrowser(index).then(() =>
          console.log(`[POOL] Browser ${index} replaced`)
        );
      }
    });
    return browser;
  }

  _removeFromAvailable(entry) {
    const idx = this.available.indexOf(entry);
    if (idx !== -1) this.available.splice(idx, 1);
  }

  async acquire(timeoutMs = 60000) {
    if (!this.initialized) await this.initialize();

    const entry = await this._waitForAvailable(timeoutMs);
    if (!entry) throw new Error("Timeout waiting for browser slot");

    this._removeFromAvailable(entry);
    this.activeCount++;

    const start = Date.now();
    const page = await entry.browser.newPage();
    const acquireMs = Date.now() - start;

    console.log(`[POOL] Acquired browser ${entry.index} (page +${acquireMs}ms, active: ${this.activeCount})`);

    return {
      browser: entry.browser,
      page,
      release: async () => {
        const rStart = Date.now();
        try { await page.close(); } catch (e) { }
        this.activeCount--;
        this.available.push(entry);
        this._drainWaiting();
        const rMs = Date.now() - rStart;
        console.log(`[POOL] Released browser ${entry.index} (${rMs}ms, active: ${this.activeCount})`);
      },
    };
  }

  _waitForAvailable(timeoutMs) {
    if (this.available.length > 0) {
      return Promise.resolve(this.available[0]);
    }
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        const idx = this.waiting.indexOf(entry);
        if (idx !== -1) this.waiting.splice(idx, 1);
        resolve(null);
      }, timeoutMs);
      const entry = { resolve, timer, available: null };
      this.waiting.push(entry);
    });
  }

  _drainWaiting() {
    while (this.waiting.length > 0 && this.available.length > 0) {
      const waiter = this.waiting.shift();
      clearTimeout(waiter.timer);
      waiter.available = this.available[0];
      waiter.resolve(this.available[0]);
    }
  }

  async healthCheck() {
    for (const entry of this.browsers) {
      if (!entry.alive) continue;
      try {
        const pages = await entry.browser.pages();
        if (pages.length > 3) {
          console.warn(`[POOL] Browser ${entry.index} has ${pages.length} pages, closing extras`);
          for (let i = 1; i < pages.length; i++) {
            try { await pages[i].close(); } catch (e) { }
          }
        }
      } catch (e) {
        console.error(`[POOL] Health check failed for browser ${entry.index}:`, e.message);
        entry.alive = false;
        this._removeFromAvailable(entry);
        this._launchBrowser(entry.index);
      }
    }
  }

  async shutdown() {
    this.shuttingDown = true;
    console.log("[POOL] Shutting down...");
    for (const waiter of this.waiting) {
      clearTimeout(waiter.timer);
      waiter.resolve(null);
    }
    this.waiting = [];
    const closeAll = this.browsers.map(e =>
      Promise.race([
        e.browser.close().catch(() => {}),
        new Promise(r => setTimeout(r, 10000)),
      ])
    );
    await Promise.all(closeAll);
    this.browsers = [];
    this.available = [];
    this.activeCount = 0;
    console.log("[POOL] Shutdown complete");
  }

  status() {
    return {
      total: this.browsers.length,
      available: this.available.length,
      waiting: this.waiting.length,
      active: this.activeCount,
      initialized: this.initialized,
    };
  }
}

let instance = null;

module.exports = function getPool() {
  if (!instance) {
    instance = new PuppeteerPool(Number(process.env.PDF_MAX_CONCURRENT) || 2);
  }
  return instance;
};

import { chromium } from 'playwright';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';

const [site, output] = process.argv.slice(2).map(p => resolve(p));
const index = JSON.parse(await readFile(join(site, 'index.json'), 'utf8'));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
const browser = await chromium.launch();
const result = [];
const start = performance.now();
await mkdir(output, { recursive: true });

try {
  for (const entry of Object.values(index.entries).filter(e => e.type === 'story' && e.tags.includes('play-fn'))) {
    const page = await browser.newPage({ viewport: { width: 1080, height: 800 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('http://story-evidence.test/**', async route => {
      const file = resolve(site, '.' + new URL(route.request().url()).pathname);
      if (!file.startsWith(site + sep)) return route.fulfill({ status: 403 });
      try {
        await route.fulfill({ body: await readFile(file), contentType: types[extname(file)] || 'application/octet-stream' });
      } catch {
        await route.fulfill({ status: 404 });
      }
    });
    await page.addInitScript(() => {
      let channel;
      window.storyEvidence = { failures: [] };
      Object.defineProperty(window, '__STORYBOOK_ADDONS_CHANNEL__', {
        configurable: true,
        get: () => channel,
        set: value => {
          if (value !== channel && value?.on) {
            value.on('storyFinished', ({ storyId, status, reporters }) => {
              window.storyEvidence.finished = { storyId, status, reports: reporters?.map(r => ({ type: r.type, status: r.status })) };
            });
            for (const event of ['playFunctionThrewException', 'storyThrewException', 'storyErrored']) {
              value.on(event, error => window.storyEvidence.failures.push({ event, message: error?.message ?? error?.description ?? String(error) }));
            }
          }
          channel = value;
        },
      });
    });
    await page.goto('http://story-evidence.test/iframe.html?viewMode=story&id=' + encodeURIComponent(entry.id));
    await page.waitForFunction(() => window.storyEvidence.finished, null, { timeout: 12000 }).catch(() => {});
    const evidence = await page.evaluate(() => window.storyEvidence);
    result.push({ id: entry.id, ...evidence, errors });
    await page.screenshot({ path: join(output, entry.id + '.png') });
    await page.close();
  }
} finally {
  await browser.close();
  await writeFile(join(output, 'plays.json'), JSON.stringify({ seconds: (performance.now() - start) / 1000, result }, null, 2));
}

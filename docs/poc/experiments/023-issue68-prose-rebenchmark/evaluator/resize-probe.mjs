import { readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { chromium } from 'playwright';

const root = resolve(process.argv[2]);
const browser = await chromium.launch();
const measures = [];
try {
  for (const [scenario, start, target] of [['parent', 731, 732], ['fit', 279, 280], ['both', 599, 600]]) {
    const page = await browser.newPage({ viewport: { width: start, height: 844 } });
    await page.route('http://probe.test/**', async route => {
      const url = new URL(route.request().url());
      const file = resolve(root, '.' + (url.pathname === '/' ? '/index.html' : url.pathname));
      const mime = { html: 'text/html', js: 'text/javascript', css: 'text/css', json: 'application/json', svg: 'image/svg+xml' };
      if (!file.startsWith(root + sep)) return route.fulfill({ status: 403 });
      try {
        await route.fulfill({ body: await readFile(file), contentType: mime[file.split('.').at(-1)] || 'application/octet-stream' });
      } catch {
        await route.fulfill({ status: 404 });
      }
    });
    await page.goto('http://probe.test/?case=' + scenario);
    const state = async () => {
      const parent = page.getByRole('tablist', { name: '文書', exact: true });
      return {
        tabs: await parent.getByRole('tab').count(),
        arrows: await page.getByRole('button', { name: /文書を[左右]に送る/ }).count(),
        countButton: await page.getByRole('button', { name: /文書を切り替える/ }).count(),
      };
    };
    await page.getByRole('tablist', { name: '文書', exact: true }).waitFor();
    await page.setViewportSize({ width: target, height: 844 });
    await page.evaluate(() => new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done))));
    const twoFrames = await state();
    await page.waitForTimeout(180);
    measures.push({ scenario, start, target, twoFrames, later: await state() });
    await page.close();
  }
} finally {
  await browser.close();
}
console.log(JSON.stringify(measures, null, 2));

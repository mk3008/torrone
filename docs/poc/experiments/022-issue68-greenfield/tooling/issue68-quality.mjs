import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';

const [project, output] = process.argv.slice(2).map(p => resolve(p));
const browser = await chromium.launch();
const checks = {};
const types = { '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
await mkdir(output, { recursive: true });

async function open(width, scenario) {
  const page = await browser.newPage({ viewport: { width, height: 780 } });
  await page.route('http://quality.test/**', async route => {
    const url = new URL(route.request().url());
    const file = resolve(project, url.pathname === '/' ? 'index.html' : '.' + url.pathname);
    if (!file.startsWith(project + sep)) return route.fulfill({ status: 403 });
    try {
      await route.fulfill({ body: await readFile(file), contentType: types[extname(file)] || 'application/octet-stream' });
    } catch {
      await route.fulfill({ status: 404 });
    }
  });
  await page.goto('http://quality.test/?case=' + scenario);
  page.setDefaultTimeout(2000);
  await page.getByRole('tablist').first().waitFor();
  return page;
}

async function check(name, fn) {
  try {
    checks[name] = await fn();
  } catch (error) {
    checks[name] = { pass: false, error: error.message.split('\n')[0] };
  }
}

try {
  await check('keyboard', async () => {
    const page = await open(1000, 'fit');
    const parent = page.getByRole('tablist').first();
    const first = parent.getByRole('tab').nth(0);
    const second = parent.getByRole('tab').nth(1);
    await first.focus();
    await page.keyboard.press('ArrowRight');
    const focusMoved = await second.evaluate(el => el === document.activeElement);
    const selectionHeld = await first.getAttribute('aria-selected') === 'true';
    const focusStyle = await second.evaluate(el => {
      const style = getComputedStyle(el);
      return { outline: style.outlineStyle, border: style.borderStyle, before: getComputedStyle(el, '::before').borderStyle, after: getComputedStyle(el, '::after').borderStyle };
    });
    await page.screenshot({ path: join(output, 'focused.png') });
    await page.keyboard.press('Enter');
    const selectedAfterEnter = await second.getAttribute('aria-selected') === 'true';
    await page.close();
    return { pass: focusMoved && selectionHeld && selectedAfterEnter, focusMoved, selectionHeld, selectedAfterEnter, focusStyle };
  });
  await check('chooserEscape', async () => {
    const result = [];
    for (const index of [0, 1]) {
      const page = await open(390, 'both');
      const button = page.locator('.reference .row').nth(index).locator('.more');
      try {
        await button.click();
        const open = await button.getAttribute('aria-expanded') === 'true';
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        await page.keyboard.press('Escape');
        const closed = await button.getAttribute('aria-expanded') === 'false';
        const focusReturned = await button.evaluate(el => el === document.activeElement);
        result.push({ index, open, closed, focusReturned });
      } catch (error) {
        result.push({ index, error: error.message.split('\n')[0] });
      }
      await page.close();
    }
    return { pass: result.every(r => r.open && r.closed && r.focusReturned), result };
  });
  await check('closeSelected', async () => {
    const page = await open(1000, 'fit');
    const row = page.locator('.reference .row').first();
    const before = await row.getByRole('tab').count();
    const close = row.getByRole('button', { name: /請求書.*閉じる/ });
    await close.click();
    const after = await row.getByRole('tab').count();
    const selected = row.getByRole('tab', { selected: true });
    const focusOnSelected = await selected.evaluate(el => el === document.activeElement);
    await page.close();
    return { pass: after === before - 1 && focusOnSelected, before, after, focusOnSelected };
  });
  await check('officialIcons', async () => {
    const page = await open(390, 'both');
    const sources = await page.locator('.reference img').evaluateAll(imgs => imgs.map(img => ({ src: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0 })));
    const countStyles = await page.locator('.reference .more').evaluateAll(buttons => buttons.map(button => ({ text: button.textContent.trim(), assets: [...button.querySelectorAll('img')].map(img => img.getAttribute('src')), inlineSvgCount: button.querySelectorAll('svg').length })));
    await page.close();
    return { sources, countStyles };
  });
  await check('scrollSurface', async () => {
    const page = await open(680, 'desktop');
    const row = page.locator('.reference .row').first();
    const arrow = row.getByRole('button', { name: '文書を右に送る' });
    const selectionBefore = await row.getByRole('tab', { selected: true }).allTextContents();
    if (await arrow.count() === 0) {
      await page.close();
      return { arrowPresent: false };
    }
    const surfaces = () => row.evaluate(r => [r, ...r.querySelectorAll('*')].filter(e => e.scrollWidth > e.clientWidth + 4 && e.clientWidth > 0).map(e => ({ className: e.className, role: e.getAttribute('role'), left: e.scrollLeft })));
    const before = await surfaces();
    await arrow.click();
    await page.waitForTimeout(450);
    const after = await surfaces();
    const selectionAfter = await row.getByRole('tab', { selected: true }).allTextContents();
    await page.close();
    return { arrowPresent: true, before, after, selectionBefore, selectionAfter };
  });
} finally {
  await browser.close();
  await writeFile(join(output, 'quality.json'), JSON.stringify(checks, null, 2));
}

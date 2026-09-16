// Focused PoC 018 checks. Requires Playwright + Chromium; no application package needed.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
const bundle = execFileSync('python3', ['tools/build-review.py'], { cwd: root, encoding: 'utf8' }).trim();
const manifest = JSON.parse(fs.readFileSync(path.join(bundle, 'review-build.json')));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const reviewIndex = fs.readFileSync(path.join(bundle, 'index.html'), 'utf8');
assert.ok(reviewIndex.indexOf('id="candidates-heading"') < reviewIndex.indexOf('id="invoice-issued-date"'));
assert.ok(reviewIndex.includes('not curated References'));
const entry = manifest.examples.find(item => item.id === 'invoice-issued-date');
assert.equal(entry.implementation_candidate, true);
for (const item of manifest.examples) {
  const bytes = fs.readFileSync(path.join(bundle, item.file));
  assert.deepEqual(bytes, fs.readFileSync(path.join(root, item.source)));
  assert.equal(hash(bytes), item.sha256);
  for (const asset of item.asset_hashes) {
    const bytes = fs.readFileSync(path.join(bundle, asset.file));
    assert.equal(hash(bytes), asset.sha256);
    assert.deepEqual(bytes, fs.readFileSync(path.join(root, path.dirname(item.source), path.basename(asset.file))));
  }
}
if (process.argv.includes('--static-only')) {
  console.log('PASS: separate candidate review entry and exact HTML/CSS/JS source hashes');
  process.exit(0);
}
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [1280, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('requestfailed', request => errors.push(request.url()));
      await page.goto(pathToFileURL(path.join(bundle, 'index.html')).href);
      assert.equal(await page.locator('#candidates-heading').textContent(), 'Implementation candidates');
      assert.equal(await page.locator('section[aria-labelledby="references-heading"] #invoice-issued-date').count(), 0);
      await page.locator('#invoice-issued-date a.open').click();
      const start = page.locator('#issued-after'), end = page.locator('#issued-before');
      const popup = page.locator('#date-browser');
      const earliest = page.getByRole('button', { name: 'Calendar for earliest issue date', exact: true });
      const latest = page.getByRole('button', { name: 'Calendar for latest issue date', exact: true });
      const commit = async (field, value) => { await field.fill(value); await field.press('Enter'); };
      await start.focus();
      assert.equal(await popup.isVisible(), width > 720);
      await start.press('Tab');
      assert.equal(await popup.isVisible(), false);
      await commit(start, '20260901');
      assert.equal(await start.inputValue(), '2026-09-01');
      assert.equal(await end.inputValue(), '');
      await page.getByRole('button', { name: 'Show invoices' }).click();
      assert.match(await page.locator('#search-result').textContent(), /unbounded end/);
      await page.getByRole('button', { name: 'Clear earliest issue date' }).click();
      await commit(end, '20260910');
      await page.getByRole('button', { name: 'Show invoices' }).click();
      assert.match(await page.locator('#search-result').textContent(), /unbounded start/);
      await commit(start, '20260230');
      assert.equal(await start.getAttribute('aria-invalid'), 'true');
      await start.press('ArrowDown');
      assert.equal(await page.locator('#display-month').textContent(), 'September 2026');
      await page.locator('[data-iso="2026-09-02"]').click();
      assert.equal(await start.inputValue(), '2026-09-02');
      assert.equal(await start.getAttribute('aria-invalid'), 'false');
      assert.equal(await popup.isVisible(), false);
      assert.equal(await page.evaluate(() => document.activeElement.id || document.activeElement.dataset.action), width > 720 ? 'issued-after' : 'browse');
      await end.press('ArrowDown');
      assert.equal(await page.locator('[data-iso="2026-09-01"]').isDisabled(), true);
      assert.equal(await page.locator('[data-iso="2026-09-17"]').isDisabled(), true);
      assert.equal(await page.locator('[data-iso="2026-09-02"]').getAttribute('aria-pressed'), 'true');
      assert.match(await page.locator('[data-iso="2026-09-05"]').getAttribute('class'), /between/);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      if (width <= 720) {
        assert.equal(await popup.evaluate(element => element.parentElement.dataset.side), 'before');
        assert.equal(await popup.evaluate(element => getComputedStyle(element).position), 'static');
        assert.equal(await page.evaluate(() => document.activeElement.tagName === 'INPUT'), false);
      }
      await page.keyboard.press('Escape');
      assert.equal(await popup.isVisible(), false);
      await commit(end, '2026-08-30');
      assert.equal(await end.getAttribute('aria-invalid'), 'true');
      await page.getByRole('button', { name: 'Clear earliest issue date' }).click();
      assert.equal(await end.getAttribute('aria-invalid'), 'false');
      await page.getByRole('button', { name: 'Clear latest issue date' }).click();
      await commit(start, '20260917');
      assert.equal(await start.getAttribute('aria-invalid'), 'true');
      await commit(start, '20240229');
      assert.equal(await start.getAttribute('aria-invalid'), 'false');
      await start.press('ArrowDown');
      await page.keyboard.press('PageUp');
      assert.equal(await page.locator('#display-month').textContent(), 'January 2024');
      await page.keyboard.press('Enter');
      assert.equal(await start.inputValue(), '2024-01-29');
      await start.press('ArrowDown');
      await page.getByRole('button', { name: 'Back one year', exact: true }).click();
      assert.equal(await page.locator('#display-month').textContent(), 'January 2023');
      await page.getByRole('button', { name: 'Forward one month', exact: true }).click();
      assert.equal(await page.locator('#display-month').textContent(), 'February 2023');
      await page.getByRole('button', { name: 'Dismiss date calendar' }).click();
      assert.equal(await popup.isVisible(), false);
      await start.press('ArrowDown');
      await page.getByRole('button', { name: 'Show invoices' }).focus();
      assert.equal(await popup.isVisible(), false);
      await start.press('ArrowDown');
      await page.locator('h1').click();
      assert.equal(await popup.isVisible(), false);
      await start.press('ArrowDown');
      await page.getByRole('button', { name: 'Forward one year', exact: true }).focus();
      await page.keyboard.press('Tab'); // Into the single calendar date tab stop.
      assert.equal(await page.evaluate(() => Boolean(document.activeElement.dataset.iso)), true);
      await page.keyboard.press('Tab'); // Move to the other boundary, without a focus trap.
      assert.equal(await popup.isVisible(), width > 720);
      if (width > 720) assert.equal(await popup.evaluate(element => element.parentElement.dataset.side), 'before');
      await commit(start, '0001-01-01');
      await start.press('ArrowDown');
      assert.equal(await page.getByRole('button', { name: 'Back one year', exact: true }).isDisabled(), true);
      await page.keyboard.press('Escape');
      await commit(start, '2026-09-02');
      await commit(end, '2026-09-10');
      await end.press('ArrowDown');
      await page.screenshot({ path: path.join(bundle, `invoice-${width}.png`), fullPage: true });
      assert.deepEqual(errors, []);
      console.log(`PASS ${width}px: packaging, partial ranges, recovery, clear, navigation, state styling, focus, dismissal, layout`);
      await page.close();
    }
    console.log(`Review bundle and screenshots: ${bundle}`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

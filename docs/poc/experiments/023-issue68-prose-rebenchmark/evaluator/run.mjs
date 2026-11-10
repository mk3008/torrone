import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { setTimeout as delay } from 'node:timers/promises';
import { extname, resolve, sep } from 'node:path';
import { chromium } from 'playwright';

const [appArg, evidenceArg] = process.argv.slice(2);
if (!appArg || !evidenceArg) throw new Error('Usage: node run.mjs APP_DIR EVIDENCE_DIR');
const app = resolve(appArg);
const evidence = resolve(evidenceArg);
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };
const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  const path = resolve(app, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
  if (!path.startsWith(app + sep)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const content = await readFile(path);
    response.writeHead(200, { 'Content-Type': mime[extname(path)] ?? 'application/octet-stream' }).end(content);
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port;
await mkdir(evidence, { recursive: true });
const browser = await chromium.launch();
const results = [];
const errors = [];
const names = { parent: '文書', child: '項目' };

function tabs(page, row) {
  return page.getByRole('tablist', { name: names[row], exact: true }).getByRole('tab');
}
function selected(page, row) {
  return page.getByRole('tablist', { name: names[row], exact: true }).getByRole('tab', { selected: true });
}
function arrow(page, row, direction) {
  return page.getByRole('button', { name: names[row] + 'を' + direction + 'に送る', exact: true });
}
function more(page, row) {
  return page.getByRole('button', { name: new RegExp(names[row] + 'を切り替える') });
}
function close(page, label) {
  return page.getByRole('button', { name: new RegExp(label + '.*を閉じる') });
}
async function settle(page) {
  await page.evaluate(() => new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done))));
}
async function resize(page, width) {
  await page.setViewportSize({ width, height: page.viewportSize().height });
  await settle(page);
}
async function bounding(locator) {
  const rect = await locator.boundingBox();
  assert.ok(rect, 'expected a visible control');
  return rect;
}
function approx(actual, expected, tolerance, label) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: observed ${actual}; expected ${expected} ± ${tolerance}`);
}
async function counts(page, row, expected) {
  const [count, arrows, label] = expected;
  assert.equal(await tabs(page, row).count(), count, row + ' accessible tabs');
  const visibleArrows = (await arrow(page, row, '左').isVisible() ? 1 : 0) + (await arrow(page, row, '右').isVisible() ? 1 : 0);
  assert.equal(visibleArrows, arrows, row + ' visible scroll buttons');
  assert.equal(await more(page, row).isVisible(), Boolean(label), row + ' count button visibility');
  if (label) assert.equal((await more(page, row).innerText()).trim(), label, row + ' visible count label');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'page has horizontal overflow');
}
async function rows(page, parent, child) {
  await counts(page, 'parent', parent);
  await counts(page, 'child', child);
}
async function position(page, row) {
  return (await bounding(tabs(page, row).first())).x;
}
async function moves(page, row, action, direction) {
  const initial = await position(page, row);
  const name = (await selected(page, row).innerText()).trim();
  await action();
  let final = await position(page, row);
  for (let attempt = 0; attempt < 30 && (final - initial) * direction <= 3; attempt++) {
    await delay(50);
    final = await position(page, row);
  }
  assert.ok((final - initial) * direction > 3, `tab moved from ${initial} to ${final}`);
  assert.equal((await selected(page, row).innerText()).trim(), name, 'scroll preserves selection');
  return { initial, final };
}
async function focusIs(locator) {
  return locator.evaluate(el => el === document.activeElement || el.getRootNode().activeElement === el);
}
async function visibleHeading(page, name) {
  assert.ok(await page.getByRole('heading', { level: 2, name, exact: true }).isVisible(), 'active document heading: ' + name);
}
async function snapshot(page, id) {
  await page.screenshot({ path: resolve(evidence, id + '.png'), fullPage: true });
}
async function check(id, section, spec, scenario, width, test, touch = false) {
  const context = await browser.newContext({ viewport: { width, height: touch ? 844 : 720 }, deviceScaleFactor: 1, isMobile: touch, hasTouch: touch });
  const page = await context.newPage();
  page.setDefaultTimeout(2500);
  page.on('pageerror', error => errors.push({ id, message: error.message }));
  let record;
  try {
    await page.goto(origin + '/?case=' + scenario, { timeout: 5000 });
    await page.getByRole('heading', { name: '受注ワークスペース', exact: true }).waitFor();
    await settle(page);
    const observed = await test(page);
    record = { id, section, spec, scenario, width, status: 'pass', observed };
  } catch (error) {
    record = { id, section, spec, scenario, width, status: 'fail', detail: error.message.split('\nCall log:')[0] };
  } finally {
    await snapshot(page, id).catch(() => {});
    await context.close();
  }
  results.push(record);
}

const row = (count, arrows = 0, label = '') => [count, arrows, label];
const show = (id, section, spec, scenario, width, parent, child, touch = false) =>
  check(id, section, spec, scenario, width, page => rows(page, parent, child), touch);

async function readPixels(page, points) {
  const shot = await page.screenshot();
  return page.evaluate(async ({ points, data }) => {
    const image = new Image();
    image.src = 'data:image/png;base64,' + data;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    return points.map(({ x, y }) => [...ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data].slice(0, 3));
  }, { points, data: shot.toString('base64') });
}
const colorClose = (actual, expected) => actual.every((value, i) => Math.abs(value - expected[i]) <= 22);

try {
  await show('D01', 'desktop', 'R2', 'parent', 732, row(5), row(2));
  await show('D02', 'desktop', 'R2 R3', 'parent', 731, row(5, 2), row(2));
  await check('D03', 'desktop', 'R2', 'parent', 731, async page => {
    await rows(page, row(5, 2), row(2));
    await resize(page, 732);
    await rows(page, row(5), row(2));
  });
  await show('D04', 'desktop', 'R2', 'pcChild', 704, row(2), row(6));
  await show('D05', 'desktop', 'R2 R3', 'pcChild', 703, row(2), row(6, 2));
  await show('M01', 'narrow', 'R2', 'fit', 280, row(2), row(2), true);
  await show('M02', 'narrow', 'R2 R4', 'fit', 279, row(1, 0, 'ほか1'), row(2), true);
  await check('M03', 'narrow', 'R2', 'fit', 279, async page => {
    await rows(page, row(1, 0, 'ほか1'), row(2));
    await resize(page, 280);
    await rows(page, row(2), row(2));
  }, true);
  await show('M04', 'narrow', 'R2', 'child', 462, row(2), row(5), true);
  await show('M05', 'narrow', 'R2 R4', 'child', 461, row(2), row(1, 0, 'ほか4'), true);
  await show('M06', 'narrow', 'R4', 'parent', 390, row(1, 0, 'ほか4'), row(2), true);
  await show('M07', 'narrow', 'R4', 'both', 390, row(1, 0, 'ほか4'), row(1, 0, 'ほか4'), true);
  await check('M08', 'narrow', 'R2 R3 R4', 'both', 599, async page => {
    await rows(page, row(1, 0, 'ほか4'), row(5));
    await resize(page, 600);
    await rows(page, row(5, 2), row(5));
  }, true);

  await check('I01', 'interaction', 'R3', 'parent', 731, async page => {
    const right = await moves(page, 'parent', () => arrow(page, 'parent', '右').click(), -1);
    const left = await moves(page, 'parent', () => arrow(page, 'parent', '左').click(), 1);
    const r = await bounding(tabs(page, 'parent').first());
    const wheel = await moves(page, 'parent', async () => {
      await page.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
      await page.mouse.wheel(0, 150);
    }, -1);
    return { right, left, wheel };
  });
  await check('I02', 'interaction', 'C1 R1 R4 I3', 'both', 390, async page => {
    await more(page, 'parent').tap();
    assert.ok(await page.getByRole('heading', { name: 'ほかの文書（4）', exact: true }).isVisible());
    assert.equal(await page.getByRole('tablist').count(), 0, 'separate chooser');
    const card = name => page.getByRole('button', { name }).or(page.getByRole('link', { name }));
    const east = card(/受注管理.*東日本/);
    const west = card(/受注管理.*西日本/);
    const eastRect = await bounding(east);
    const westRect = await bounding(west);
    assert.ok(eastRect.x < westRect.x, 'cards are ordered horizontally');
    approx(eastRect.y, westRect.y, 2, 'first cards in same grid row');
    await west.tap();
    await rows(page, row(1, 0, 'ほか4'), row(2));
    await visibleHeading(page, '受注管理の概要');
    assert.ok(await focusIs(selected(page, 'parent')));
  }, true);
  await check('I03', 'interaction', 'C2 I3', 'both', 390, async page => {
    const trigger = more(page, 'child');
    await trigger.tap();
    assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
    const history = page.getByRole('button', { name: '履歴', exact: true }).or(page.getByRole('option', { name: '履歴', exact: true })).or(page.getByRole('menuitem', { name: '履歴', exact: true }));
    const h = await bounding(history);
    const b = await bounding(trigger);
    approx(h.y, b.y + b.height, 3, 'list begins beneath trigger');
    approx(h.x + h.width, b.x + b.width, 3, 'right-aligned list');
    await history.tap();
    await visibleHeading(page, '請求書の履歴');
    assert.equal((await trigger.innerText()).trim(), 'ほか4');
    assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
    assert.ok(await focusIs(trigger));
    await trigger.tap();
    const former = page.getByRole('button', { name: '明細', exact: true }).or(page.getByRole('option', { name: '明細', exact: true })).or(page.getByRole('menuitem', { name: '明細', exact: true }));
    assert.ok(await former.isVisible());
  }, true);
  await check('I04', 'interaction', 'I3', 'both', 390, async page => {
    for (const row of ['parent', 'child']) {
      const trigger = more(page, row);
      await trigger.tap();
      assert.equal(await focusIs(trigger).catch(() => false), false, 'focus moved into chooser');
      await page.keyboard.press('Escape');
      assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
      assert.ok(await focusIs(trigger), 'focus returned to ' + row + ' trigger');
    }
  }, true);
  await check('I05', 'interaction', 'I1 R1', 'fit', 900, async page => {
    const first = tabs(page, 'parent').first();
    const next = tabs(page, 'parent').nth(1);
    await first.focus();
    await page.keyboard.press('ArrowLeft');
    assert.ok(await focusIs(next), 'wrap to the last tab');
    assert.equal(await first.getAttribute('aria-selected'), 'true');
    await page.keyboard.press('Enter');
    assert.equal(await next.getAttribute('aria-selected'), 'true');
    await visibleHeading(page, '受注管理の概要');
    await selected(page, 'child').focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await tabs(page, 'child').first().getAttribute('aria-selected'), 'true');
    await page.keyboard.press('Space');
    await visibleHeading(page, '受注管理の受注明細');
    await first.click();
    await next.click();
    await visibleHeading(page, '受注管理の受注明細');
  });
  await check('I06', 'interaction', 'I2', 'fit', 900, async page => {
    await close(page, '請求書').click();
    assert.equal(await tabs(page, 'parent').count(), 1);
    await visibleHeading(page, '受注管理の概要');
    assert.ok(await focusIs(selected(page, 'parent')));
    await close(page, '受注管理').click();
    assert.ok(await page.getByText('開いている文書はありません。', { exact: true }).isVisible());
    assert.ok(await focusIs(page.getByRole('button', { name: '作業メニュー', exact: true })));
  });
  await check('I07', 'interaction', 'V3 I1 I2', 'parent', 900, async page => {
    const long = tabs(page, 'parent').filter({ hasText: '四半期売上の照合レポート' });
    const target = tabs(page, 'parent').nth(3);
    assert.ok(await long.count() || await target.isVisible());
    const initial = await bounding(target);
    assert.equal(await close(page, '四半期売上の照合レポート').isVisible(), false);
    await target.hover();
    assert.ok(await close(page, '四半期売上の照合レポート').isVisible());
    const tooltip = page.getByText(/四半期売上の照合レポート.*西日本/);
    assert.ok(await tooltip.first().isVisible(), 'full name and affiliation on hover');
    approx((await bounding(target)).x, initial.x, 0.5, 'tab position while hovered');
    await close(page, '四半期売上の照合レポート').click();
    await visibleHeading(page, '請求書の明細');
    assert.ok(await focusIs(tabs(page, 'parent').last()), 'focus moves to following document');
  });

  await check('V01', 'visual', 'V1 V2', 'fit', 1280, async page => {
    const header = page.getByRole('heading', { level: 1, name: '受注ワークスペース' });
    const work = page.getByRole('button', { name: '作業メニュー', exact: true });
    const workRect = await bounding(work);
    const h = await bounding(header);
    const parent = await bounding(tabs(page, 'parent').first());
    const child = await bounding(tabs(page, 'child').first());
    const content = await bounding(page.getByRole('heading', { level: 2 }));
    approx(h.x, 66, 2, 'centered workspace left inset');
    approx(workRect.x + workRect.width, 1214, 2, 'desktop action at right inner edge');
    approx(parent.x, child.x, 2, 'left edges of tab rows align');
    approx(child.y, parent.y + parent.height, 2, 'rows touch');
    approx(content.x, 87, 3, 'panel inset');
    assert.ok(await page.getByText('東日本 · 明細', { exact: true }).isVisible());
    assert.ok(await page.getByRole('button', { name: '内容の確認', exact: true }).isVisible());
  });
  await check('V02', 'visual', 'V3 V4', 'parent', 900, async page => {
    const east = await bounding(tabs(page, 'parent').first());
    const west = await bounding(tabs(page, 'parent').nth(2));
    const child = await bounding(tabs(page, 'child').first());
    const colors = await readPixels(page, [
      { x: east.x + 4, y: east.y + 8 },
      { x: west.x + 4, y: west.y + 8 },
      { x: east.x + 18, y: east.y + east.height - 2 },
      { x: child.x + 18, y: child.y + child.height - 2 },
      { x: west.x + 18, y: west.y + west.height - 2 },
    ]);
    for (const [i, expected] of [[0, [229, 242, 249]], [1, [240, 233, 248]], [2, [19, 90, 210]], [3, [19, 90, 210]]]) {
      assert.ok(colorClose(colors[i], expected), 'surface color sample ' + i + ' ' + colors[i]);
    }
    assert.ok(!colorClose(colors[4], [19, 90, 210]), 'inactive document lacks selected underline');
    return { colors };
  });
  await check('V03', 'visual', 'V4 I1', 'fit', 900, async page => {
    await tabs(page, 'parent').first().focus();
    await page.keyboard.press('ArrowRight');
    const box = await bounding(tabs(page, 'parent').nth(1));
    const samplePoints = [];
    for (let y = 2; y < 9; y++) {
      for (let x = 10; x <= 38; x++) samplePoints.push({ x: box.x + x, y: box.y + y });
    }
    const colors = await readPixels(page, samplePoints);
    let dotted = false;
    for (let row = 0; row < 7; row++) {
      const dark = colors.slice(row * 29, (row + 1) * 29).map(([r, g, b]) => r < 85 && g < 105 && b < 125);
      const transitions = dark.reduce((n, current, i) => n + Number(i > 0 && current !== dark[i - 1]), 0);
      if (transitions >= 6) dotted = true;
    }
    assert.ok(dotted, 'dark dotted indicator within the focused tab');
    assert.equal(await tabs(page, 'parent').first().getAttribute('aria-selected'), 'true');
  });
  await check('V04', 'visual', 'R4 V5', 'both', 390, async page => {
    const evidence = [];
    for (const row of ['parent', 'child']) {
      const tab = await bounding(selected(page, row));
      const trigger = await bounding(more(page, row));
      approx(trigger.x + trigger.width, 374, 1, 'right inner edge');
      approx(tab.x, 16, 2, 'selected tab starts at left inner edge');
      const offsets = Array.from({ length: 13 }, (_, i) => i + 1);
      const gapColors = await readPixels(page, offsets.map(offset => ({ x: trigger.x - offset, y: trigger.y + trigger.height / 2 })));
      const gap = gapColors.findIndex(color => color.some(value => value < 220));
      assert.equal(gap, 6, row + ' visible gap');
      approx(trigger.y + trigger.height / 2, tab.y + tab.height / 2, 2, 'same vertical center');
      assert.ok(tab.width > 200, 'selected surface fills available width');
      evidence.push({ tab, trigger, gap });
    }
    return evidence;
  }, true);
  await check('V05', 'visual', 'V5 C1 C2', 'both', 390, async page => {
    const controls = [close(page, '請求書'), more(page, 'parent'), more(page, 'child')];
    const measurements = [];
    for (const [index, control] of controls.entries()) {
      const rect = await bounding(control);
      const center = rect.y + rect.height / 2;
      const right = rect.x + rect.width;
      const points = [];
      for (let y = Math.round(center) - 12; y <= Math.round(center) + 12; y++) {
        for (let x = Math.round(right) - (index === 0 ? 32 : 24); x <= Math.round(right) - 8; x++) {
          points.push({ x, y });
        }
      }
      const colors = await readPixels(page, points);
      const ink = points.filter((_, i) => colors[i].every(value => value < 165));
      assert.ok(ink.length >= 6, 'visible dark icon strokes');
      const minY = Math.min(...ink.map(point => point.y));
      const maxY = Math.max(...ink.map(point => point.y));
      assert.ok(maxY - minY <= 15, 'icon ink stays secondary to label');
      approx((minY + maxY) / 2, center, 2, 'glyph vertically centered');
      assert.ok(rect.height >= 40, 'large touch target');
      measurements.push({ rect, ink: { pixels: ink.length, minY, maxY } });
    }
    return measurements;
  }, true);
} finally {
  const summary = {
    chromium: browser.version(),
    passed: results.filter(r => r.status === 'pass').length,
    cases: results.length,
    results,
    pageErrors: errors,
  };
  await writeFile(resolve(evidence, 'results.json'), JSON.stringify(summary, null, 2) + '\n');
  console.log(`${summary.passed}/${summary.cases} checks passed`);
  await browser.close();
  await new Promise(resolve => server.close(resolve));
  process.exitCode = summary.passed === summary.cases ? 0 : 1;
}

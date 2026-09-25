const { test, expect } = require('@playwright/test');
const records = [
  { id: 'LC-031', name: 'North Distribution Center', region: 'North', type: 'Distribution center', filter: ' lc-031 ' },
  { id: 'LC-044', name: 'Riverside Depot', region: 'West', type: 'Depot', filter: 'lc-044' },
];
const northService = { id: 'LC-033', name: 'North Service Point' };
function controls(page) {
  return {
    trigger: page.getByRole('button', { name: 'Choose location', exact: true }),
    dialog: page.getByRole('dialog'),
    query: page.getByRole('textbox', { name: 'Location ID or name' }),
    region: page.getByRole('combobox', { name: 'Region' }),
    type: page.getByRole('combobox', { name: 'Facility type' }),
    confirm: page.getByRole('button', { name: 'Select', exact: true }),
    cancel: page.getByRole('button', { name: 'Cancel', exact: true }),
    close: page.getByRole('button', { name: 'Close location chooser' }),
    clear: page.getByRole('button', { name: 'Clear selected location' }),
    selection: page.locator('[data-ref="lookup-selection"]'),
    radio: record => page.locator(`input[type="radio"][value="${record.id}"]`),
  };
}
async function committed(page, record) {
  const c = controls(page);
  await expect(c.dialog).not.toBeVisible();
  await expect(c.selection).toBeVisible();
  await expect(c.selection.locator('[data-ref="selected-name"]')).toHaveText(record.name);
  await expect(c.selection.locator('[data-ref="selected-id"]')).toHaveText(`Location ${record.id}`);
  await expect(c.trigger).toBeFocused();
}
async function select(page, record) {
  const c = controls(page);
  await c.trigger.click();
  await c.radio(record).click();
  await expect(c.radio(record)).toBeChecked();
  await expect(c.confirm).toBeEnabled();
  await c.confirm.click();
  await committed(page, record);
}
test.beforeEach(async ({ page }) => { await page.goto('/entity-lookup.html'); });

test('independent conditions narrow comparable rows and changing one clears pending choice', async ({ page }) => {
  const c = controls(page);
  await c.trigger.click();
  await expect(page.getByRole('radio')).toHaveCount(10);
  await c.query.fill('service point');
  await expect(page.getByRole('radio')).toHaveCount(3);
  await c.region.selectOption('East');
  await expect(page.getByRole('radio')).toHaveCount(1);
  await expect(c.radio({ id: 'LC-052' })).toBeVisible();
  await expect(c.radio({ id: 'LC-052' }).locator('..')).toContainText('East');
  await expect(c.radio({ id: 'LC-052' }).locator('..')).toContainText('Service point');
  await c.radio({ id: 'LC-052' }).click();
  await expect(c.confirm).toBeEnabled();
  await c.type.selectOption('Depot');
  await expect(page.getByRole('radio')).toHaveCount(0);
  await expect(c.confirm).toBeDisabled();
  await c.type.selectOption('Service point');
  await expect(page.getByRole('radio')).toHaveCount(1);
  await expect(c.radio({ id: 'LC-052' })).not.toBeChecked();
  await c.radio({ id: 'LC-052' }).click();
  await c.confirm.click();
  await committed(page, { id: 'LC-052', name: 'Harbor Service Point' });
  await c.trigger.click();
  await expect(c.query).toHaveValue('');
  await expect(c.region).toHaveValue('');
  await expect(c.type).toHaveValue('');
  await expect(c.confirm).toBeDisabled();
});

test('desktop dialog and actions remain fixed across 10, 2, 0, 10 results', async ({ page }, info) => {
  test.skip(info.project.name.startsWith('mobile'), 'Desktop dialog geometry; mobile remains fullscreen.');
  const c = controls(page);
  await c.trigger.click();
  const results = page.locator('.results');
  const geometry = async () => {
    const [dialog, header, conditions, resultHead, area, footer, cancel, confirm] = await Promise.all([
      c.dialog.boundingBox(), page.locator('.dialog-heading').boundingBox(),
      page.locator('.conditions').boundingBox(), page.locator('.result-head').boundingBox(),
      results.boundingBox(), page.locator('.dialog-actions').boundingBox(),
      c.cancel.boundingBox(), c.confirm.boundingBox(),
    ]);
    return { dialog, header, conditions, resultHead, area, footer, cancel, confirm };
  };
  const original = await geometry();
  const fifth = await page.locator('.result').nth(4).boundingBox();
  expect(fifth.y + fifth.height, 'at least five complete comparison rows fit without scrolling').toBeLessThanOrEqual(original.area.y + original.area.height + 1);
  expect(original.area.height).toBeGreaterThan(original.header.height);
  expect(original.area.height).toBeGreaterThan(original.conditions.height);
  expect(original.area.y).toBeGreaterThanOrEqual(original.resultHead.y + original.resultHead.height);
  expect(original.area.y + original.area.height).toBeLessThanOrEqual(original.footer.y + 1);
  for (const [region, type, count] of [['North', '', 2], ['East', 'Distribution center', 0], ['', '', 10]]) {
    await c.region.selectOption(region);
    await c.type.selectOption(type);
    await expect(page.getByRole('radio')).toHaveCount(count);
    if (count === 0) await expect(page.getByRole('status')).toBeVisible();
    else await expect(page.getByRole('status')).toBeHidden();
    const current = await geometry();
    for (const part of ['dialog', 'header', 'conditions', 'resultHead', 'area', 'footer', 'cancel', 'confirm']) {
      for (const axis of ['x', 'y', 'width', 'height']) {
        expect(Math.abs(current[part][axis] - original[part][axis]), `${part}.${axis} after ${count} results`).toBeLessThan(1);
      }
    }
  }
  await expect(results).toHaveCSS('overflow-y', 'auto');
  // The fixture extends beyond the visible rows and scrolls inside the fixed dialog.
  await expect.poll(() => results.evaluate(area => area.scrollHeight > area.clientHeight)).toBe(true);
  await results.evaluate(area => { area.scrollTop = area.scrollHeight; });
  await expect.poll(() => results.evaluate(area => area.scrollTop > 0)).toBe(true);
  const overflow = await geometry();
  expect(overflow.dialog).toEqual(original.dialog);
  expect(overflow.confirm).toEqual(original.confirm);
});

test('tall desktop gives the result region room for at least eight complete rows', async ({ page }, info) => {
  test.skip(info.project.name.startsWith('mobile'), 'Desktop comparison density only.');
  await page.setViewportSize({ width: 1280, height: 1000 });
  const c = controls(page);
  await c.trigger.click();
  const dialog = await c.dialog.boundingBox();
  const area = await page.locator('.results').boundingBox();
  const eighth = await page.locator('.result').nth(7).boundingBox();
  expect(dialog.height).toBeLessThan(1000 * .8);
  expect(eighth.y + eighth.height).toBeLessThanOrEqual(area.y + area.height + 1);
});

for (const record of records) {
  test(`filter and commit actual ${record.id}`, async ({ page }) => {
    const c = controls(page);
    await c.trigger.click();
    await expect(c.confirm).toBeDisabled();
    await c.query.fill(record.filter);
    await expect(page.getByRole('radio')).toHaveCount(1);
    // Real label/radio click must deliver change and enable Select; no event injection.
    await c.radio(record).click();
    await expect(c.radio(record)).toBeChecked();
    await expect(c.confirm).toBeEnabled();
    await c.confirm.click();
    await committed(page, record);
  });
}
test('filter clears pending choice, empty results recover and replacement commits', async ({ page }) => {
  const c = controls(page);
  await c.trigger.click();
  await c.radio(records[0]).click();
  await expect(c.confirm).toBeEnabled();
  await c.query.fill('no-such-location');
  await expect(page.getByRole('radio')).toHaveCount(0);
  await expect(page.getByRole('status')).toContainText('No matching locations');
  await expect(c.confirm).toBeDisabled();
  await c.query.fill('');
  await expect(page.getByRole('radio')).toHaveCount(10);
  for (const record of records) await expect(c.radio(record)).not.toBeChecked();
  await expect(c.confirm).toBeDisabled();
  await c.radio(records[0]).click();
  await c.radio(records[1]).click();
  await expect(c.radio(records[0])).not.toBeChecked();
  await expect(c.radio(records[1])).toBeChecked();
  await expect(c.confirm).toBeEnabled();
  await c.confirm.click();
  await committed(page, records[1]);
});
for (const exit of ['Cancel', 'Close', 'Escape']) {
  test(`${exit} discards replacement and preserves committed value`, async ({ page }) => {
    const c = controls(page);
    await select(page, records[0]);
    await c.trigger.click();
    await c.radio(records[1]).click();
    await expect(c.confirm).toBeEnabled();
    if (exit === 'Escape') await page.keyboard.press('Escape');
    else await c[exit.toLowerCase()].click();
    await committed(page, records[0]);
    await c.trigger.click();
    await expect(c.query).toHaveValue('');
    await expect(c.region).toHaveValue('');
    await expect(c.type).toHaveValue('');
    await expect(c.confirm).toBeDisabled();
    for (const record of records) await expect(c.radio(record)).not.toBeChecked();
  });
}
test('Clear removes committed value, returns focus and allows reselection', async ({ page }) => {
  const c = controls(page);
  await select(page, records[1]);
  await c.clear.click();
  await expect(c.selection).not.toBeVisible();
  await expect(c.selection.locator('[data-ref="selected-name"]')).toHaveText('');
  await expect(c.selection.locator('[data-ref="selected-id"]')).toHaveText('');
  await expect(c.trigger).toBeFocused();
  await select(page, records[0]);
});
for (const activation of ['Enter', 'Space']) {
  test(`native Tab, reverse Tab, radio keys and action ${activation}`, async ({ page }, info) => {
    test.skip(info.project.name.startsWith('mobile'), 'Physical keyboard traversal is covered by desktop engines.');
    const c = controls(page);
    // Reach every control using the browser's keyboard navigation, not locator.focus().
    await page.keyboard.press('Tab');
    await expect(c.trigger).toBeFocused();
    await page.keyboard.press(activation);
    await expect(c.query).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(c.query).toBeFocused();
    await expect(c.dialog).toBeVisible();
    await c.query.fill('North');
    await expect(page.getByRole('radio')).toHaveCount(2);
    await page.keyboard.press('Tab');
    await expect(c.region).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(c.type).toBeFocused();
    await page.keyboard.press('Tab');
    const results = page.getByRole('radiogroup', { name: 'Matching service locations' });
    const regionFocused = await results.evaluate(area => area === document.activeElement);
    if (regionFocused) {
      // Firefox includes the result region when it needs internal scrolling.
      expect(info.project.name).toBe('firefox');
      expect(await results.evaluate(area => area.scrollHeight > area.clientHeight)).toBe(true);
      await page.keyboard.press('Tab');
    }
    await expect(c.radio(records[0])).toBeFocused();
    await page.keyboard.press('Space');
    await expect(c.radio(records[0])).toBeChecked();
    await expect(c.confirm).toBeEnabled();
    await page.keyboard.press('ArrowDown');
    await expect(c.radio(northService)).toBeFocused();
    await expect(c.radio(northService)).toBeChecked();
    await expect(c.radio(records[0])).not.toBeChecked();
    await page.keyboard.press('ArrowUp');
    await expect(c.radio(records[0])).toBeChecked();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Tab');
    await expect(c.cancel).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(c.confirm).toBeFocused();
    // Observed native engine boundaries: Firefox stays at the last action;
    // Chromium/WebKit visit browser chrome (WebKit also visits the dialog).
    // Assert every step; never silently skip an unexpected page control.
    if (info.project.name === 'firefox') {
      await page.keyboard.press('Tab');
      await expect(c.confirm).toBeFocused();
    } else {
      const boundary = async (key, destination) => {
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press(key);
          if (await destination.evaluate(el => el === document.activeElement)) break;
          await expect.poll(() => page.evaluate(() =>
            document.activeElement === document.body ||
            document.activeElement === document.getElementById('location-dialog')
          )).toBe(true);
        }
        await expect(destination).toBeFocused();
      };
      await boundary('Tab', c.close);
      await boundary('Shift+Tab', c.confirm);
    }
    await page.keyboard.press('Shift+Tab');
    await expect(c.cancel).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(c.radio(northService)).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    if (regionFocused) {
      await expect(results).toBeFocused();
      await page.keyboard.press('Shift+Tab');
    }
    await expect(c.type).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(c.region).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(c.query).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(c.close).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(c.query).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(c.region).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(c.type).toBeFocused();
    if (regionFocused) {
      await page.keyboard.press('Tab');
      await expect(results).toBeFocused();
    }
    await page.keyboard.press('Tab');
    await expect(c.radio(northService)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(c.cancel).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(c.confirm).toBeFocused();
    await page.keyboard.press(activation);
    await committed(page, northService);
    await page.keyboard.press('Tab');
    await expect(c.clear).toBeFocused();
    await page.keyboard.press(activation);
    await expect(c.selection).not.toBeVisible();
    await expect(c.trigger).toBeFocused();
  });
}
test('mobile fullscreen keeps results and footer actionable after viewport resize', async ({ page }, info) => {
  test.skip(!info.project.name.startsWith('mobile'), 'Touch viewport case.');
  const c = controls(page);
  await c.trigger.tap();
  await expect(page.locator('#dialog-title')).toBeFocused();
  for (const height of [640, 400]) {
    await page.setViewportSize({ width: 390, height });
    await expect.poll(async () => {
      const b = await c.dialog.boundingBox();
      return b && Math.abs(b.x) < 1 && Math.abs(b.y) < 1 && Math.abs(b.width - 390) < 1 && Math.abs(b.height - height) < 1;
    }).toBe(true);
    const [header, conditions, results, footer] = await Promise.all([
      page.locator('.dialog-heading').boundingBox(), page.locator('.conditions').boundingBox(),
      page.locator('.results').boundingBox(), page.locator('.dialog-actions').boundingBox(),
    ]);
    expect(header.y + header.height).toBeLessThanOrEqual(conditions.y);
    expect(conditions.y + conditions.height).toBeLessThanOrEqual(results.y);
    expect(results.height).toBeGreaterThan(0);
    expect(results.y + results.height).toBeLessThanOrEqual(footer.y + 1);
    expect(footer.y + footer.height).toBeLessThanOrEqual(height + 1);
    await expect(page.locator('.results')).toHaveCSS('overflow-y', 'auto');
    await c.query.fill('');
    await c.radio(records[1]).tap();
    await expect(c.radio(records[1])).toBeChecked();
    await expect(c.confirm).toBeEnabled();
    for (const action of [c.cancel, c.confirm]) {
      const b = await action.boundingBox();
      expect(b.y).toBeGreaterThanOrEqual(0);
      expect(b.y + b.height).toBeLessThanOrEqual(height);
    }
    await c.confirm.tap();
    await committed(page, records[1]);
    await c.trigger.tap();
  }
  await c.cancel.tap();
  await committed(page, records[1]);
});

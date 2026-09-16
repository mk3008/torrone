const { test, expect } = require('@playwright/test');
const records = [
  { id: 'LC-031', name: 'North Distribution Center', filter: ' north ' },
  { id: 'LC-044', name: 'Riverside Depot', filter: 'lc-044' },
];
function controls(page) {
  return {
    trigger: page.getByRole('button', { name: 'Find location', exact: true }),
    dialog: page.getByRole('dialog'),
    query: page.getByRole('textbox', { name: 'Location ID or name' }),
    confirm: page.getByRole('button', { name: 'Select', exact: true }),
    cancel: page.getByRole('button', { name: 'Cancel', exact: true }),
    close: page.getByRole('button', { name: 'Close location search' }),
    clear: page.getByRole('button', { name: 'Clear selected location' }),
    selection: page.locator('[data-ref="lookup-selection"]'),
    radio: record => page.getByRole('radio', { name: `${record.name} Location ${record.id}`, exact: true }),
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
  await expect(page.getByRole('radio')).toHaveCount(2);
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
    await page.keyboard.press('Tab');
    await expect(c.radio(records[0])).toBeFocused();
    await page.keyboard.press('Space');
    await expect(c.radio(records[0])).toBeChecked();
    await expect(c.confirm).toBeEnabled();
    await page.keyboard.press('ArrowDown');
    await expect(c.radio(records[1])).toBeFocused();
    await expect(c.radio(records[1])).toBeChecked();
    await expect(c.radio(records[0])).not.toBeChecked();
    await page.keyboard.press('ArrowUp');
    await expect(c.radio(records[0])).toBeChecked();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Tab');
    await expect(c.cancel).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(c.confirm).toBeFocused();
    // Native dialogs may visit browser chrome at the document boundary.
    // Permit only that neutral BODY state, never a background page control.
    await page.keyboard.press('Tab');
    if (await page.evaluate(() => document.activeElement === document.body)) {
      await expect(c.dialog).toBeVisible();
      await page.keyboard.press('Tab');
    }
    await expect(c.close).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    if (await page.evaluate(() => document.activeElement === document.body)) {
      await expect(c.dialog).toBeVisible();
      await page.keyboard.press('Shift+Tab');
    }
    await expect(c.confirm).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(c.cancel).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(c.radio(records[1])).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(c.query).toBeFocused();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(c.confirm).toBeFocused();
    await page.keyboard.press(activation);
    await committed(page, records[1]);
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

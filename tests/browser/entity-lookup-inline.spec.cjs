const { test, expect } = require('@playwright/test');
const records = [
  { id: 'LC-031', name: 'North Distribution Center' },
  { id: 'LC-044', name: 'Riverside Depot' },
  { id: 'LC-052', name: 'Harbor Service Point' },
];
const ui = page => ({
  input: page.getByRole('combobox', { name: 'Location ID or name' }),
  popup: page.getByRole('listbox', { name: 'Matching service locations' }),
  option: item => page.getByRole('option', { name: `${item.name} Location ${item.id}` }),
  clear: page.getByRole('button', { name: 'Clear selected location' }),
  id: page.locator('[data-ref="selected-id"]'),
  field: page.locator('[data-ref="lookup-field"]'),
});
async function committed(page, item) {
  const c = ui(page);
  await expect(c.input).toHaveValue(item.name);
  await expect(c.id).toHaveText(`Location ${item.id}`);
  await expect(c.field).toHaveAttribute('data-selected', 'true');
  await expect(c.clear).toBeVisible();
  await expect(c.popup).toBeHidden();
  await expect(c.input).toBeFocused();
}
test.beforeEach(async ({ page }) => page.goto('/entity-lookup-inline.html'));

test('pointer search, selection, cancellation, clear and reselection', async ({ page }) => {
  const c = ui(page);
  await c.input.click();
  await expect(c.popup).toBeVisible();
  await expect(page.getByRole('option')).toHaveCount(3);
  await c.input.fill(' lc-044 ');
  await expect(page.getByRole('option')).toHaveCount(1);
  await c.option(records[1]).click();
  await committed(page, records[1]);
  await c.input.fill('north');
  await expect(c.field).toHaveAttribute('data-selected', 'false');
  await expect(c.id).toBeHidden();
  await page.keyboard.press('Escape');
  await committed(page, records[1]);
  await c.clear.click();
  await expect(c.input).toHaveValue('');
  await expect(c.input).toBeFocused();
  await expect(c.id).toBeHidden();
  await expect(c.popup).toBeVisible();
  await c.input.fill('harbor');
  await c.option(records[2]).click();
  await committed(page, records[2]);
});

test('empty result, recovery and unfinished query restore on leaving', async ({ page }) => {
  const c = ui(page);
  await c.input.fill('no-such-location');
  await expect(page.getByRole('option')).toHaveCount(0);
  await expect(c.popup).toContainText('No matching locations');
  await c.input.fill('north');
  await expect(c.option(records[0])).toBeVisible();
  await c.option(records[0]).click();
  await committed(page, records[0]);
  await c.input.fill('riverside');
  await page.locator('#heading').click();
  await expect(c.input).toHaveValue(records[0].name);
  await expect(c.id).toHaveText(`Location ${records[0].id}`);
  await expect(c.popup).toBeHidden();
});

test('keyboard highlights, commits and cancels without accepting free text', async ({ page }, info) => {
  test.skip(info.project.name.startsWith('mobile'), 'Desktop native keyboard path.');
  const c = ui(page);
  await page.keyboard.press('Tab');
  await expect(c.input).toBeFocused();
  await expect(c.popup).toBeVisible();
  await page.keyboard.press('ArrowDown');
  await expect(c.input).toHaveAttribute('aria-activedescendant', 'location-option-0');
  await page.keyboard.press('ArrowDown');
  await expect(c.input).toHaveAttribute('aria-activedescendant', 'location-option-1');
  await page.keyboard.press('Enter');
  await committed(page, records[1]);
  await page.keyboard.press('ArrowUp');
  await expect(c.input).toHaveValue('');
  await expect(c.input).toHaveAttribute('aria-activedescendant', 'location-option-2');
  await page.keyboard.press('Enter');
  await committed(page, records[2]);
  await c.input.fill('nonsense');
  await page.keyboard.press('Enter');
  await expect(c.popup).toBeVisible();
  await expect(c.input).toHaveValue('nonsense');
  await page.keyboard.press('Tab');
  await expect(c.input).toHaveValue(records[2].name);
  await expect(c.id).toHaveText(`Location ${records[2].id}`);
  await expect(c.popup).toBeHidden();
  await expect(c.clear).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(c.input).toHaveValue('');
  await expect(c.input).toBeFocused();
  await expect(c.popup).toBeVisible();
});

test('mobile popup remains within viewport and accepts touch selection', async ({ page }, info) => {
  test.skip(!info.project.name.startsWith('mobile'), 'Touch viewport case.');
  const c = ui(page);
  for (const height of [640, 400]) {
    await page.setViewportSize({ width: 390, height });
    await c.input.tap();
    await expect(c.popup).toBeVisible();
    const bounds = await c.popup.boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(390);
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(height);
    await c.input.fill('riverside');
    await c.option(records[1]).tap();
    await committed(page, records[1]);
    await c.clear.tap();
  }
});

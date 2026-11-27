import { test, expect } from '@playwright/test';

test('Flaky test demonstration', async ({ page }) => {

  await page.goto('https://demo.playwright.dev/todomvc/');

  await page.waitForTimeout(100);

  await expect(
    page.getByPlaceholder('What needs to be done?')
  ).toBeVisible();

});
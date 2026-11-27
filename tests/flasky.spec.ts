
import { test, expect } from '@playwright/test';

test('Flaky test using hard-coded wait', async ({ page }) => {
  await page.setContent(`
    <button id="loadButton" style="display:none">
      Submit
    </button>

    <script>
      setTimeout(() => {
        document.getElementById('loadButton').style.display = 'block';
      }, 1500);
    </script>
  `);

  // Automatically waits until the button becomes visible
  await expect(page.locator('#loadButton')).toBeVisible();

  // Hard-coded wait: shorter than the button's delay
  await page.waitForTimeout(500);

  // Race condition: button may not be visible yet
  await expect(page.locator('#loadButton')).toBeVisible({
    timeout: 300
  });
});

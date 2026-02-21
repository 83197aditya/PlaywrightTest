import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://playwright.dev');
  
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  
  // click on get started link.
  await page.click('text=Get started');
  
  // Expects some dynamic content to be visible after page navigation.
  await expect(page.getByRole('heading', { name: 'System requirements' })).toBeVisible();
});

test('example two', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  console.log('Page title:', title);
  expect(title).toBeTruthy();
});


import { test, expect } from '@playwright/test';

const URL = 'https://demo.playwright.dev/todomvc';

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

// TEST 1: Add a todo using getByPlaceholder and getByRole
test('Add a new todo', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?');

  await todoInput.fill('Learn Playwright');
  await todoInput.press('Enter');

  await expect(
    page.getByTestId('todo-item')
  ).toHaveText('Learn Playwright');
});

// TEST 2: Verify the number of todos using toHaveCount
test('Add two todos and verify count', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?');

  await todoInput.fill('Learn TypeScript');
  await todoInput.press('Enter');

  await todoInput.fill('Practice Automation');
  await todoInput.press('Enter');

  await expect(
    page.getByTestId('todo-item')
  ).toHaveCount(2);
});

// TEST 3: Use getByText and soft assertion
test('Verify todo text using soft assertion', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?');

  await todoInput.fill('Complete QA Assignment');
  await todoInput.press('Enter');

  await expect.soft(
    page.getByText('Complete QA Assignment', { exact: true })
  ).toBeVisible();

  await expect(page.getByTestId('todo-item')).toHaveCount(1);
});

// TEST 4: Verify heading visibility
test('Todo heading should be visible', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: 'todos' })
  ).toBeVisible();
});

// TEST 5: Verify input visibility
test('Todo input should be visible', async ({ page }) => {
  await expect(
    page.getByRole('textbox', { name: 'What needs to be done?' })
  ).toBeVisible();
});

// TEST 6: Verify All filter visibility
test('All filter should be visible', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?');
  await todoInput.fill('Show filters');
  await todoInput.press('Enter');

  await expect(
    page.getByRole('link', { name: 'All' })
  ).toBeVisible();
});

// TEST 7: Verify Active filter visibility
test('Active filter should be visible', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?');
  await todoInput.fill('Show filters');
  await todoInput.press('Enter');

  await expect(
    page.getByRole('link', { name: 'Active' })
  ).toBeVisible();
});

// TEST 8: Verify Completed filter visibility
test('Completed filter should be visible', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?');
  await todoInput.fill('Show filters');
  await todoInput.press('Enter');

  await expect(
    page.getByRole('link', { name: 'Completed' })
  ).toBeVisible();
});

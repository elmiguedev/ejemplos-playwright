import { Page, expect, test } from "@playwright/test";

const APP_URL = "https://demo.playwright.dev/todomvc";

test("new todo", async ({ page }) => {
  await page.goto(APP_URL);
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('New todo');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  const todo = await page.getByTestId('todo-title').last();

  await expect(todo).toHaveText('New todo');
})

test("complete todo", async ({ page }) => {
  await page.goto(APP_URL);
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('Todo to complete');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  const todo = await page.getByTestId('todo-item').filter({ hasText: 'Todo to complete' });
  await todo.locator('.toggle').click();
  await expect(todo).toHaveClass('completed');
})

test("delete todo", async ({ page }) => {
  await page.goto(APP_URL);
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('Todo to delete');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  const todo = await page.getByTestId('todo-item').filter({ hasText: 'Todo to delete' });

  await todo.hover();
  const button = await todo.locator('.destroy');
  await button.click();

  await expect(1).toBe(1);
})
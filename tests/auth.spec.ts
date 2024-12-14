import { test } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('User Registration', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Email').fill('test25@foo.com');
  await page.getByPlaceholder('Password', { exact: true }).fill('changeme');
  await page.getByPlaceholder('Confirm Password').fill('changeme');
  await page.getByRole('button', { name: 'Register' }).click();
});

import { test } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('Create and Edit Profile', async ({ page }) => {
  await page.goto('http://localhost:3000/createProfile', { timeout: 60000 });
  await page.getByRole('button', { name: '+' }).waitFor({ state: 'visible', timeout: 60000 });
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '+' }).setInputFiles('owlbuddy.png');
  await page.getByPlaceholder('First Name').fill('Owen');
  await page.getByPlaceholder('Last Name').fill('Foo');
  await page.getByRole('button', { name: 'College Role' }).click();
  await page.getByRole('button', { name: 'Student' }).click();
  await page.getByPlaceholder('Major').fill('CS');
  await page.getByPlaceholder('Social').fill('ig:owfoo22');
  await page.getByPlaceholder('Bio: Tell us about yourself!').fill('I like owls');
  await page.getByRole('button', { name: 'Create Profile' }).click();

  // Edit Profile
  await page.locator('div').filter({ hasText: 'Name:Owen FooMajor:CSCollege' }).nth(2).click();
  await page.getByRole('button', { name: 'Edit Profile' }).click();
  await page.getByPlaceholder('Bio: Tell us about yourself!').fill('I love owls!');
  await page.getByRole('button', { name: 'Save Profile' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});

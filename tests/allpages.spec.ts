import { test } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('ralph22@hawaii.edu');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password').fill('changeme');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto('http://localhost:3000/sessions');
  await page.getByRole('link', { name: 'My Sessions' }).click();
  await page.goto('http://localhost:3000/mySessions');
  await page.getByRole('link', { name: 'Buddies', exact: true }).click();
  await page.goto('http://localhost:3000/buddies');
  await page.getByRole('link', { name: 'My Buddies' }).click();
  await page.goto('http://localhost:3000/myBuddies');
  await page.getByRole('link', { name: 'Study Playlist' }).click();
  await page.getByRole('button', { name: 'ralph22@hawaii.edu' }).click();
  await page.getByRole('link', { name: 'My Profile' }).click();
  await page.goto('http://localhost:3000/myProfile');
  await page.getByRole('button', { name: 'Edit Profile' }).click();
  await page.goto('http://localhost:3000/editProfile');
  await page.getByText('Edit Profile').click();
  await page.getByRole('img', { name: 'Profile' }).click();
});

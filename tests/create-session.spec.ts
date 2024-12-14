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
  await page.getByRole('button', { name: '+' }).click();
  await page.goto('http://localhost:3000/createSession');
  await page.getByPlaceholder('Enter Title').click();
  await page.getByPlaceholder('Enter Title').fill('Trig Integrals');
  await page.getByPlaceholder('Select session date').click();
  await page.getByLabel('Choose Monday, December 16th,').click();
  await page.locator('#startTime').click();
  await page.locator('#startTime').press('Tab');
  await page.locator('#startTime').fill('10:00');
  await page.locator('#startTime').press('Tab');
  await page.locator('#startTime').press('Tab');
  await page.locator('#startTime').press('CapsLock');
  await page.locator('#startTime').press('Tab');
  await page.locator('#endTime').click();
  await page.locator('#endTime').press('ArrowLeft');
  await page.locator('#endTime').press('Tab');
  await page.locator('#endTime').press('Tab');
  await page.locator('#endTime').fill('13:00');
  await page.getByPlaceholder('Enter Session Description').click();
  await page.getByPlaceholder('Enter Session Description').fill('');
  await page.getByPlaceholder('Enter Session Description').press('CapsLock');
  await page.getByPlaceholder('Enter Session Description').fill('Study for trig integrals quiz');
  await page.getByPlaceholder('Enter Class').click();
  await page.getByPlaceholder('Enter Class').press('CapsLock');
  await page.getByPlaceholder('Enter Class').fill('MATH242');
  await page.getByPlaceholder('Where to study').click();
  await page.getByPlaceholder('Where to study').fill('LIBRAR');
  await page.getByPlaceholder('Where to study').press('CapsLock');
  await page.getByPlaceholder('Where to study').fill('Library');
  await page
    .locator('div')
    .filter({ hasText: /^Session ImageNo imageuploadedClassPlace$/ })
    .getByRole('button')
    .click();
  await page
    .locator('div')
    .filter({ hasText: /^Session ImageNo imageuploadedClassPlace$/ })
    .getByRole('button')
    .setInputFiles('calc2img.png');
  await page.getByPlaceholder('Enter Class').click();
  await page.getByRole('button', { name: 'Add Session' }).click();
  await page.getByRole('button', { name: 'Trig Integrals Study for trig' }).click();
  await page.getByRole('tab', { name: 'Buddies' }).click();
});

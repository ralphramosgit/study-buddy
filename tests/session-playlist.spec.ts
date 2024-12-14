import { test } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('Manage Sessions and Playlists', async ({ page }) => {
  // Navigate to Sessions
  await page.goto('http://localhost:3000/sessions');
  await page.getByRole('button', { name: 'Cramming Series Study for' }).click();
  await page.getByRole('tab', { name: 'Buddies' }).click();
  await page.getByRole('tab', { name: 'Study Session Info' }).click();
  await page.locator('#sessionModal').getByRole('button', { name: 'Add' }).click();
  await page.goto('http://localhost:3000/mySessions');
  await page.getByRole('button', { name: 'Cramming Series Study for' }).click();
  // ... (additional session steps)

  // Manage Playlists
  await page.getByRole('link', { name: 'Study Playlist' }).click();
  await page
    .getByPlaceholder('Enter playlist URL')
    .fill('https://open.spotify.com/playlist/00vJgCqGYCVGjC3NJO7Jn0?si=cd37d2f31352468d');
  await page.getByRole('button', { name: 'Add Playlist' }).click();
  // ... (additional playlist steps)
});

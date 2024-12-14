import { test } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('test25@foo.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password', { exact: true }).fill('changeme');
  await page.getByPlaceholder('Password', { exact: true }).press('Tab');
  await page.getByPlaceholder('Confirm Password').fill('changeme');
  await page.getByRole('button', { name: 'Register' }).click();
  try {
    await page.goto('http://localhost:3000/createProfile', { timeout: 60000 });
  } catch (error) {
    console.error('Navigation to /createProfile failed:', error);
    throw error;
  }
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '+' }).setInputFiles('owlbuddy.png');
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('Owen');
  await page.getByPlaceholder('First Name').press('Tab');
  await page.getByPlaceholder('Last Name').fill('Foo');
  await page.getByRole('button', { name: 'College Role' }).click();
  await page.getByRole('button', { name: 'Student' }).click();
  await page.getByPlaceholder('Major').click();
  await page.getByPlaceholder('Major').press('CapsLock');
  await page.getByPlaceholder('Major').fill('CS');
  await page.getByPlaceholder('Major').press('CapsLock');
  await page.getByPlaceholder('Major').press('Tab');
  await page.getByPlaceholder('Social').fill('ig:owfoo22');
  await page.getByPlaceholder('Bio: Tell us about yourself!').click();
  await page.getByPlaceholder('Bio: Tell us about yourself!').fill('I like owls');
  await page.getByRole('button', { name: 'Create Profile' }).click();
  await page.locator('div').filter({ hasText: 'Name:Owen FooMajor:CSCollege' }).nth(2).click();
  await page.getByRole('button', { name: 'Edit Profile' }).click();
  await page.getByPlaceholder('Bio: Tell us about yourself!').click();
  await page.getByPlaceholder('Bio: Tell us about yourself!').fill('I love owls!');
  await page.getByRole('button', { name: 'Save Profile' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.goto('http://localhost:3000/sessions');
  await page.getByRole('button', { name: 'Cramming Series Study for' }).click();
  await page.getByRole('tab', { name: 'Buddies' }).click();
  await page.getByRole('tab', { name: 'Study Session Info' }).click();
  await page.getByRole('tab', { name: 'Buddies' }).click();
  await page.getByRole('tab', { name: 'Study Session Info' }).click();
  await page.locator('#sessionModal').getByRole('button', { name: 'Add' }).click();
  await page.goto('http://localhost:3000/mySessions');
  await page.getByRole('button', { name: 'Cramming Series Study for' }).click();
  await page.getByRole('tab', { name: 'Buddies' }).click();
  await page.getByLabel('Buddies').locator('button').nth(3).click();
  await page.goto('http://localhost:3000/myBuddies');
  await page.getByRole('button', { name: 'Remove' }).click();
  await page.locator('body').click();
  await page.getByRole('link', { name: 'Buddies', exact: true }).click();
  await page.locator('div:nth-child(4) > .buddyCardCont > div > .cardBtnDiv > .requestBtn').click();
  await page.getByRole('link', { name: 'Buddies', exact: true }).click();
  await page.locator('div:nth-child(3) > .buddyCardCont > div > .cardBtnDiv > .requestBtn').click();
  await page.goto('http://localhost:3000/myBuddies');
  await page.getByText('usaburo mendenhallTABio:lolMajor:MathSocials:Usabber22AddAngel CruzLABio:I like').click();
  await page.getByPlaceholder('Search...').fill('');
  await page.getByRole('link', { name: 'Sessions', exact: true }).click();
  await page.getByRole('button', { name: 'Sort Things Out Study for the' }).getByRole('button').click();
  await page.goto('http://localhost:3000/mySessions');
  await page.locator('.sessionCards').click();
  await page
    .locator('div')
    .filter({ hasText: /^Cramming Series$/ })
    .nth(1)
    .click();
  await page.getByLabel('Close').click();
  await page.getByRole('button', { name: 'Cramming Series Study for' }).getByRole('button').click();
  await page.goto('http://localhost:3000/mySessions');
  await page.getByRole('link', { name: 'Sessions', exact: true }).click();
  await page.getByRole('button', { name: 'Chem Cram Cram for final' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Chem Cram Cram for final' }).click();
  await page.locator('#sessionModal').getByRole('button', { name: 'Leave Session' }).click();
  await page.getByLabel('Close').click();
  await page.getByRole('link', { name: 'Sessions', exact: true }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.goto('http://localhost:3000/createSession');
  await page.getByPlaceholder('Enter Title').click();
  await page.getByPlaceholder('Enter Title').fill('Cram Code');
  await page.getByPlaceholder('Select session date').click();
  await page.getByLabel('Choose Saturday, December 14th,').click();
  await page.locator('#startTime').click();
  await page.locator('#startTime').fill('22:30');
  await page.locator('#startTime').press('Tab');
  await page.locator('#startTime').press('Tab');
  await page.locator('#startTime').press('Tab');
  await page.locator('#startTime').fill('10:30');
  await page.locator('#startTime').press('CapsLock');
  await page.locator('#startTime').press('Tab');
  await page.locator('#endTime').click();
  await page.locator('#endTime').fill('11:30');
  await page.getByPlaceholder('Enter Session Description').click();
  await page.getByPlaceholder('Enter Session Description').fill('nEED ');
  await page.getByPlaceholder('Enter Session Description').press('CapsLock');
  await page.getByPlaceholder('Enter Session Description').fill('');
  await page.getByPlaceholder('Enter Session Description').press('CapsLock');
  await page.getByPlaceholder('Enter Session Description').fill('OOP');
  await page.getByPlaceholder('Enter Session Description').press('CapsLock');
  await page.getByPlaceholder('Enter Session Description').fill('OOP practice');
  await page.getByPlaceholder('Enter Class').click();
  await page.getByPlaceholder('Enter Class').press('CapsLock');
  await page.getByPlaceholder('Enter Class').fill('ICS111');
  await page.getByPlaceholder('Enter Class').press('CapsLock');
  await page.getByPlaceholder('Where to study').click();
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
    .setInputFiles('oop.png');
  await page.getByRole('button', { name: 'Add Session' }).click();
  await page.getByRole('button', { name: 'Cram Code OOP practice' }).click();
  await page.getByRole('tab', { name: 'Buddies' }).click();
  await page.getByRole('tab', { name: 'Study Session Info' }).click();
  await page.getByRole('tab', { name: 'Buddies' }).click();
  await page.getByText('Owen Foo', { exact: true }).click();
  await page.getByRole('tab', { name: 'Study Session Info' }).click();
  await page.getByText('Description:OOP practice').click();
  await page.getByText('Organizer:Owen Foo').click();
  await page.getByText('Class:ICS111').click();
  await page.getByText('Where:Library').click();
  await page.getByLabel('Study Session Info').getByText('Date: Saturday, December').click();
  await page.getByLabel('Study Session Info').getByText('Time: 10:30 AM-11:30 AM').click();
  await page.locator('#sessionModal').getByRole('button', { name: 'Edit' }).click();
  await page.goto('http://localhost:3000/editSession?id=8');
  await page.getByPlaceholder('Enter Title').click();
  await page.getByPlaceholder('Enter Title').fill('Cram Code ');
  await page.getByPlaceholder('Enter Title').press('Tab');
  await page.getByPlaceholder('Select session date').fill('');
  await page.getByPlaceholder('Select session date').press('CapsLock');
  await page.getByLabel('Choose Sunday, December 15th,').click();
  await page.getByPlaceholder('Enter Title').click();
  await page.getByPlaceholder('Enter Title').press('CapsLock');
  await page.getByPlaceholder('Enter Title').fill('Cram Code o');
  await page.getByPlaceholder('Enter Title').press('CapsLock');
  await page.getByPlaceholder('Enter Title').fill('Cram Code OOP');
  await page.getByPlaceholder('Enter Title').press('CapsLock');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cram Code OOP OOP practice' }).click();
  await page.getByLabel('Close').click();
  await page.getByRole('link', { name: 'My Sessions' }).click();
  await page.getByRole('button', { name: 'Cram Code OOP OOP practice' }).click();
  await page.getByLabel('Close').click();
  await page.getByRole('button', { name: 'Edit', exact: true }).click();
  await page.getByRole('button').nth(3).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'OK', exact: true }).click();
  await page.getByRole('link', { name: 'Study Playlist' }).click();
  await page.getByPlaceholder('Enter playlist URL').click();
  await page
    .locator('div')
    .filter({ hasText: /^Share your Study Playlist$/ })
    .click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByText("usaburo mendenhall's Playlisthttps://open.spotify.com/playlist/").click();
  await page1Promise;
  await page.getByPlaceholder('Enter playlist URL').click();
  await page
    .getByPlaceholder('Enter playlist URL')
    .fill('https://open.spotify.com/playlist/00vJgCqGYCVGjC3NJO7Jn0?si=cd37d2f31352468d');
  await page.getByRole('button', { name: 'Add Playlist' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page
    .locator('div')
    .filter({ hasText: /^https:\/\/open\.spotify\.com\/playlist\/2IrpTb4RH9l79WKtGQqqaY\?si=d26a292f0ca344ca$/ })
    .nth(1)
    .click();
  await page2Promise;
  await page.getByRole('heading', { name: "Owen Foo's Playlist" }).click();
  const page3Promise = page.waitForEvent('popup');
  await page.getByText("Owen Foo's Playlisthttps://").click();
  await page3Promise;
  await page.getByRole('button', { name: 'test25@foo.com' }).click();
  await page.getByRole('link', { name: 'My Profile' }).click();
  await page.goto('http://localhost:3000/myProfile');
  await page.getByRole('button', { name: 'test25@foo.com' }).click();
  await page.getByRole('link', { name: 'Sign Out' }).click();
});

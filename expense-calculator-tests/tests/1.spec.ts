import { test, expect } from '@playwright/test';

test('1 person pay 2 ppl (with 2dp)', async ({ page }) => {
  await page.goto('https://pgul.appian.community/suite/sites/expense-calculator/');
  await page.getByRole('button', { name: 'I Agree' }).click();
  await page.getByPlaceholder('Username').fill('alice');
  await page.getByPlaceholder('Username').press('Tab');
  await page.getByPlaceholder('Password').fill('hello123');
  await page.getByPlaceholder('Password').press('Enter');
  await page.getByRole('link', { name: 'Caluculate Your Expenses' }).click();



  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('Ali');


  await page.getByLabel('Expense (S$)').click();
  await page.getByLabel('Expense (S$)').fill('40.105');


  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByRole('row', { name: 'Name Expense (S$) delete 2' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 2' }).getByLabel('Name').fill('Bob');
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).fill('40.105');
  await page.getByRole('textbox', { name: 'Expense (S$)', exact: true }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 3' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 3' }).getByLabel('Name').fill('Charlie');
  await page.getByRole('textbox', { name: 'Expense (S$) Charlie' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Charlie' }).fill('10');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Results' }).click();

    // Capture a screenshot of the page
    await page.screenshot({ path: '1.png' });








   

});


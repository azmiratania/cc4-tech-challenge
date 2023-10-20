import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://pgul.appian.community/suite/');
  await page.getByRole('button', { name: 'I Agree' }).click();
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('alice');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('hello123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Navigation' }).click();
  
  
  await page.goto("https://pgul.appian.community/suite/sites/expense-calculator/page/expenses/start-process/iQBkhfYMQ3WH4e_sSOL07lK8QdSdgxAgBD5j8OuabeeNqq3NQw?parameters=a23aec1e-6b12-4bcf-8567-ea2efb9507ad")



  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('Ali');
  await page.getByLabel('Expense (S$)').click();
  await page.getByLabel('Expense (S$)').fill('10');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 2' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 2' }).getByLabel('Name').fill('Bob');
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).fill('20');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 3' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 3' }).getByLabel('Name').fill('Charlie');
  await page.getByRole('textbox', { name: 'Expense (S$) Charlie' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Charlie' }).fill('0');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 4' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 4' }).getByLabel('Name').fill('Don');
  await page.getByRole('textbox', { name: 'Expense (S$) Don' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Don' }).fill('10');



  await page.getByRole('button', { name: 'Submit' }).click();
  
  await page.getByRole('heading', { name: 'Results' }).click();

  await page.getByText('Charlie pays Bob $10.00.').click();
  
  



  // Capture a screenshot of the page
  await page.screenshot({ path: '3.png' });



});
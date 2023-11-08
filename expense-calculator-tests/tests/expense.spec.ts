import { test, expect } from '@playwright/test';

// Runs before each test in the file
test.beforeEach(async ({ page }) => {
  await page.goto('https://pgul.appian.community/suite/sites/expense-calculator/');
  await page.getByRole('button', { name: 'I Agree' }).click();
  await page.getByPlaceholder('Username').fill('alice');
  await page.getByPlaceholder('Username').press('Tab');
  await page.getByPlaceholder('Password').fill('hello123');
  await page.getByPlaceholder('Password').press('Enter');
  await page.getByRole('link', { name: 'Caluculate Your Expenses' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByLabel('Name').click();
});

test('#1 - 1 person pay 2 ppl (with 2dp)', async ({ page }) => {
/*
 Ali,40.105
 Bob,40.105
 Charlie,10

 Charlie pays Ali $10.03.
 Charlie pays Bob $10.04.
 Number of transactions:
 2
 */

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

  const line1 = page.locator('text=Charlie pays Ali SGD 10.04');
  const line2 = page.locator('text=Charlie pays Bob SGD 10.03');
  const line3 = page.locator('text=Number of transactions: 2');

  await expect(line1).toContainText('Charlie pays Ali SGD 10.04');
  await expect(line2).toContainText('Charlie pays Bob SGD 10.03');
  await expect(line3).toContainText('Number of transactions: 2');

    // Capture a screenshot of the page
    await page.screenshot({ path: '1.png' });
});

test('#2 - 1 person pay 2 ppl', async ({ page }) => {
/*
Ali,40
Bob,40
Charlie,10

Charlie pays Ali $10.
Charlie pays Bob $10.
Number of transactions:
2
*/

  await page.getByLabel('Name').fill('Ali');
  await page.getByLabel('Expense (S$)').click();
  await page.getByLabel('Expense (S$)').fill('40');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 2' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 2' }).getByLabel('Name').fill('Bob');
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).fill('40');
  await page.getByRole('textbox', { name: 'Expense (S$)', exact: true }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 3' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 3' }).getByLabel('Name').fill('Charlie');
  await page.getByRole('textbox', { name: 'Expense (S$) Charlie' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Charlie' }).fill('10');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Results' }).click();

  const line1 = page.locator('text=Charlie pays Ali SGD 10.00');
  const line2 = page.locator('text=Charlie pays Bob SGD 10.00');
  const line3 = page.locator('text=Number of transactions: 2');

  await expect(line1).toContainText('Charlie pays Ali SGD 10.00');
  await expect(line2).toContainText('Charlie pays Bob SGD 10.00');
  await expect(line3).toContainText('Number of transactions: 2');


  // Capture a screenshot of the page
  await page.screenshot({ path: '2.png' });

});

test('#3 - 4 ppl', async ({ page }) => {
/*
Ali,10
Bob,20
Charlie,0
Don,10

Charlie pays Bob $10.
Number of transactions:
1
*/
  
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



  const line1 = page.locator('text=Charlie pays Bob SGD 10.00');
  const line2 = page.locator('text=Number of transactions: 1');

  await expect(line1).toContainText('Charlie pays Bob SGD 10.00');
  await expect(line2).toContainText('Number of transactions: 1');


  // Capture a screenshot of the page
  await page.screenshot({ path: '3.png' });

});


test('#4- 4 ppl #2', async ({ page }) => {

/*
Alice, 200
Bob, 80
Charlie, 50
Don, 20

Bob pays Alice $7.50
Charlie pays Alice $37.50
Don pays Alice $67.50
Number of transactions:
3
*/

  await page.getByLabel('Name').fill('Alice');
  await page.getByLabel('Expense (S$)').click();
  await page.getByLabel('Expense (S$)').fill('40');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 2' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 2' }).getByLabel('Name').fill('Bob');
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).fill('40');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 3' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 3' }).getByLabel('Name').fill('Charlie');
  await page.getByRole('textbox', { name: 'Expense (S$) Charlie' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Charlie' }).fill('10');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 4' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 4' }).getByLabel('Name').fill('Don');
  await page.getByRole('textbox', { name: 'Expense (S$) Don' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Don' }).fill('10');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Results' }).click();

  const line1 = page.locator('text=Charlie pays Alice SGD 15.00');
  const line2 = page.locator('text=Don pays Bob SGD 15.00');
  const line3 = page.locator('text=Number of transactions: 2');

  await expect(line1).toContainText('Charlie pays Alice SGD 15.00');
  await expect(line2).toContainText('Don pays Bob SGD 15.00');
  await expect(line3).toContainText('Number of transactions: 2');


  // Capture a screenshot of the page
  await page.screenshot({ path: '4.png' });



});

test('#5 - 4 ppl, with 1 person paying significantly more', async ({ page }) => {

/*
Alice, 200
Bob, 80
Charlie, 50
Don, 20

Bob pays Alice $7.50
Charlie pays Alice $37.50
Don pays Alice $67.50
Number of transactions:
3
*/

  await page.getByLabel('Name').fill('Alice');
  await page.getByLabel('Expense (S$)').click();
  await page.getByLabel('Expense (S$)').fill('200');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 2' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 2' }).getByLabel('Name').fill('Bob');
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).fill('80');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 3' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 3' }).getByLabel('Name').fill('Charlie');
  await page.getByRole('textbox', { name: 'Expense (S$) Charlie' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Charlie' }).fill('50');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 4' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 4' }).getByLabel('Name').fill('Don');
  await page.getByRole('textbox', { name: 'Expense (S$) Don' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Don' }).fill('20');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Results' }).click();


  const line1 = page.locator('text=Don pays Alice SGD 67.50');
  const line2 = page.locator('text=Charlie pays Alice SGD 37.50');
  const line3 = page.locator('text=Bob pays Alice SGD 7.50');
  const line4 = page.locator('text=Number of transactions: 3');

  await expect(line1).toContainText('Don pays Alice SGD 67.50');
  await expect(line2).toContainText('Charlie pays Alice SGD 37.50');
  await expect(line3).toContainText('Bob pays Alice SGD 7.50');
  await expect(line4).toContainText('Number of transactions: 3');


  // Capture a screenshot of the page
  await page.screenshot({ path: '5.png' });

});


test('#6 - 4 ppl, with 2 persons paying significantly more', async ({ page }) => {

/*
Alice, 160
Bob, 120
Charlie, 50
Don, 20

Charlie pays Alice $37.30
Don pays Alice $35.00
Don pays Bob $32.50
Number of transactions: 3
*/

  await page.getByLabel('Name').fill('Alice');
  await page.getByLabel('Expense (S$)').click();
  await page.getByLabel('Expense (S$)').fill('160');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 2' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 2' }).getByLabel('Name').fill('Bob');
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Bob' }).fill('120');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 3' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 3' }).getByLabel('Name').fill('Charlie');
  await page.getByRole('textbox', { name: 'Expense (S$) Charlie' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Charlie' }).fill('50');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 4' }).getByLabel('Name').click();
  await page.getByRole('row', { name: 'Name Expense (S$) delete 4' }).getByLabel('Name').fill('Don');
  await page.getByRole('textbox', { name: 'Expense (S$) Don' }).click();
  await page.getByRole('textbox', { name: 'Expense (S$) Don' }).fill('20');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Results' }).click();

  const line1 = page.locator('text=Don pays Bob SGD 32.50');
  const line2 = page.locator('text=Don pays Alice SGD 35.00');
  const line3 = page.locator('text=Charlie pays Alice SGD 37.50');
  const line4 = page.locator('text=Number of transactions: 3');

  await expect(line1).toContainText('Don pays Bob SGD 32.50');
  await expect(line2).toContainText('Don pays Alice SGD 35.00');
  await expect(line3).toContainText('Charlie pays Alice SGD 37.50');
  await expect(line4).toContainText('Number of transactions: 3');

  // Capture a screenshot of the page
  await page.screenshot({ path: '6.png' });
});

import { test, expect, Locator } from "@playwright/test";

test.describe("Static Table Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const title: string = await page.title();
    console.log(`Page title is: ${title}`);
  });
  test("TC_001: should validate static table", async ({ page }) => {
    const tableLocator: Locator = page.locator("table[name='BookTable']>tbody");
    await expect(tableLocator).toBeVisible();
    await tableLocator.scrollIntoViewIfNeeded();
  });
  test("TC_002: should read all rows and columns from static table", async ({
    page,
  }) => {
    const tableLocator: Locator = page.locator("table[name='BookTable']>tbody");
    const tableRows: Locator = tableLocator.locator("tr"); //locator chaining
    const rowCount: number = await tableRows.count();
    console.log(`Total number of rows in the table: ${rowCount}`);
    const tableColumns: Locator = tableRows.locator("th"); //locator chaining
    const colCount: number = await tableColumns.count();
    console.log(`Total number of columns in the table: ${colCount}`);
    //reads all data from 2nd row
    const secondRow: Locator = tableRows.nth(2).locator("td");
    const secondRowData: string[] = await secondRow.allInnerTexts();
    console.log(`Data from 2nd row: ${secondRowData}`);
  });
  test("TC_003: Should validate specific cell data from static table using 'of' loop", async ({
    page,
  }) => {
    const tableLocator: Locator = page.locator("table[name='BookTable']>tbody");
    const tableRows: Locator = tableLocator.locator("tr"); //locator chaining
    const secondRow: Locator = tableRows.nth(2).locator("td");
    const secondRowData: string[] = await secondRow.allInnerTexts();
    for (let text of secondRowData) {
      console.log(text);
    }
  });
  test("TC_004: Should read all data from static table", async ({ page }) => {
    const tableLocator: Locator = page.locator("table[name='BookTable'] tbody");
    const tableRows: Locator = tableLocator.locator("tr"); //locator chaining
    const allRowsData: Locator[] = await tableRows.all(); //array of Locators
    console.log("Total rows found:", allRowsData.length);
    for (let row of allRowsData.slice(1)) {
      //skip header row
      const rowData: string[] = await row.locator("td").allInnerTexts();
      console.log(rowData);
    }
  });
  test("TC_005: Should print book name with condition author name", async ({
    page,
  }) => {
    console.log("books written by Mukesh...............");
    const tableLocator: Locator = page.locator("table[name='BookTable'] tbody");
    const tableRows: Locator = tableLocator.locator("tr"); //locator chaining
    const allRowsData: Locator[] = await tableRows.all(); //array of Locators
    const mukeshBooks: string[] = [];
    for (let row of allRowsData.slice(1)) {
      const cellAuthor: string | null = await row
        .locator("td")
        .nth(1)
        .innerText();
      if (cellAuthor === "Mukesh") {
        const bookName: string | null = await row
          .locator("td")
          .nth(0)
          .innerText();
        console.log(bookName);
        mukeshBooks.push(bookName);
      } //skip header row
    }
  });
  test("TC_006: Should add all prices from static table", async ({ page }) => {
    const tableLocator: Locator = page.locator("table[name='BookTable'] tbody");
    const tableRows: Locator = tableLocator.locator("tr"); //locator chaining
    const allRowsData: Locator[] = await tableRows.all(); //array of Locators
    let totalPrice: number = 0;
    for (let row of allRowsData.slice(1)) {
      //skip header row
      const priceText: string | null = await row
        .locator("td")
        .nth(3)
        .innerText();
      const price: number = Number(priceText);
      totalPrice += price;
    }
    console.log(`Total price of all books: ${totalPrice}`);
    expect(totalPrice).toBeGreaterThan(5000);
  });
});

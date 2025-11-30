import { test, expect, Locator } from "@playwright/test";

test.describe("Scrolling demo", () => {
  test("TC_001: Should validate the scrolling", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const scrollingDropdpwn: Locator = page.locator("#comboBox");
    await expect(scrollingDropdpwn).toBeVisible();
    await scrollingDropdpwn.click();
    const option100 = page.locator("#dropdown div:nth-child(100)");
    await option100.click();
    console.log(`Captured option is ${await option100.innerText()}`);
    await page.waitForTimeout(3000);
  });

  test("TC_002: Validate scrolling inside table", async ({ page }) => {
    await page.goto(
      "https://datatables.net/examples/basic_init/scroll_xy.html"
    );
    const table: Locator = page.locator(".demo-html");
    await table.scrollIntoViewIfNeeded();
    //vertical scrolling
    const lastNameLocator: Locator = page.locator(
      "tbody tr:nth-child(10) td:nth-child(2)"
    );
    const name: string | null = await lastNameLocator.innerText();
    console.log(`Last name from 10th row and 2nd coloumn: ${name}`);

    await page.waitForTimeout(5000);
    //horizontal Scrolling
    const emailLocator: Locator = page.locator(
      "tbody tr:nth-child(10) td:nth-child(9)"
    );
    const email: string | null = await emailLocator.innerText();
    console.log(`Last email from 9th coloumn and 10th row ${email}`);
  });

  test("TC_003: Should validate infinite scrolling of a page", async ({
    page,
  }) => {
    test.slow();
    await page.goto("https://www.booksbykilo.in/new-books");
    let previousHeight = 0;
    while (true) {
      //scroll down the page
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      await page.waitForTimeout(1000);

      //capture the current height of the page
      const currentHeight = await page.evaluate(() => {
        return document.body.scrollHeight;
      });

      console.log(`Previous Height: ${previousHeight}`);
      console.log(`Current height: ${currentHeight}`);

      if (currentHeight === previousHeight) {
        break;
      } else {
        previousHeight = currentHeight;
      }
      console.log("Reached at the end of the page..........");
    }
  });

  test("TC_004: Should validate a book while infinite scrolling of a page", async ({
    page,
  }) => {
    test.slow();
    await page.goto("https://www.booksbykilo.in/new-books");
    let previousHeight = 0;
    let bookFound = false;
    while (true) {
      const title = await page.locator("#productsDiv h3").allTextContents();

      if (title.includes("The Home planet")) {
        console.log("...........Book Found.........");
        bookFound = true;
        expect(bookFound).toBeTruthy();
        break;
      }

      //scroll down the page
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      await page.waitForTimeout(1000);

      //capture the current height of the page
      const currentHeight = await page.evaluate(() => {
        return document.body.scrollHeight;
      });

      console.log(`Previous Height: ${previousHeight}`);
      console.log(`Current height: ${currentHeight}`);

      if (currentHeight === previousHeight) {
        break;
      } else {
        previousHeight = currentHeight;
      }
      console.log("Reached at the end of the page..........");
      if (!bookFound) {
        console.log("No book found");
      }
    }
  });
});

import { test, expect, Locator } from "@playwright/test";
import {commonHelper } from './helper/common.helper';

test.describe("Comparing Methods Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const title: string = await page.title();
    console.log(`Page title is: ${title}`);
  });
  test("TC_001: should compare two methods correctly", async ({ page }) => {
    const products: Locator = page.locator(".product-item");
    //innertext() method vs textContent() method
    const item1a: string | null = await products.nth(0).innerText();
    const item1b: string | null = await products.nth(0).textContent();
    console.log(`InnerText of first product: ${item1a}`);
    console.log(`TextContent of first product: ${item1b}`);
  });

  test("TC_002: Should compare both methods for all products", async ({
    page,
  }) => {
    const products: Locator = page.locator(".product-item");
    //fetch all elements using both methods
    const counts: number = await products.count();
    for (let i = 0; i < counts; i++) {
      const innerTextValue: string | null = await products.nth(i).innerText(); //extract plain text without whitespace
      const textContentValue: string | null = await products
        .nth(i)
        .textContent(); //extract text with whitespace and hidden text
      console.log(`Product ${i + 1} - InnerText: ${innerTextValue}`);
      console.log(`Product ${i + 1} - TextContent: ${commonHelper.cleanText(textContentValue)}`);
    }
  });
});

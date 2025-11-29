import { test, expect, Page, chromium, firefox } from "@playwright/test";

//Browser>>>>Context>>>>Pages
test.describe("Browser Context Page demo", () => {
  test("TC_001: Validate for Browser", async ({ browser }) => {
    //const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");
  });

  test("TC_002: Validate for Context", async ({ context }) => {
    //const browser = await chromium.launch();
    //const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");
  });

  test("TC_003: Validate for Page", async ({ page }) => {
    //const browser = await chromium.launch();
    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");
  });

  test("TC_004: Validate for chromium launch", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");
  });

  test("TC_005: Validate for firefox launch", async () => {
    const browser = await firefox.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");
  });

  test("TC_006: Validate for multiple page ", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    const pageCount = context.pages();
    console.log(`Number of pages created are: ${pageCount}`);
    await page1.goto("https://testautomationpractice.blogspot.com/");
    const page1Title:string|null = await page1.title();
    console.log(`Title of page is: ${page1Title}`);
    await page2.goto("https://playwright.dev/docs/intro");
    const page2Title:string|null = await page1.title();
    console.log(`Title of page is: ${page2Title}`);
    await page1.waitForTimeout(2000);
    await page2.waitForTimeout(2000);
  });
});

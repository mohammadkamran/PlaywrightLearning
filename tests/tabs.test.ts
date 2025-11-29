import { chromium, test } from "@playwright/test";

test.describe("Tabs Demo", () => {
  test("TC_001: Should handle tabs", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://testautomationpractice.blogspot.com/");
    const [page2] = await Promise.all([
      //two actions to go parallely
      context.waitForEvent("page"),
      await page1.locator("button:has-text('New Tab')").click(),
    ]);
    const pages = context.pages();
    console.log(`Number of open pages are: ${pages.length}`);
    //fetch title of page using context
    console.log(`Title of page1 ${await pages[0].title()}`);
    console.log(`Title of page1 ${await pages[1].title()}`);
  });
});

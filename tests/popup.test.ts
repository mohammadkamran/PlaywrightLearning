import { chromium, Locator, test } from "@playwright/test";
import { title } from "process";

test.describe("Popup Demo", () => {
  test("TC_001: Validate popups", async ({browser}) => {
    //const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");
    const [popups] = await Promise.all([
      page.waitForEvent('popup'),
      await page.locator("#PopUp").click(),
    ]);
    await page.waitForTimeout(2000);
    const allPopupWindows = context.pages();
    console.log(`Number of popups: ${allPopupWindows.length}`);
    console.log(`url of MainWindow: ${allPopupWindows[0].url()}`);
    console.log(`url of pop1: ${allPopupWindows[1].url()}`);
    console.log(`url of pop2: ${allPopupWindows[2].url()}`);
  });

  test("TC_002: Validate popups click", async ({browser}) => {
    //const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");
    const [popups] = await Promise.all([
      page.waitForEvent('popup'),
      await page.locator("#PopUp").click(),
    ]);
    await page.waitForTimeout(5000);
    const allPopupWindows = context.pages();
    console.log(`Number of popups: ${allPopupWindows.length}`);
    for(const pw of allPopupWindows){
        const title = await pw.title();
        if(title.includes('Playwright')){
            await pw.locator(".getStarted_Sjon").click();
            await page.waitForTimeout(5000);
            await pw.close();
        }
    }
  });
});

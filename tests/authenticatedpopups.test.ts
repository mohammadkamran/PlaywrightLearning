import { chromium, expect, test } from "@playwright/test";

test.describe("Handle Authenticator", () => {
  test("TC_001: Should validate authenticator popups", async ({}) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    //https://username:password@the-internet.herokuapp.com/basic_auth
    await page.goto(
      "https://admin:admin@the-internet.herokuapp.com/basic_auth"
    );
    await page.waitForLoadState(); // wait for complete page load
    await page.waitForTimeout(1000);
    await expect(page.locator("text= congratulations")).toBeVisible();
  });
  //authenticate with browser context using httpCredentials
  test("TC_002: Should validate authenticator popups with browser context", async ({}) => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      httpCredentials: { username: "admin", password: "admin" },
    });
    const page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    await page.waitForLoadState(); // wait for complete page load
    await page.waitForTimeout(1000);
    await expect(page.locator("text= congratulations")).toBeVisible();
  });
});

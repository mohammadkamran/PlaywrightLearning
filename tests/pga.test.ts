import { test, expect } from "@playwright/test";

test("open PGA Tour Superstore staging site with basic auth and accept cookies", async ({
  browser,
}) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: "storefront",
      password: "PGADev2023",
    },
  });
  const page = await context.newPage();

  await page.goto("https://staging.pgatoursuperstore.com/");

  // Try several common cookie-consent selectors and click the first visible one
  const cookieSelectors = [
    'button:has-text("Accept All")',
    'button:has-text("Accept Cookies")',
    'button:has-text("Accept")',
    'button:has-text("Allow All")',
    "text=Accept All",
    "text=Accept Cookies",
    "text=I Accept",
  ];

  for (const sel of cookieSelectors) {
    try {
      await page.waitForSelector(sel, { timeout: 1500 });
      await page.click(sel);
      break;
    } catch (e) {
      // ignore and try next selector
    }
  }

  await expect(page).toHaveURL(/staging\.pgatoursuperstore\.com/);
  await expect(page).toHaveTitle(/PGA Tour Superstore|Superstore/i);

  await context.close();
});

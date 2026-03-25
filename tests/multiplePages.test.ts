import {
  test,
  expect,
  Browser,
  Page,
  chromium,
  BrowserContext,
} from "@playwright/test";
import { ECDH } from "crypto";

test.describe("handling multiple pages", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
  });
  test.afterAll(async () => {
    await browser.close();
  });

  test.beforeEach(async () => {
    await page.goto("https://www.hdfc.bank.in/");
    const homepageTitle = await page.title();
    console.log("Homepage Title: ", homepageTitle);
    expect(homepageTitle).toContain(
      "Personal Banking & Netbanking Services | HDFC Bank",
    );
  });

  test("TC:001, Verify two tabs", async () => {
    const loginLink = page.getByRole("button", { name: "Login" });
    await loginLink.click();
    const creditCardPortalLink = page.getByRole("link", {
      name: "Credit Card Portal",
    });
    const [creditCardPortalPage] = await Promise.all([
      context.waitForEvent("page"),
      creditCardPortalLink.click(),
    ]);
    const creditCardPortalPageTitle = await creditCardPortalPage.title();
    console.log(creditCardPortalPageTitle);
    await expect(
      creditCardPortalPage.getByRole("link", {
        name: "CONTINUE TO CREDIT CARDS",
      }),
    ).toBeEnabled();
  });

  test("TC:002, Verify multiple tabs", async () => {
    const loginLink = page.getByRole("button", { name: "Login" });
    await loginLink.click();
    const netbankingLink = page.getByRole("link", { name: "NetBanking" });
    const [netBankingPage] = await Promise.all([
      context.waitForEvent("page"),
      netbankingLink.click(),
    ]);
    await netBankingPage.waitForLoadState("networkidle");
    console.log("NetBanking Title:", await netBankingPage.title());
    await page.bringToFront();
    const creditCardPortalLink = page.getByRole("link", {
      name: "Credit Card Portal",
    });
    const [creditCardPortalPage] = await Promise.all([
      context.waitForEvent("page"),
      creditCardPortalLink.click(),
    ]);
    await creditCardPortalPage.waitForLoadState("networkidle");
    console.log("Credit Card Title:", await creditCardPortalPage.title());
    await page.bringToFront();
    const loanPortalLink = page.getByRole("link", { name: "Loans Portal" });
    const [loanPortalPage] = await Promise.all([
      context.waitForEvent("page"),
      loanPortalLink.click(),
    ]);
    await loanPortalPage.waitForLoadState("networkidle");
    console.log("Loan Portal Title: ", await loanPortalPage.title());
    await page.bringToFront();
    const fastagLink = page.getByRole("link", { name: "Fastag", exact: true });
    const [fastagPage] = await Promise.all([
      context.waitForEvent("page"),
      fastagLink.click(),
    ]);
    await fastagPage.waitForLoadState("networkidle");
    console.log("Fastag Page Title: " + (await fastagPage.title()));
  });
});

import { test, expect } from "@playwright/test";

test("Handle multiple windows", async ({ page, context }) => {
  await page.goto("https://the-internet.herokuapp.com/windows");

  console.log("Parent Page Title:", await page.title());

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page
      .getByRole("link", {
        name: "Click Here",
      })
      .click(),
  ]);

  await newPage.waitForLoadState();

  expect(context.pages().length).toBe(2);

  await expect(newPage.locator("h3")).toHaveText("New Window");

  console.log("New Page Title:", await newPage.title());

  await newPage.close();

  expect(context.pages().length).toBe(1);

  console.log("Parent Page Title:", await page.title());
});

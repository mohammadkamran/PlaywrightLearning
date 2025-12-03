import { test, expect,Locator } from "@playwright/test";
import logindata from "../test-data/loginData.json";


test.describe("JSON file data demo",() => {
  for (const data of logindata) {
    test(`TC_001: Validate login with email = ${data.email} and password = ${data.password} from JSON file`, async ({ page }) => {
      await page.goto("https://demowebshop.tricentis.com/login");
      await page.locator("#Email").fill(data.email);
      await page.locator("#Password").fill(data.password);
      await page.locator('input[value="Log in"]').click();

      if (data.status.toLowerCase() === "valid") {
        const logoutLink: Locator = page.locator('a[href="/logout"]');
        await expect(logoutLink).toBeVisible({ timeout: 5000 });
      } else {
        const errorMessage: Locator = page.locator(
          ".validation-summary-errors"
        );
        await expect(errorMessage).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
      }
    });
  }
});

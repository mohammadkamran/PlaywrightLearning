import { test, expect, Locator } from "@playwright/test";

const loginCredentails: string[][] = [
  ["laura.taylor1234@example.com", "test123", "valid"],
  ["invalid@example.com", "test123", "invalid"],
  ["laura.taylor1234@example.com", "invalidPassword", "invalid"],
  [" ", " ", "invalid"],
];
test.describe("2D array demo", async () => {
  for (const [email, password, status] of loginCredentails) {
    test(`TC_001: Validate login credentials for ${email} and ${password}`,async({page})=>{
        await page.goto('https://demowebshop.tricentis.com/login');
        await page.locator('#Email').fill(email);
        await page.locator('#Password').fill(password);
        await page.locator('input[value="Log in"]').click();

        if(status.toLowerCase()==="valid"){
            const logoutLink: Locator = page.locator('a[href="/logout"]');
            await expect(logoutLink).toBeVisible({timeout:5000});
        }
        else{
            const errorMessage:Locator = page.locator('.validation-summary-errors');
            await expect(errorMessage).toBeVisible({timeout:5000});
            await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
        }
    });
  }
});

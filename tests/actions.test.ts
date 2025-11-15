import { test, expect, Locator } from '@playwright/test';

test.describe('validate the Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
  });
  test('TC_001: Validate the page title', async ({ page }) => {
    const pageTitleLocater:Locator = page.locator("//h1[@class='title']");
    expect(pageTitleLocater).toBeVisible();
    const pageTitle:string | null = await pageTitleLocater.textContent();
    console.log("Page Title is: " +pageTitle);
    expect(await page.title()).toBe("Automation Testing Practice");
  });

  test('Validate the input textbox action', async ({ page }) => {
    const inputName:Locator = page.locator('#name');
    expect(inputName).toBeVisible();
    expect(inputName).toBeEnabled();
    await inputName.fill('Playwright User');
    console.log("Textbox input name is : " + await inputName.inputValue());
    const textboxLength:string|null =await inputName.getAttribute('maxlength');
    expect(textboxLength).toBe('15');
    console.log("Textbox length is: " + textboxLength);
  });

});

import { test, expect, Page } from "@playwright/test";

test.describe("Dialog Box Tests", () => {
    test.beforeEach(async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
  });

  test("TC_001: Should validate simple alert dialog", async ({ page }) => {
    //Enable alert dialog handler
    page.on("dialog", (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        console.log(`Dialog type: ${dialog.type()}`);
        expect(dialog.type()).toBe("alert");
      dialog.accept();
    });
    await page.locator("#alertBtn").click(); //opens alert dialog
    await page.waitForTimeout(2000);
  });

  test("TC_002: Should validate confirmation dialog OK", async ({ page }) => {
    page.on("dialog", (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        console.log(`Dialog type: ${dialog.type()}`);
        expect(dialog.type()).toBe("confirm");
      dialog.accept();
    });
    await page.locator("#confirmBtn").click(); //opens confirmation dialog
    const text:string | null = await page.locator('#demo').textContent();
    console.log(`Text after confirming dialog: ${text}`);
    expect(text).toBe("You pressed OK!");
    await page.waitForTimeout(2000);
  });

  test("TC_003: Should validate confirmation dialog Cancel", async ({ page }) => {
    page.on("dialog", (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        console.log(`Dialog type: ${dialog.type()}`);
        expect(dialog.type()).toBe("confirm");
      dialog.dismiss();
    });
    await page.locator("#confirmBtn").click(); //opens confirmation dialog
    const text:string | null = await page.locator('#demo').textContent();
    console.log(`Text after confirming dialog: ${text}`);
    expect(text).toBe("You pressed Cancel!");
    await page.waitForTimeout(2000);
  });

  test("TC_004: Should validate prompt dialog with input", async ({ page }) => {
    const inputText:string = "Playwright Test";
    page.on("dialog", (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        console.log(`Dialog type: ${dialog.type()}`);
        expect(dialog.type()).toBe("prompt");
      dialog.accept(inputText);
    });
    await page.locator("#promptBtn").click(); //opens prompt dialog
    const text:string | null = await page.locator('#demo').textContent();
    console.log(`Text after prompt dialog input: ${text}`);
    expect(text).toBe("Hello Playwright Test! How are you today?");
    await page.waitForTimeout(2000);
  });

  test("TC_005: Should validate prompt dialog with default value", async ({ page }) => {
    page.on("dialog", (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        console.log(`Dialog type: ${dialog.type()}`);
        expect(dialog.type()).toBe("prompt");
        expect(dialog.defaultValue()).toContain("Harry Potter"); //check default value
      dialog.accept('Harry Potter');
    });
    await page.locator("#promptBtn").click(); //opens prompt dialog
    const text:string | null = await page.locator('#demo').innerText();
    console.log(`Text after prompt dialog input: ${text}`);
    expect(text).toBe("Hello Harry Potter! How are you today?");
    await page.waitForTimeout(2000);
  });

  test("TC_006: Should validate prompt dialog with CANCEL", async ({ page }) => {
    page.on("dialog", (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        console.log(`Dialog type: ${dialog.type()}`);
        expect(dialog.type()).toBe("prompt");
        expect(dialog.defaultValue()).toContain("Harry Potter"); //check default value
      dialog.dismiss();
    });
    await page.locator("#promptBtn").click(); //opens prompt dialog
    const text:string | null = await page.locator('#demo').innerText();
    console.log(`Text after prompt dialog input: ${text}`);
    expect(text).toBe("User cancelled the prompt.");
    await page.waitForTimeout(2000);
  });
});

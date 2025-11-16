import { test, expect, Locator } from "@playwright/test";
import { get } from "http";

test.describe("validate the Actions of form page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
  });
  test("TC_001: Validate the page title", async ({ page }) => {
    const pageTitleLocater: Locator = page.locator("//h1[@class='title']");
    expect(pageTitleLocater).toBeVisible();
    const pageTitle: string | null = await pageTitleLocater.textContent();
    console.log("Page Title is: " + pageTitle);
    expect(await page.title()).toBe("Automation Testing Practice");
  });

  test("TC_002: Validate the input textbox action", async ({ page }) => {
    const inputName: Locator = page.locator("#name");
    expect(inputName).toBeVisible();
    expect(inputName).toBeEnabled();
    await inputName.fill("Playwright User");
    console.log("Textbox input name is : " + (await inputName.inputValue()));
    const textboxLength: string | null = await inputName.getAttribute(
      "maxlength"
    );
    expect(textboxLength).toBe("15");
    console.log("Textbox length is: " + textboxLength);
  });

  test("TC_003: Validate the radiobutton click action", async ({ page }) => {
    const maleRadioButton: Locator = page.locator("#male");
    await expect(maleRadioButton).toBeVisible();
    await expect(maleRadioButton).toBeEnabled();
    await expect(maleRadioButton).not.toBeChecked();
    expect(await maleRadioButton.isChecked()).toBe(false);
    await maleRadioButton.check();
    await expect(maleRadioButton).toBeChecked();
    expect(await maleRadioButton.isChecked()).toBe(true);
    const femaleRadioButton: Locator = page.locator("#female");
    await expect(femaleRadioButton).toBeVisible();
    await expect(femaleRadioButton).toBeEnabled();
    await expect(femaleRadioButton).not.toBeChecked();
    expect(await femaleRadioButton.isChecked()).toBe(false);
    await femaleRadioButton.check();
    await expect(femaleRadioButton).toBeChecked();
    expect(await femaleRadioButton.isChecked()).toBe(true);
    expect(await maleRadioButton.isChecked()).toBe(false);
    await page.waitForTimeout(3000);
  });

  test("TC_004: Validate the checkbox click action", async ({ page }) => {
    // select specific checkbox i:e "sunday"
    const sundayCheckbox: Locator = page.getByLabel("Sunday");
    await expect(sundayCheckbox).toBeVisible();
    await sundayCheckbox.check();
    await expect(sundayCheckbox).toBeChecked();
    await page.waitForTimeout(3000);
  });

  test("TC_005: Validate the checkboxes", async ({ page }) => {
    // select all the checkboxes
    const days: string[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const checkboxes: Locator[] = days.map((index) => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);
    //select all checkboxes and assert.
    for (const checkbox of checkboxes) {
      await expect(checkbox).toBeVisible();
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }
    await page.waitForTimeout(3000);
    //deselect last 3 checkboxes and assert.
    for (const checkbox of checkboxes.slice(-3)) {
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    }
    await page.waitForTimeout(1000);

    //Toggle checkboxes checl. If checked: uncheck, if unchecked: check
    for (const checkbox of checkboxes) {
      if (await checkbox.isChecked()) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
      } else {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
      }
    }
    await page.waitForTimeout(1000);

    //select random checkboxes
    for (const checkbox of checkboxes) {
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    }
    await page.waitForTimeout(1000);
    const index = [1, 3, 6]; //monday, wednesday, saturday
    for (const i of index) {
      const checkbox = checkboxes[i];
      await expect(checkbox).toBeVisible();
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }
    await page.waitForTimeout(1000);
  });

  test("TC_006: Validate the selected weekdays from labeles", async ({
    page,
  }) => {
    const days: string[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const selectedDay: string = "Friday";
    for (const label of days) {
      if (selectedDay.toLowerCase() === label.toLowerCase()) {
        const checkbox: Locator = page.getByLabel(label);
        await expect(checkbox).toBeVisible();
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        console.log(`${label} is selected`);
      }
    }
    await page.waitForTimeout(2000);
  });
});

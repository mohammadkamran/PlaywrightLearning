import { expect, Locator, test } from "@playwright/test";

test.describe("Autosuggest Dropdown Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://flipkart.com/");
    const pageTitle = await page.title();
    console.log("Page title: " + pageTitle);
  });
  test("TC_001: Should display suggestions when typing in the search box", async ({
    page,
  }) => {
    console.log("TestCase TC_001 started=================");
    const searchBox: Locator = page.locator('input[name="q"]');
    await searchBox.fill("iphone");
    await page.waitForTimeout(2000); // Wait for suggestions to load
    const suggestions: Locator = page.locator("ul>li");
    const allItems: string[] = await suggestions.allTextContents();
    console.log("Suggestions: " + allItems.map((text) => text.trim()));
    const listItem1: string = await suggestions.nth(0).innerText(); //list first item
    console.log("First suggestion: " + listItem1);
    const listItem4: string = await suggestions.nth(3).innerText(); //list fourth item
    console.log("Second suggestion: " + listItem4);
    const suggestionCount: number = await suggestions.count();
    console.log("Total suggestions: " + suggestionCount);
    expect(suggestionCount).toBeGreaterThan(0);
    for (let i = 0; i < suggestionCount; i++) {
      const suggestionText: string = await suggestions.nth(i).innerText();
      if (suggestionText === "iphone 17 pro") {
        console.log(
          "Clicked suggestion: " + (await suggestions.nth(i).innerText())
        );
        await suggestions.nth(i).click();
        break;
      }
    }
    const clickedPageTitle: string = await page.title();
    console.log("Page title after clicking suggestion: " + clickedPageTitle);
    await page.waitForTimeout(3000); // Wait for navigation to complete
  });
});

test.describe("Bootstrap Dropdown Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    const userName: Locator = page.locator('input[name="username"]');
    const password: Locator = page.locator('input[name="password"]');
    const loginButton: Locator = page.locator('button[type="submit"]');
    await userName.fill("Admin");
    await password.fill("admin123");
    await loginButton.click();
    const pageTitle = await page.title();
    console.log("Page title after login: " + pageTitle);
  });
  test("TC_002: Should interact with Bootstrap dropdown menu", async ({
    page,
  }) => {
    console.log("TestCase TC_002 started=================")
    console.log("You are on the Dashboard page");
    const PIM: Locator = page.getByText("PIM");
    await PIM.click();
    const pageTitle = await page.title();
    console.log("Page title after navigating to PIM: " + pageTitle);
    const jobTitleDropdown: Locator = page.locator("form i").nth(2);
    await jobTitleDropdown.click();
    await page.waitForTimeout(5000);
    const jobTitledropdownOptions: Locator = page.locator(
      "div[role='listbox'] span"
    );
    const jobTitleList: string[] =
      await jobTitledropdownOptions.allTextContents();
    console.log(
      "Job Title Options by allTextContent: " +
        jobTitleList.map((text) => text.trim())
    );
    const optionCount: number = await jobTitledropdownOptions.count();
    console.log("Total job title options: " + optionCount);
    for (let i = 0; i < optionCount; i++) {
      const optionText: string = await jobTitledropdownOptions
        .nth(i)
        .innerText();
      console.log("Job Title Option:============ " + optionText);
    }
    await page.waitForTimeout(5000);
  });

  test("TC_003: Should select an option from the Bootstrap dropdown menu", async ({page}) => {
    console.log("TestCase TC_003 started=================");
    const PIM: Locator = page.getByText("PIM");
    await PIM.click();
    const pageTitle = await page.title();
    console.log("Page title after navigating to PIM: " + pageTitle);
    const jobTitleDropdown: Locator = page.locator("form i").nth(2);
    await jobTitleDropdown.click();
    await page.waitForTimeout(5000);
    const jobTitledropdownOptions: Locator = page.locator(
      "div[role='listbox'] span"
    );
    const jobTitleList: string[] =
      await jobTitledropdownOptions.allTextContents();
    console.log(
      "Job Title Options by allTextContent: " +
        jobTitleList.map((text) => text.trim())
    );
    const optionCount: number = await jobTitledropdownOptions.count();
    console.log("Total job title options: " + optionCount);
    for (let i = 0; i < optionCount; i++) {
        const optionText: string = await jobTitledropdownOptions
        .nth(i)
        .innerText();
        if (optionText === "Automaton Tester") {
            console.log("Clicked Job Title Option: " + await jobTitledropdownOptions.nth(i).innerText());
            await jobTitledropdownOptions.nth(i).click();
            break;
        }
    }
    await page.waitForTimeout(5000);
  });
});

import { test, expect, Locator } from '@playwright/test';

test.describe('Check for locators', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.nopcommerce.com/');
    });

    test('TC_001: Validate the getByAltText() locator', async ({ page }) => {
        //use this locator when your element has alt text such as img and area elements.
        const logoLocator: Locator = page.getByAltText('nopCommerce demo store');
        await expect(logoLocator).toBeVisible();
        await expect(logoLocator).toHaveAttribute('src', 'https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/logo.png');
        await expect(logoLocator).toBeEnabled();
    });

    test('TC_002: Validate the getByText() locator', async ({ page }) => {
        //use this locator to find non interactive elements such as div, span, p, h1-h6 etc.
        //For interactive elements use getByRole locator.
        const welcomeTextLocator: Locator = page.getByText('Welcome to our store');
        await expect(welcomeTextLocator).toBeVisible();
    });

    test('TC_003: Validate the getByRole() locator', async ({ page }) => {
        //use this locator to find interactive elements such as a, button, checkboxes, input, select, textarea etc.
        const searchBoxLocator: Locator = page.getByRole("textbox", { name: 'Search store' });
        await expect(searchBoxLocator).toBeVisible();
        const registerLinkLocator: Locator = page.getByRole("link", { name: 'Register' });
        await expect(registerLinkLocator).toBeVisible();
        await expect(registerLinkLocator).toBeEnabled();
        await registerLinkLocator.click();
        const registerTitleLocator: Locator = page.getByRole("heading", { name: 'Register' });
        await expect(registerTitleLocator).toBeVisible();
        const title: string = await page.title();
        console.log("Title: " + title);
        await expect(page).toHaveTitle("nopCommerce demo store. Register");
    });

    test('TC_004: validate the getByLabel() locator', async ({ page }) => {
        //use this locator to find input, select, textarea elements associated with a label element.
        //to locate a form control by associated label's text.
        const registerLinkLocator: Locator = page.getByRole("link", { name: 'Register' });
        await expect(registerLinkLocator).toBeVisible();
        await expect(registerLinkLocator).toBeEnabled();
        await registerLinkLocator.click();
        const firstNameLocator: Locator = page.getByLabel('First name:');
        await expect(firstNameLocator).toBeVisible();
        await firstNameLocator.fill('Playwright');
        console.log("First name is: " + await firstNameLocator.inputValue());
    });

    test('TC_005: validate the getByPlaceholder() locator', async ({ page }) => {
        //use this locator to find input, select, textarea elements by their placeholder attribute.
        const searchBoxLocator: Locator = page.getByPlaceholder('Search store');
        await expect(searchBoxLocator).toBeVisible();
        await searchBoxLocator.fill('Laptop');
        const inputValue: string | null = await searchBoxLocator.inputValue();
        console.log("Search box input value is: " + inputValue);
    });

    test('TC_006: validate the getByTestId() locator', async ({ page }) => {
        //use this locator to find elements by data-testid attribute.
        //<button data-testid="directions">Itinéraire</button>
        await page.getByTestId('directions').click();
    });

    test('TC_007: validate the getByTitle() locator', async ({ page }) => {
        //use this locator to find elements by their title attribute.
        //<span title='Issues count'>25 issues</span>
        const issuesCountLocator: Locator = page.getByTitle('Issues count');
    });
    
});


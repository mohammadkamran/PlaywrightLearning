import { Page,test,expect, Locator } from "@playwright/test";

test.describe("Pagination Table Tests", () => {
    const url = "https://testautomationpractice.blogspot.com/";
    const productName = process.env.PRODUCT_NAME ?? "";

    async function priceOfProduct(page: Page, productName: string): Promise<string> {
        const pagination: Locator = page.locator("[id='pagination'] li");
        const totalPages: number = await pagination.count();
        for (let i = 0; i < totalPages; i++) {
            const pageItem: Locator = pagination.nth(i);
            await pageItem.click();
            await page.waitForTimeout(2000); // Wait for the page to load

            // Look for the product in the table on the current page
            const rows = page.locator("[id='productTable'] tbody tr");
            const rowCount = await rows.count();
            for (let r = 0; r < rowCount; r++) {
                const nameCell = rows.nth(r).locator("td").nth(1);
                const nameText = (await nameCell.innerText())?.trim();
                if (nameText?.toLowerCase() === productName.toLowerCase()) {
                    // Assume price is in a later cell (adjust index if needed)
                    const priceCell = rows.nth(r).locator("td").nth(2);
                    const priceText = (await priceCell.innerText()).trim();
                    return priceText;
                }
            }
        }
        // Not found after checking all pages
        throw new Error(`Product "${productName}" not found in the table.`);
    }
    test('TC_001: should find the price of the product across paginated table', async ({ page }) => {
        await page.goto(url);
        const title: string = await page.title();
        console.log(`Page title is: ${title}`);
        const tableLocator: Locator = page.locator("[id=productTable]");
        await expect(tableLocator).toBeVisible();
        await tableLocator.scrollIntoViewIfNeeded();
        const price = await priceOfProduct(page, productName);
        if (price) {
            console.log(`Price of product "${productName}" is: ${price}`);
        } else {
            console.log(`Product "${productName}" not found in the table.`);
        }
    });
});

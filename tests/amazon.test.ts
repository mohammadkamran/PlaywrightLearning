import {test,expect, FrameLocator, Locator} from '@playwright/test';

test.describe('Amazon Samsung S ultra search',()=>{
    test("TC_001: Search for mobile samsung s ultra",async({page})=>{
        await page.goto('https://www.amazon.in/');
        const searchbox:Locator=page.locator('#twotabsearchtextbox');
        await expect(searchbox).toBeVisible();
        await searchbox.click();
        await searchbox.fill("samsung s24 ultra 5g mobile");
        await searchbox.press("Enter")

        await page.waitForTimeout(5000);
        // const resulttext = page.locator("div[aria-label='samsung s24 ultra 5g mobile']");
        // await expect(resulttext).toContainText('samsung s24 ultra 5g mobile');

        await page.locator("//button[@id='a-autoid-1-announce']").click();
        const cartCount:Locator =  page.locator('#nav-cart-count');
        await cartCount.scrollIntoViewIfNeeded();
        await expect(cartCount).toHaveCount(1);
        const cart:Locator = page.locator("div[id='nav-cart-text-container'] span[class='nav-line-2']");
        await cart.click();
        await expect(page.locator(".a-truncate-full")).toBeVisible();
        await expect(page.locator(".a-truncate-full")).toContainText("Samsung Galaxy S25 Ultra 5G AI Smartphone");

    });
});
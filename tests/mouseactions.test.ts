import {test,expect, Locator} from '@playwright/test';

test.describe('Mouse actions demo',()=>{
    test('TC_001: validate mouse hover action',async({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/");
        const pointMe:Locator = page.locator(".dropbtn");
        pointMe.hover();
        const laptops:Locator = page.locator(".dropdown-content a:nth-child(2)");
        await laptops.hover();
        await page.waitForTimeout(2000);
    });

    test('TC_002: validate mouse right click action',async({page})=>{
        await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");
        const button = page.locator('span.context-menu-one');
        await button.click({button:'right'});
        await page.waitForTimeout(3000);
    });

    test('TC_003: validate mouse double click action',async({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/");
        const doubleClick:Locator = page.locator("button[ondblclick='myFunction1()']");
        await doubleClick.dblclick();
        const field2:Locator = page.locator("#field2");
        await expect(field2).toBeVisible();
        await expect(field2).toHaveValue("Hello World!");
        const fieldCopyText:string|null = await field2.inputValue();
        console.log(`On double click field2 is filled with ${fieldCopyText}`);
        expect(fieldCopyText).toContain("Hello World!");
    });

    test('TC_004: Should validate the drag and drop actions',async({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/");
        const draggable:Locator = page.locator("#draggable");
        await expect(draggable).toBeVisible();
        const dropped:Locator = page.locator("#droppable");
        await expect(dropped).toBeVisible();
        await draggable.dragTo(dropped);
        await expect(dropped).toContainText('Dropped', { ignoreCase: true });
        await page.waitForTimeout(2000);

    });

});
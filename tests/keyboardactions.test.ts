import{test,expect, Locator} from '@playwright/test';

test.describe('Keyboard actions demo', ()=>{
    test('TC_001: Validate the keyboard actions', async({page})=>{
        await page.goto('https://testautomationpractice.blogspot.com/#');
        const inputField1:Locator = page.locator('#input1');
        await inputField1.fill("Welcome");
        await inputField1.focus();
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Control+c');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        const inputField2:Locator = page.locator('#input2');
        await page.keyboard.press('Control+V');
        const inputField2Text:string|null = await inputField2.inputValue();
        expect(inputField2Text).toContain('Welcome');
        await page.waitForTimeout(3000);
    });
});
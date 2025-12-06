import {test,expect, Locator} from '@playwright/test';
import {generateRandomEmail} from './helper/common.helper'

const randomEmail = generateRandomEmail('signup');


test.describe("User flow",()=>{
    test("To verify the Sign up process",async({page})=>{
        await page.goto("https://automationexercise.com/");
        const SignUp:Locator = page.locator("a[href='/login']");
        await expect(SignUp).toBeVisible();
        await SignUp.click();
        const signupName:Locator = page.locator("input[placeholder='Name']");
        await expect(signupName).toBeVisible();
        await signupName.fill("adcbTest");
        const signupEmail:Locator = page.locator("input[data-qa='signup-email']");
        await expect(signupEmail).toBeVisible();
        await signupEmail.fill(randomEmail);
        const signupButton:Locator = page.locator("button[data-qa='signup-button']");
        await expect(signupButton).toBeVisible();
        const pageTitle: string|null = await page.title();
        console.log(`Page title after signup: ${pageTitle}`);

    });
});
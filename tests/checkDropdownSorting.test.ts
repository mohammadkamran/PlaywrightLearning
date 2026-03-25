import {test,expect, chromium, Browser, BrowserContext, Page} from '@playwright/test'

let browser:Browser;
let context:BrowserContext;
let page:Page;

test.beforeAll(async()=>{
browser = await chromium.launch({headless:false});
context = await browser.newContext();
page = await context.newPage();
});

test.afterAll(async()=>{
    await browser.close();
})

test('Validate the dropdown data sorting',async({})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const countryDropdown = await page.locator('#country option').allTextContents();
    const actualCountryDropdown = countryDropdown.map(opt => opt.trim()).filter(opt => opt !== '' && opt !== 'Select Country');
    const sortedCountryDropdown = [...actualCountryDropdown].sort((a,b)=>a.localeCompare(b));
    console.log("Actual: " +actualCountryDropdown)
    console.log("sorted: " +sortedCountryDropdown);
    //expect(actualCountryDropdown).toEqual(sortedCountryDropdown);

})
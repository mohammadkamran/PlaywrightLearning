import {test,expect} from '@playwright/test';

const searchedItems:string[] = ['laptop', 'Gift card', 'smartphone', 'diamond'];

test.describe('Parametrized demo', ()=>{
    for(const items of searchedItems){
        test(`TC_001: Validate for searched item ${items} through for loop`,async({page})=>{
            await page.goto('https://demowebshop.tricentis.com/');
            await page.locator('#small-searchterms').fill(items);
            await page.locator('input[value="Search"]').click();
            await expect(page.locator('h2 a').first()).toContainText(items,{ignoreCase:true});
        });
    }

    searchedItems.forEach((items)=>{
         test(`TC_002: Validate for searched item ${items} through forEach loop`,async({page})=>{
            await page.goto('https://demowebshop.tricentis.com/');
            await page.locator('#small-searchterms').fill(items);
            await page.locator('input[value="Search"]').click();
            await expect(page.locator('h2 a').first()).toContainText(items,{ignoreCase:true});
        });
    });
});
import {test,expect} from '@playwright/test';
test("Handle multiple windows",async({page,context})=>{
    await page.goto("https://the-internet.herokuapp.com/windows");
    //console.log('Parent Page Title:', await page.title());
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
         await page.locator('a[href="/windows/new"]').click()
    ]);
    await newPage.waitForLoadState();

    const text = await newPage.locator('h3').textContent();
    console.log("New Page Title:" ,text);

    await newPage.close();
    
    console.log("Parent page title: ", await page.title());
    
   

});

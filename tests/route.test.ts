import {test,expect} from '@playwright/test';

test(`Validate the route`,async({page})=>{
    await page.route("**users/1",async(route)=>{
        await route.fulfill({
            status:200,
            contentType:"application/json",
            body: JSON.stringify({
                id:1,
                name:"Mock User"
            })
        });
    });

    await page.goto('https://jsonplaceholder.typicode.com/users/1');
    const body = await page.locator('body').textContent();
    expect(body).toContain('Mock User');
    console.log(body)
});


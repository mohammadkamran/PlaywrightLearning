import { test, expect } from '@playwright/test';

test('Validate Broken Links', async ({ page, request }) => {
    const url = 'https://testautomationpractice.blogspot.com/';
    await page.goto(url);

    // Extract all anchor tags
    const links = await page.$$eval('a', anchors =>
        anchors.map(a => a.href).filter(href => href && href.startsWith('http'))
    );

    console.log("all Links: ", links)

    console.log(`Total Links Found: ${links.length}`);

    const brokenLinks: string[] = [];

    await Promise.all(
        links.map(async (link) => {
            try {
                const response = await request.get(link, {
                    timeout: 10000
                });

                const status = response.status();

                if (status >= 400) {
                    console.log(`❌ Broken Link: ${link} | Status: ${status}`);
                    brokenLinks.push(link);
                } else {
                    console.log(`✅ Valid Link: ${link} | Status: ${status}`);
                }

            } catch (error) {
                console.log(`⚠️ Error Link: ${link}`);
                brokenLinks.push(link);
            }
        })
    );

    console.log(`\nTotal Broken Links: ${brokenLinks.length}`);
    
    // Optional assertion
    expect(brokenLinks.length).toBeGreaterThan(0);
});

import { test, expect } from "@playwright/test";

test.describe("Frame Handling Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.automationtesting.in/Frames.html");
    const pageTitle: string | null = await page.title();
    console.log(`Page Title: ${pageTitle}`);
  });
  //Approach 1: using page.frame() as it allows only frame url or name of the frame.
    test("TC_001: Should interact with single frame", async ({ page }) => {
        const frameCount = page.frames().length;
        console.log(`Total number of frames on the page: ${frameCount}`);

        if(frameCount){
            const singleFrame = page.frame({url:"https://demo.automationtesting.in/SingleFrame.html"});
            if(singleFrame){
                const inputBox = singleFrame.locator("input[type='text']");
                await inputBox.fill("Playwright Frame Test");
                const enteredValue = await inputBox.inputValue();
                console.log(`Entered value in single frame input box: ${enteredValue}`);
                expect(enteredValue).toBe("Playwright Frame Test");
            }
            
        }
    });
    //Approach 2: using frameLocator as it allows any locator of the frame
    test("TC_002: Should interact with nested frames", async ({ page }) => {
        await page.locator("a[href='#Multiple']").click(); //Navigate to Nested Frames section
        const outerFrameLocator = page.frameLocator("iframe[src='MultipleFrames.html']");
        const innerFrameLocator = outerFrameLocator.frameLocator("iframe[src='SingleFrame.html']");
        const inputBox = innerFrameLocator.locator("input[type='text']");
        await inputBox.fill("Playwright Frame Test");
        const enteredValue = await inputBox.inputValue();
        console.log(`Entered value in multiple frame input box: ${enteredValue}`);
        expect(enteredValue).toBe("Playwright Frame Test");
    });
});

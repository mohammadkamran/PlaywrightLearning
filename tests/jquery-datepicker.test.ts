import {test, expect,Page} from '@playwright/test';

test.describe('jquery Datepicker Tests', () => {

    async function selectDate(targetYear:string, targetMonth:string, targetDate:string, page:Page, isFuture:boolean) {
        while (true) {
            const currentYear = await page.locator('.ui-datepicker-year').innerText();
            const currentMonth = await page.locator('.ui-datepicker-month').innerText();
            if (currentMonth === targetMonth && currentYear === targetYear) {
                break;
            }
            if (isFuture) {
                await page.locator('.ui-datepicker-next').click();//future date
            }
            else {
                await page.locator('.ui-datepicker-prev').click();//past date
            }
        }
            const allDates = await page.locator('.ui-datepicker-calendar td').all();
            for(let dt of allDates) {
                const dateText = await dt.innerText();
                if (dateText === targetDate) {
                    await dt.click();
                    break;
                }
        }
    }

    test('TC_001: Should validate date selection from datepicker', async ({page}) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
        const dateInput = page.locator('#datepicker');
        expect(dateInput).toBeVisible();
        await dateInput.scrollIntoViewIfNeeded();
        await dateInput.click();
        const year = '1989';
        const month = 'August';
        const date = '14';
        await selectDate(year, month, date, page, false);
        const selectedDate = await dateInput.inputValue();
        console.log(`Selected date is: ${selectedDate}`);
        expect(selectedDate).toBe('08/14/1989');
        await page.waitForTimeout(3000);
    });
});
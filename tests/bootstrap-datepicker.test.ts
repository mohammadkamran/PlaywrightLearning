import { expect, test } from "@playwright/test";

test.describe("bootstrap Datepicker Tests", () => {
    test('TC_001: Should validate date selection from bootstrap datepicker', async ({ page }) => {
        await page.goto("https://www.booking.com/");
        await page.waitForLoadState('networkidle');

        const closeBtn = page.locator('[aria-label="Dismiss sign-in info."]');
        if (await closeBtn.isVisible()) {
            await closeBtn.click();
            console.log('Popup closed');
        }
        //Click on date picker to open the calendar
        const dateInput = page.getByTestId('searchbox-dates-container');
        expect(dateInput).toBeVisible();
        dateInput.click();

        //Select check-in date
        let checkInYear: string = '2026';
        let checkInMonth: string = 'March';
        let checkInDate: string = '15';

        //Navigate to the correct month and year for check-in
        while (true) {
            const checkinMonthYear = await page.locator("h3[aria-live='polite']").nth(0).innerText();
            const currentMonth = checkinMonthYear.split(" ")[0];
            const currentYear = checkinMonthYear.split(" ")[1];
            if (currentMonth === checkInMonth && currentYear === checkInYear) {
                break;
            }
            else {
                await page.locator('button[aria-label="Next month"]').click();
            }
        }
        //Select the check-in date
        let allDates = await page.locator('table.b8fcb0c66a tbody').first().locator('td').all();
        let checkInDateSelected = false;

        for (let date of allDates) {
            const dateText = await date.innerText();
            if (dateText === checkInDate) {
                await date.click();
                checkInDateSelected = true;
                break;
            }
        }
        expect(checkInDateSelected).toBeTruthy();
        console.log(`Check-in date ${checkInDate}-${checkInMonth}-${checkInYear} selected successfully.`);

        //Select check-out date
        let checkOutYear: string = '2026';
        let checkOutMonth: string = 'August';
        let checkOutDate: string = '14';

        //Navigate to the correct month and year for check-out
        while (true) {
            const checkoutMonthYear = await page.locator("h3[aria-live='polite']").nth(1).innerText();
            const currentMonth = checkoutMonthYear.split(" ")[0];
            const currentYear = checkoutMonthYear.split(" ")[1];

            if (currentMonth === checkOutMonth && currentYear === checkOutYear) {
                break;
            }
            else {
                await page.locator('button[aria-label="Next month"]').click();
            }
        }

        //Select the check-out date
        allDates = await page.locator('table.b8fcb0c66a tbody').nth(1).locator('td').all();
        let checkOutDateSelected = false;
        for (let date of allDates) {
            const dateText = await date.innerText();
            if (dateText === checkOutDate) {
                await date.click();
                checkOutDateSelected = true;
                break;
            }
        }
        expect(checkOutDateSelected).toBeTruthy();
        console.log(`Check-out date ${checkOutDate}-${checkOutMonth}-${checkOutYear} selected successfully.`);
        await page.waitForTimeout(3000);
    });
});
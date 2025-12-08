import {test,expect} from '@playwright/test';

test.describe('Get api demo',()=>{
    test('TC_001: Get booking details by ID path parameter',async({request})=>{
        const bookingId = 1;
        const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
        const responseBody = await response.json();
        console.log("Response body: ", responseBody )
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test('TC_002: Get booking details by query parameter',async({request})=>{
        const firstName = "Jim";
        const lastName = "Brown"
        const response = await request.get("https://restful-booker.herokuapp.com/booking",{params: {firstName,lastName}});
        const responseBody = await response.json();
        console.log("Response body: ", responseBody)
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        expect(responseBody.length).toBeGreaterThan(0);
        for(const item of responseBody){
            expect(item).toHaveProperty('bookingid');
            expect(typeof item.bookingid).toBe("number");
            expect(item.bookingid).toBeGreaterThan(0);
        }
    });

});
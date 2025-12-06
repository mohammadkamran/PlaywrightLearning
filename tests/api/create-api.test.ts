import { test, expect } from "@playwright/test";
import requestBody from '../api/api-json-testData/request.json';

test.describe("API create Request Demo", () => {
  test("TC_001: Validate create request", async ({ request }) => {
    const requestBody = {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    };
    const response = await request.post(
      "https://restful-booker.herokuapp.com/booking",
      { data: requestBody }
    );
    const responseBody = await response.json();
    console.log("response body: ", responseBody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody).toHaveProperty("booking.additionalneeds");
    const bookingid = responseBody.bookingid;
    const booking = responseBody.booking;
    console.log("bookingid: ", bookingid)
    console.log("booking: ", booking);
    const bookingdates = responseBody.booking.bookingdates;
    console.log("booking dates: ", bookingdates)
    const additionalneeds = responseBody.booking.additionalneeds;
    console.log("additional needs: ", additionalneeds)
  });

  test('TC_002: Validate create request through JOSN body',async({request})=>{
    const response = await request.post("https://restful-booker.herokuapp.com/booking",{data:requestBody});
     const responseBody = await response.json();
    console.log("response body: ", responseBody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
     expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody).toHaveProperty("booking.additionalneeds");
    const bookingid = responseBody.bookingid;
    const booking = responseBody.booking;
    console.log("bookingid: ", bookingid)
    console.log("booking: ", booking);
    const bookingdates = responseBody.booking.bookingdates;
    console.log("booking dates: ", bookingdates)
    const additionalneeds = responseBody.booking.additionalneeds;
    console.log("additional needs: ", additionalneeds)
  });
});

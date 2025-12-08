import { test, expect } from "@playwright/test";
import requestData from "../api/api-json-testData/request.json";

test.describe("Update API demo", () => {
  test("TC_001: validate update API", async ({ request }) => {
    //create API(POST)
    const response = await request.post(
      "https://restful-booker.herokuapp.com/booking",
      { data: requestData[1] }
    );
    const responseBody = await response.json();
    console.log("Response = ", responseBody);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const bookingid = responseBody.bookingid;
    console.log("bookingid====>: ", bookingid);

    const tokenResponse = await request.post(
      "https://restful-booker.herokuapp.com/auth",
      { data: requestData[2] }
    );
    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log("token is====>", token);

    //Update API(put)

    const updateResponse = await request.put(
      `https://restful-booker.herokuapp.com/booking/${bookingid}`,
      { data: requestData[0], headers: { Cookie: `token=${token}` } }
    );
    const updateResponseBody = await updateResponse.json();
    console.log("Updated response: ", updateResponseBody);
    expect(updateResponse.status()).toBe(200);
    expect(updateResponse.ok).toBeTruthy();
  });
});

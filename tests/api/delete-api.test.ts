import { test, expect } from "@playwright/test";
import requestData from "../api/api-json-testData/request.json";


test.describe('Delete API demo',()=>{
    test('TC_001: Validate delete api',async({request})=>{
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

    //Delete APi

    const deleteReponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingid}`,{data:{Headers:{Cookie:`token=${token}`}}});
    const deleteReponseText = await deleteReponse.text();
    console.log("Delete API response: ",deleteReponseText)
    });
});
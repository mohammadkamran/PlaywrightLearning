import { test, expect } from "@playwright/test";
import requestData from "../api/api-json-testData/request.json";
import authData from '../api/api-json-testData/auth.json';


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
      { data: authData }
    );
    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log("token is====>", token);

    //Delete APi

    const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingid}`,{headers:{Cookie:`token=${token}`}});
    const deleteReponseText = await deleteResponse.text();
    console.log("Delete API response: ",deleteReponseText)
    expect(deleteResponse.status()).toBe(201);
    expect(deleteReponseText).toBe("Created");
    });
});
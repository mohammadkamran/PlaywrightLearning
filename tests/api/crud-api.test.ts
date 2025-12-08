import { test, expect } from "@playwright/test";
import createData from "../api/api-json-testData/createBookings.json";
import updateData from "../api/api-json-testData/updateBookings.json";
import authData from "../api/api-json-testData/auth.json";

const BASE_URL = "https://restful-booker.herokuapp.com";

test.describe("Booking CRUD API Suite (Data-driven from JSON)", () => {
  // Get token once per suite
  let token: string;

  test.beforeAll(async ({ request }) => {
    const authResponse = await request.post(`${BASE_URL}/auth`, {
      headers: { "Content-Type": "application/json" },
      data: authData,
    });

    expect(authResponse.status()).toBe(200);
    const authBody = await authResponse.json();
    token = authBody.token;
    console.log("Auth token:", token);
  });

  // Data-driven: loop over all create payloads
  createData.forEach((createPayload, index) => {
    const updatePayload = updateData[index];

    test(`CRUD flow for booking index ${index} -> ${createPayload.firstname}`, async ({
      request,
    }) => {
      // ---------- 1) CREATE (POST) ----------
      const createResponse = await request.post(`${BASE_URL}/booking`, {
        headers: { "Content-Type": "application/json" },
        data: createPayload,
      });

      expect(createResponse.status()).toBe(200);
      const createBody = await createResponse.json();
      console.log(`CREATE Response [${index}] =`, createBody);

      const bookingId = createBody.bookingid;
      expect(bookingId).toBeTruthy();

      // Basic verification: created data
      expect(createBody.booking.firstname).toBe(createPayload.firstname);
      expect(createBody.booking.lastname).toBe(createPayload.lastname);

      // ---------- 2) READ (GET) ----------
      const getResponse = await request.get(`${BASE_URL}/booking/${bookingId}`);
      expect(getResponse.status()).toBe(200);
      const getBody = await getResponse.json();
      console.log(`GET Response [${index}] =`, getBody);

      expect(getBody.firstname).toBe(createPayload.firstname);
      expect(getBody.lastname).toBe(createPayload.lastname);

      // ---------- 3) UPDATE (PUT) ----------
      const updateResponse = await request.put(
        `${BASE_URL}/booking/${bookingId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Cookie: `token=${token}`, // auth for update
          },
          data: updatePayload,
        }
      );

      // Restful Booker returns 200 on successful update
      expect(updateResponse.status()).toBe(200);
      const updateBody = await updateResponse.json();
      console.log(`UPDATE Response [${index}] =`, updateBody);

      // Verify updated data
      expect(updateBody.firstname).toBe(updatePayload.firstname);
      expect(updateBody.lastname).toBe(updatePayload.lastname);
      expect(updateBody.totalprice).toBe(updatePayload.totalprice);

      // ---------- 4) READ AFTER UPDATE (GET) ----------
      const getAfterUpdate = await request.get(
        `${BASE_URL}/booking/${bookingId}`
      );
      expect(getAfterUpdate.status()).toBe(200);
      const getAfterUpdateBody = await getAfterUpdate.json();
      console.log(`GET after UPDATE [${index}] =`, getAfterUpdateBody);

      expect(getAfterUpdateBody.firstname).toBe(updatePayload.firstname);
      expect(getAfterUpdateBody.lastname).toBe(updatePayload.lastname);

      // ---------- 5) DELETE ----------
      const deleteResponse = await request.delete(
        `${BASE_URL}/booking/${bookingId}`,
        {
          headers: {
            Cookie: `token=${token}`,
          },
        }
      );

      // As per Restful Booker docs, DELETE returns 201
      expect(deleteResponse.status()).toBe(201);
      const deleteText = await deleteResponse.text();
      console.log(`DELETE Response [${index}] =`, deleteText);

      // ---------- 6) READ AFTER DELETE (GET 404) ----------
      const getAfterDelete = await request.get(
        `${BASE_URL}/booking/${bookingId}`
      );
      expect(getAfterDelete.status()).toBe(404);
      console.log(
        `GET after DELETE [${index}] status =`,
        getAfterDelete.status()
      );
    });
  });
});

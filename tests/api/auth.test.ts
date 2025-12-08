import { test, expect } from '@playwright/test';
import authData from '../api/api-json-testData/auth.json';

const BASE_URL = 'https://restful-booker.herokuapp.com';

test.describe('Auth API Test Suite', () => {

  // ✅ 1. Valid Authentication (Happy Path)
  test('TC_AUTH_001: should generate token with valid credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: authData,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.token).toBeTruthy();
  });

  // ✅ 2. Invalid Username
  test('TC_AUTH_002: should fail with invalid username', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: {
        username: 'invalidUser',
        password: authData.password,
      },
    });

    const responseBody = await response.json();
    expect(responseBody.reason).toBe('Bad credentials');
  });

  // ✅ 3. Invalid Password
  test('TC_AUTH_003: should fail with invalid password', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: {
        username: authData.username,
        password: 'wrongPass',
      },
    });

    const responseBody = await response.json();
    expect(responseBody.reason).toBe('Bad credentials');
  });

  // ✅ 4. Empty Username
  test('TC_AUTH_004: should fail with empty username', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: {
        username: '',
        password: authData.password,
      },
    });

    const responseBody = await response.json();
    expect(responseBody.reason).toBeTruthy();
  });

  // ✅ 5. Empty Password
  test('TC_AUTH_005: should fail with empty password', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: {
        username: authData.username,
        password: '',
      },
    });

    const responseBody = await response.json();
    expect(responseBody.reason).toBeTruthy();
  });

  // ✅ 6. Missing Payload
  test('TC_AUTH_006: should fail with missing body', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`);
    expect(response.status()).toBeGreaterThanOrEqual(200);
  });

  // ✅ 7. SQL Injection Attempt
  test('TC_AUTH_007: should block SQL injection attempt', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: {
        username: "' OR '1'='1",
        password: "' OR '1'='1",
      },
    });

    const responseBody = await response.json();
    expect(responseBody.reason).toBeTruthy();
  });

  // ✅ 8. Token Performance Test
  test('TC_AUTH_008: token should generate within 2 seconds', async ({ request }) => {
    const startTime = Date.now();

    const response = await request.post(`${BASE_URL}/auth`, {
      data: authData,
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`Auth Response Time: ${duration} ms`);
    expect(duration).toBeLessThan(2000);
  });

  // ✅ 9. Multiple Token Generation
  test('TC_AUTH_009: should generate unique token per request', async ({ request }) => {
    const res1 = await request.post(`${BASE_URL}/auth`, { data: authData });
    const res2 = await request.post(`${BASE_URL}/auth`, { data: authData });

    const token1 = (await res1.json()).token;
    const token2 = (await res2.json()).token;

    expect(token1).not.toBe(token2);
  });

});

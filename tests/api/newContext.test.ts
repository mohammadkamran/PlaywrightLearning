import { test, expect, request } from "@playwright/test";

test("Check newContext usage in api", async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.post(
    "https://practice.expandtesting.com/authenticate",
    {
      data: {
        username: "practice",
        password: "SuperSecretPassword!",
      },
    }
  );

  expect(response.ok()).toBeTruthy();

  const contentType = response.headers()["content-type"];

  console.log("Content-Type:", contentType);

  if (contentType?.includes("application/json")) {
    const body = await response.json();
    console.log(body);
  } else {
    const text = await response.text();
    console.log(text);
  }

  await apiContext.dispose();
});
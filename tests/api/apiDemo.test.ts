import { test, expect } from "@playwright/test";

test("demo test", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts",
  );
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.length).toBeGreaterThan(0);

  const firstPost = responseBody[0];
  expect(firstPost).toBeDefined();

  expect(firstPost).toHaveProperty("id");
  expect(firstPost).toHaveProperty("title");
  expect(firstPost).toHaveProperty("body");
});

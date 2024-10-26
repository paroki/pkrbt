import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test("reading an article", async ({ page }) => {
  const response = await page.goto(`${BASE_URL}/typhography-testing`);

  expect(response?.status()).toBe(200);

  await expect(page.getByRole("heading", { name: "Header 1" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Header 2" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Header 3" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Header 4" })).toBeVisible();
});

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

test("opengraph meta tags", async ({ page }) => {
  const response = await page.goto(`${BASE_URL}/typhography-testing`);

  expect(response?.status()).toBe(200);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Typhography Testing",
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    `${BASE_URL}/typhography-testing`,
  );
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
    "content",
    "pkrbt",
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "article",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
  );
});

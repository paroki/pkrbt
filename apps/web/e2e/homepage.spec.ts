import { test, expect } from "@playwright/test";
const BASE_URL = "http://localhost:3000";

test("homepage test", async ({ page }) => {
  const response = await page.goto(BASE_URL + "/");

  expect(response?.status()).toBe(200);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PKRBT/);
});

test("clicking more articles on homepage", async ({ page }) => {
  const response = await page.goto(BASE_URL + "/");

  expect(response?.status()).toBe(200);

  // Clicking more articles
  await page.getByRole("link", { name: "Selengkapnya" }).first().click();

  await expect(
    page.getByRole("heading", { name: "Warta Paroki" }),
  ).toBeVisible();
});

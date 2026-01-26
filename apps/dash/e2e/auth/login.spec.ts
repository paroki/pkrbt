import test, { expect } from "playwright/test";

import { iHaveUser } from "@pkrbt/test-helper";

test("login successfully", async ({ page }) => {
  const user = await iHaveUser({ email: "user@test.dev", name: "Test User" });

  // should be redirected to login page
  await page.goto("/");
  await expect(page).toHaveURL("/login");
  await expect(page).toHaveTitle("Login Aplikasi PKRBT");

  const login = page.getByRole("button", { name: "Login" });
  await expect(login).toBeVisible();
  await page.getByRole("textbox", { name: "email" }).fill(user.email);
  await page.getByRole("textbox", { name: "password" }).fill("testing");
  await login.click();

  await expect(page).toHaveURL("/");
  await expect(page).toHaveTitle("Beranda");
});

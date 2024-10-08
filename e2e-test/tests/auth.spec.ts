import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

const testEmail = `test${Math.floor(Math.random() * 9000) + 10000}@test.com`;

test("should allow the user to sign in ", async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("jack@example.com");
  await page.locator("[name=password]").fill("1234567");

  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Sign in Success")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow the user to register", async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test-firstName");
  await page.locator("[name=lastName]").fill("test-LastName");

  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("1234567");
  await page.locator("[name=confirmPassword]").fill("1234567");

  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(page.getByText("Registeration Success")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

import { test, expect } from "@playwright/test";

const NAVIGATION_TIMEOUT = 5 * 60 * 1000;

test("test", async ({ page }) => {
  await page.goto("/", { timeout: NAVIGATION_TIMEOUT });
  await expect(page.getByRole("heading")).toHaveText("Nice Resume");
});

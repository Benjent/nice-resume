import { test, expect } from "@playwright/test";

test("test", async ({ page, baseURL }) => {
  console.log(`baseURL: ${baseURL}`);

  await page.goto("/");
  await expect(page.getByRole("heading")).toHaveText("Nice Resume");
});

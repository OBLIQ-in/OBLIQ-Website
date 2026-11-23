import { expect, test } from "@playwright/test";

test("See features shows the shipped financial management section, not its issue", async ({ page }) => {
  await page.goto("/");
  const board = page.locator("#contribute");
  await expect(page.locator("#device-showcase")).toBeAttached();
  await expect(board.getByRole("link", { name: "Contribute — issue #29", exact: true })).toHaveCount(0);

  await page.getByRole("link", { name: "See features" }).click();
  await expect(page).toHaveURL("/features");
  const finance = page.getByRole("region", { name: "Track income, get paid, stress less" });
  await expect(finance.getByRole("heading", { level: 2 })).toBeVisible();
  await expect(finance.getByText("Invoicing", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Contribute — issue #31", exact: true })).toHaveCount(0);
});

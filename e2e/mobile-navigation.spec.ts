import { expect, test, type Page } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

async function expectMenuClosed(page: Page) {
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#mobile-menu")).toHaveAttribute("inert", "");
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
}

test("selecting the current page closes the mobile menu", async ({ page }) => {
  for (const [path, label] of [
    ["/features", "Features"],
    ["/about", "Benefits"],
    ["/pricing", "Pricing"],
    ["/blog", "Blog"],
  ] as const) {
    await page.goto(path);
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    await page.getByRole("dialog", { name: "Mobile navigation" }).getByRole("link", { name: label, exact: true }).click();

    await expect(page).toHaveURL(path);
    await expectMenuClosed(page);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  }
});

test("contact links close the menu when already at their redirected destination", async ({ page }) => {
  for (const label of ["Join Our Team", "Try Obliq free"]) {
    await page.goto("/contact-us");
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Mobile navigation" });
    await expect(menu.getByRole("link", { name: "Features", exact: true })).toBeFocused();
    const link = menu.getByRole("link", { name: label, exact: true });
    await link.focus();
    await expect(link).toBeFocused();
    await link.press("Enter");

    await expect(page).toHaveURL("/contact-us");
    await expectMenuClosed(page);
  }
});

test("different-page navigation and Escape still close the menu", async ({ page }) => {
  await page.goto("/blog");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("dialog", { name: "Mobile navigation" }).getByRole("link", { name: "Pricing", exact: true }).click();
  await expect(page).toHaveURL("/pricing");
  await expectMenuClosed(page);

  await page.getByRole("button", { name: "Open menu" }).click();
  await page.keyboard.press("Escape");
  await expectMenuClosed(page);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

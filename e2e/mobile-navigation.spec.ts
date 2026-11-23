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

test("resizing to desktop releases the menu with a larger browser font", async ({ page, browserName }) => {
  // CDP changes the browser's initial font size. Styling <html> would not
  // affect rem-based media queries, which use the browser preference instead.
  test.skip(browserName !== "chromium", "Changing the default font size requires Chromium CDP");
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Page.setFontSizes", { fontSizes: { standard: 20 } });
  await page.setViewportSize({ width: 1100, height: 800 });
  await page.goto("/blog");
  const open = page.getByRole("button", { name: "Open menu" });
  await open.click();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

  // Already past 1024px on both sides; the actual lg breakpoint is now 1280px.
  await page.setViewportSize({ width: 1300, height: 800 });
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(nav).toBeVisible();
  await expect(page.locator("#mobile-menu")).toHaveAttribute("inert", "");
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  const pricing = nav.getByRole("link", { name: "Pricing" });
  await pricing.focus();
  await page.keyboard.press("Tab");
  await expect(nav.getByRole("link", { name: "Blog" })).toBeFocused();

  await page.setViewportSize({ width: 1100, height: 800 });
  await expect(open).toHaveAttribute("aria-expanded", "false");
});

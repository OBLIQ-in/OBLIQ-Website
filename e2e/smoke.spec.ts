import { expect, test } from "@playwright/test";

test("homepage loads with the hero and every section", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  for (const id of ["hero", "contribute", "features", "pricing"]) {
    await expect(page.locator(`section#${id}`)).toBeAttached();
  }
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

test("desktop nav links navigate to their pages", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });

  await nav.getByRole("link", { name: "Pricing" }).click();
  await expect(page).toHaveURL("/pricing");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await nav.getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL("/blog");
  await expect(nav.getByRole("link", { name: "Blog" })).toHaveAttribute("aria-current", "page");
});

test("pricing toggle switches between annual and monthly prices", async ({ page }) => {
  await page.goto("/#pricing");
  const toggle = page.getByRole("radiogroup", { name: "Billing period" });
  const annually = toggle.getByRole("radio", { name: "Annually" });
  const monthly = toggle.getByRole("radio", { name: "Monthly" });

  await expect(annually).toHaveAttribute("aria-checked", "true");
  await expect(page.getByText("$198", { exact: true })).toBeVisible();
  await expect(page.getByText("$18", { exact: true })).toBeHidden();

  await monthly.click();
  await expect(monthly).toHaveAttribute("aria-checked", "true");
  await expect(page.getByText("$18", { exact: true })).toBeVisible();
  await expect(page.getByText("$198", { exact: true })).toBeHidden();
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("menu opens and closes", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    const menu = page.locator("#mobile-menu");

    await toggle.click();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    await expect(menu.getByRole("link", { name: "Pricing" })).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  });
});

test("join form shows validation errors", async ({ page }) => {
  await page.goto("/contact-us");
  await page.getByRole("button", { name: "Submit" }).click();

  const name = page.getByLabel("Name");
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByText("Please add a link to your resume.")).toBeVisible();

  await page.getByLabel("Email").fill("not-an-email");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Please enter a valid email address", { exact: false })).toBeVisible();
});

test("old /contact URL redirects to /contact-us", async ({ page }) => {
  await page.goto("/contact");
  await expect(page).toHaveURL("/contact-us");
});

test("blog index links to a post that renders", async ({ page }) => {
  await page.goto("/blog");
  const firstPost = page.locator('main a[href^="/blog/"]').first();
  const href = await firstPost.getAttribute("href");
  await firstPost.click();
  await expect(page).toHaveURL(href!);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

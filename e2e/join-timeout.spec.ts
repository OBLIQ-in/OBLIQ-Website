import { expect, test } from "@playwright/test";

test("keeps application input and reports that delivery is unconfirmed on 504", async ({ page }) => {
  await page.route("**/api/join", route =>
    route.fulfill({ status: 504, json: { error: "delivery-unconfirmed" } })
  );
  await page.goto("/contact-us");
  const name = page.locator("#join-name");
  const form = name.locator("xpath=ancestor::form");
  const resume = page.locator("#join-resume");
  await name.fill("Jane Smith");
  await page.locator("#join-email").fill("jane@example.invalid");
  await page.locator("#join-linkedin").fill("https://example.invalid/jane");
  await page.locator("#join-position").selectOption("Community & Support Lead");
  await resume.fill("https://example.invalid/resume.pdf");
  await form.getByRole("button", { name: "Submit" }).click();

  const alert = form.getByRole("alert");
  await expect(alert).toContainText("couldn't confirm that your application was received");
  await expect(alert).toContainText("before submitting again");
  await expect(alert.getByRole("link")).toHaveAttribute("href", /^mailto:/);
  await expect(name).toHaveValue("Jane Smith");
  await expect(resume).toHaveValue("https://example.invalid/resume.pdf");
});

import { expect, test, type Page } from "@playwright/test";

const applicant = {
  name: "Jane Smith",
  email: "jane@example.invalid",
  linkedin: "https://example.invalid/jane",
  position: "Community & Support Lead",
  resume: "https://example.invalid/resume.pdf",
};

async function fillApplication(page: Page) {
  await page.goto("/contact-us");
  await page.locator("#join-name").fill(applicant.name);
  await page.locator("#join-email").fill(applicant.email);
  await page.locator("#join-linkedin").fill(applicant.linkedin);
  await page.locator("#join-position").selectOption(applicant.position);
  await page.locator("#join-resume").fill(applicant.resume);
}

test("locks application fields and ignores repeat submits during and after success", async ({ page }) => {
  const payloads: unknown[] = [];
  let finish!: () => void;
  const response = new Promise<void>(resolve => { finish = resolve; });
  await page.route("**/api/join", async route => {
    payloads.push(route.request().postDataJSON());
    await response;
    await route.fulfill({ status: 200, json: { ok: true } });
  });
  await fillApplication(page);

  const name = page.locator("#join-name");
  const position = page.locator("#join-position");
  const form = name.locator("xpath=ancestor::form");
  try {
    await page.getByRole("button", { name: "Submit" }).click();
    const sending = form.locator('button[type="submit"]');
    await expect(sending).toHaveAttribute("aria-busy", "true");
    await expect(sending).toBeDisabled();
    await expect(name).toBeDisabled();
    await expect(position).toBeDisabled();
    await form.dispatchEvent("submit", { bubbles: true, cancelable: true });
    await expect.poll(() => payloads.length).toBe(1);
  } finally {
    finish();
  }

  await expect(form.getByRole("status")).toContainText("Thanks, Jane Smith!");
  await expect(page.getByRole("button", { name: "Application sent" })).toBeDisabled();
  await expect(name).toBeDisabled();
  await form.dispatchEvent("submit", { bubbles: true, cancelable: true });
  await expect(form.getByRole("status")).toContainText("Thanks, Jane Smith!");
  expect(payloads).toEqual([expect.objectContaining(applicant)]);
});

test("preserves input after failure and allows a corrected retry", async ({ page }) => {
  const payloads: unknown[] = [];
  await page.route("**/api/join", async route => {
    payloads.push(route.request().postDataJSON());
    const status = payloads.length === 1 ? 503 : 200;
    await route.fulfill({ status, json: { ok: status === 200 } });
  });
  await fillApplication(page);

  const name = page.locator("#join-name");
  const form = name.locator("xpath=ancestor::form");
  const submit = page.getByRole("button", { name: "Submit" });
  await submit.click();
  await expect(form.getByRole("alert")).toContainText("Please try again");
  await expect(name).toBeEditable();
  await expect(name).toHaveValue(applicant.name);
  await expect(page.locator("#join-resume")).toHaveValue(applicant.resume);
  await expect(submit).toBeEnabled();

  await name.fill("Jane Parker");
  await submit.click();
  await expect(form.getByRole("alert")).toHaveCount(0);
  await expect(form.getByRole("status")).toContainText("Thanks, Jane Parker!");
  expect(payloads).toEqual([
    expect.objectContaining(applicant),
    expect.objectContaining({ ...applicant, name: "Jane Parker" }),
  ]);
});

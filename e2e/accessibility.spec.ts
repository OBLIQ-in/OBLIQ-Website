import { expect, test } from "@playwright/test";

const pages = [
  "/",
  "/about",
  "/features",
  "/pricing",
  "/blog",
  "/blog/a-complete-guide-to-project-success",
  "/contact-us",
  "/privacy",
  "/terms",
  "/accessibility-audit-not-found",
] as const;

const tabStopSelector = [
  "a[href]",
  "button:not(:disabled)",
  "input:not(:disabled)",
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

test.describe("page accessibility structure", () => {
  for (const path of pages) {
    test(`${path} has landmarks and a logical heading outline`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole("banner")).toHaveCount(1);
      await expect(page.getByRole("navigation", { name: "Main navigation" })).toHaveCount(1);
      await expect(page.getByRole("main")).toHaveCount(1);
      await expect(page.getByRole("contentinfo")).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

      const headingLevels = await page.locator("main h1, main h2, main h3, main h4, main h5, main h6").evaluateAll(
        (headings) => headings.map((heading) => Number(heading.tagName.slice(1)))
      );
      for (let index = 1; index < headingLevels.length; index += 1) {
        const previous = headingLevels[index - 1];
        const current = headingLevels[index];
        if (previous === undefined || current === undefined) throw new Error("Missing heading level");
        expect(
          current,
          `heading level jumps from h${previous} to h${current} on ${path}`
        ).toBeLessThanOrEqual(previous + 1);
      }
    });

    test(`${path} supports keyboard-only tab traversal`, async ({ page }) => {
      await page.goto(path);

      const count = await page.locator(tabStopSelector).evaluateAll((elements) =>
        elements.filter((element) => {
          const style = getComputedStyle(element);
          return (
            element instanceof HTMLElement &&
            element.tabIndex >= 0 &&
            element.getClientRects().length > 0 &&
            style.visibility !== "hidden" &&
            !element.closest("[inert]")
          );
        }).length
      );

      expect(count).toBeGreaterThan(0);
      for (let index = 0; index < count; index += 1) {
        await page.keyboard.press("Tab");
        const activeIndex = await page.evaluate((selector) => {
          const stops = [...document.querySelectorAll<HTMLElement>(selector)].filter((element) => {
            const style = getComputedStyle(element);
            return (
              element.tabIndex >= 0 &&
              element.getClientRects().length > 0 &&
              style.visibility !== "hidden" &&
              !element.closest("[inert]")
            );
          });
          return stops.indexOf(document.activeElement as HTMLElement);
        }, tabStopSelector);

        expect(activeIndex, `unexpected focus order at Tab ${index + 1} on ${path}`).toBe(index);
        if (index === 0) {
          await expect(page.locator("body > .skip-link")).toBeFocused();
        }
      }
    });
  }
});

test("skip link moves focus to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});

test("customer wordmarks meet text contrast in light and dark themes", async ({ page }) => {
  await page.goto("/");
  const mark = page.locator("#clients span.font-display").first();

  for (const theme of ["light", "dark"] as const) {
    await page.evaluate((mode) => {
      localStorage.setItem("theme", mode);
    }, theme);
    await page.reload();
    await expect
      .poll(() => page.locator("html").evaluate((element) => element.classList.contains("dark")))
      .toBe(theme === "dark");

    const result = await mark.evaluate((element) => {
      type RGB = [number, number, number];
      const parseColor = (value: string): { rgb: RGB; alpha: number } => {
        const channels = value.match(/[\d.]+/g)?.map(Number);
        if (!channels || channels.length < 3) throw new Error(`Unsupported computed color: ${value}`);
        const [first, second, third, fourth = 1] = channels;
        if (first === undefined || second === undefined || third === undefined) {
          throw new Error(`Incomplete computed color: ${value}`);
        }
        if (value.startsWith("oklab(")) {
          const lightness = first;
          const a = second;
          const b = third;
          const lRoot = lightness + 0.3963377774 * a + 0.2158037573 * b;
          const mRoot = lightness - 0.1055613458 * a - 0.0638541728 * b;
          const sRoot = lightness - 0.0894841775 * a - 1.291485548 * b;
          const l = lRoot ** 3;
          const m = mRoot ** 3;
          const s = sRoot ** 3;
          const toSrgb = (channel: number) =>
            channel <= 0.0031308 ? channel * 12.92 : 1.055 * channel ** (1 / 2.4) - 0.055;
          return {
            rgb: [
              toSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
              toSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
              toSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
            ],
            alpha: fourth,
          };
        }
        const isSrgb = value.startsWith("color(srgb");
        return {
          rgb: isSrgb ? [first, second, third] : [first / 255, second / 255, third / 255],
          alpha: fourth,
        };
      };
      const linearize = (channel: number) =>
        channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
      const luminance = ([red, green, blue]: RGB) =>
        0.2126 * linearize(red) + 0.7152 * linearize(green) + 0.0722 * linearize(blue);

      const foregroundStyle = getComputedStyle(element);
      const backgroundStyle = getComputedStyle(element.closest("section")!);
      const foreground = parseColor(foregroundStyle.color);
      const background = parseColor(backgroundStyle.backgroundColor);
      const composited: RGB = [
        foreground.rgb[0] * foreground.alpha + background.rgb[0] * (1 - foreground.alpha),
        foreground.rgb[1] * foreground.alpha + background.rgb[1] * (1 - foreground.alpha),
        foreground.rgb[2] * foreground.alpha + background.rgb[2] * (1 - foreground.alpha),
      ];
      const [lighter, darker] = [luminance(composited), luminance(background.rgb)].sort((a, b) => b - a);
      if (lighter === undefined || darker === undefined) throw new Error("Unable to calculate contrast");
      return {
        ratio: (lighter + 0.05) / (darker + 0.05),
        foreground: foregroundStyle.color,
        background: backgroundStyle.backgroundColor,
      };
    });

    expect(
      result.ratio,
      `${theme} theme wordmark contrast ${result.foreground} on ${result.background}`
    ).toBeGreaterThanOrEqual(4.5);
  }
});

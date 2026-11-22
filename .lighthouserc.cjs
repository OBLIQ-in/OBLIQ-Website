// LHCI loads this config as CommonJS, so use require for Playwright's browser path.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { chromium } = require("@playwright/test");

module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start -- --hostname 127.0.0.1 --port 3100",
      startServerReadyPattern: "Ready in",
      startServerReadyTimeout: 30_000,
      url: [
        "http://127.0.0.1:3100/",
        "http://127.0.0.1:3100/features",
        "http://127.0.0.1:3100/pricing",
        "http://127.0.0.1:3100/blog",
        "http://127.0.0.1:3100/contact-us",
      ],
      numberOfRuns: 1,
      chromePath: chromium.executablePath(),
      settings: { preset: "desktop" },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci/reports",
    },
  },
};

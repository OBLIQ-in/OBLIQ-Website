import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: { name: "@storybook/nextjs-vite", options: {} },
  // Tailwind v4 runs through the project's postcss.config.mjs, same as Next
  staticDirs: ["../public"],
  core: { disableTelemetry: true },
};

export default config;

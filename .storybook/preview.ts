import type { Preview } from "@storybook/nextjs-vite";
// Same fonts and global styles as src/app/layout.tsx
import "@fontsource-variable/inter";
import "@fontsource/open-runde/400.css";
import "@fontsource/open-runde/500.css";
import "@fontsource/open-runde/600.css";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { matchers: { color: /(background|color)$/i } },
    backgrounds: {
      options: {
        cream: { name: "Cream", value: "#f5f2eb" },
        white: { name: "White", value: "#ffffff" },
        sky: { name: "Sky", value: "#c5d9ec" },
        ink: { name: "Ink", value: "#1a1615" },
      },
    },
  },
  initialGlobals: { backgrounds: { value: "cream" } },
  tags: ["autodocs"],
};

export default preview;

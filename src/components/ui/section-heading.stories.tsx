import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeading } from "./section-heading";

const meta = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  args: {
    eyebrow: "Integrations",
    heading: "Integrates seamlessly with the tools you already use",
    subheading: "Plug Obliq into the tools you love and make your systems work smarter together.",
  },
  argTypes: {
    align: { control: "inline-radio", options: ["center", "left"] },
    as: { control: "inline-radio", options: ["h1", "h2"] },
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Centered: Story = {};
export const LeftAligned: Story = { args: { align: "left" } };
export const HeadingOnly: Story = { args: { eyebrow: undefined, subheading: undefined } };

/** Use `as="h1"` when the heading is the page title (one `h1` per page). */
export const PageTitle: Story = { args: { as: "h1", heading: "About Obliq" } };

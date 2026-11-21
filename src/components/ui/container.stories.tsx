import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Container } from "./container";

const meta = {
  title: "UI/Container",
  component: Container,
  parameters: { layout: "fullscreen" },
  args: {
    children: (
      <div className="rounded-lg border border-dashed border-[var(--muted)] bg-white/60 p-6 text-sm text-[var(--body-text)]">
        Content is constrained to the container width.
      </div>
    ),
  },
  argTypes: {
    narrow: { control: "boolean" },
    noPadding: { control: "boolean" },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 1200px max width with responsive horizontal padding. */
export const Default: Story = {};

/** `max-w-3xl`, for reading-heavy pages like legal pages and blog posts. */
export const Narrow: Story = { args: { narrow: true } };

export const NoPadding: Story = { args: { noPadding: true } };

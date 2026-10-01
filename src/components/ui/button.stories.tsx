import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  args: { children: "Get started" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "outline", "ghost", "rust"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg", "xl", "icon"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Rust: Story = { args: { variant: "rust" } };
export const Disabled: Story = { args: { disabled: true } };

/** Pass `href` and the button renders as a Next.js `<Link>`; `http` URLs open in a new tab. */
export const AsLink: Story = { args: { href: "/pricing", children: "See pricing" } };

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Get started
        <ArrowRight className="size-4" aria-hidden="true" />
      </>
    ),
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
    "aria-label": "Next",
    children: <ArrowRight className="size-4" aria-hidden="true" />,
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(["primary", "secondary", "outline", "ghost", "rust"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          {(["sm", "md", "lg", "xl"] as const).map((size) => (
            <Button key={size} {...args} variant={variant} size={size}>
              {variant} {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { plans } from "@/lib/pricing";
import { PricingCard } from "./pricing-card";

const [basic, premium, enterprise] = plans as [(typeof plans)[number], (typeof plans)[number], (typeof plans)[number]];

const meta = {
  title: "UI/PricingCard",
  component: PricingCard,
  decorators: [
    (Story) => (
      <div className="w-[340px]">
        <Story />
      </div>
    ),
  ],
  args: basic,
} satisfies Meta<typeof PricingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

/** Featured card: sky-to-peach gradient with the inset ring. */
export const Featured: Story = { args: premium };

/**
 * Per-period prices switch when an ancestor has `data-billing="monthly"`
 * (the billing toggle sets it). Without it, the annual value shows.
 */
export const FeaturedMonthly: Story = {
  args: premium,
  decorators: [
    (Story) => (
      <div data-billing="monthly">
        <Story />
      </div>
    ),
  ],
};

export const Enterprise: Story = { args: enterprise };

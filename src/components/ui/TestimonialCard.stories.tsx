import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TestimonialCard } from "./TestimonialCard";

const meta = {
  title: "UI/TestimonialCard",
  component: TestimonialCard,
  decorators: [
    (Story) => (
      <div className="w-[340px]">
        <Story />
      </div>
    ),
  ],
  args: {
    testimonial: {
      quote:
        "We used to duct-tape tools together. Now our contracts, time tracking, and payments live in one clean system.",
      author: "Sergio Walker",
      role: "Agency Owner",
      company: "",
    },
  },
} satisfies Meta<typeof TestimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No company: the role shows on its own. */
export const Default: Story = {};

export const WithCompany: Story = {
  args: {
    testimonial: {
      quote: "This platform keeps our workflows tight and our clients impressed.",
      author: "Amos Chen",
      role: "Art Director",
      company: "Pentagram",
    },
  },
};

/** Long names and roles truncate instead of wrapping. */
export const LongAttribution: Story = {
  args: {
    testimonial: {
      quote: "From client onboarding to getting paid, this just works.",
      author: "Alexandra Montgomery-Fitzgerald",
      role: "Senior Director of Creative Operations",
      company: "A Very Long Studio Name",
    },
  },
};

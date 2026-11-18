import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Marquee } from "./Marquee";

const meta = {
  title: "UI/Marquee",
  component: Marquee,
  args: {
    children: (
      <>
        <span className="font-display text-xl font-bold text-ink/40">Theo</span>
        <span className="font-display text-xl font-semibold uppercase tracking-wider text-ink/40">Amsterdam</span>
        <span className="font-display text-xl font-medium italic text-ink/40">Savannah</span>
        <span className="font-display text-xl font-extrabold uppercase tracking-widest text-ink/40">Milano</span>
        <span className="font-display text-xl font-bold text-ink/40">Luminous</span>
      </>
    ),
    duration: 24,
    repeat: 4,
    pauseOnHover: true,
    reverse: false,
    fade: true,
  },
  argTypes: {
    pauseOnHover: { control: "boolean" },
    reverse: { control: "boolean" },
    fade: { control: "boolean" },
    duration: { control: "number" },
  },
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Reverse: Story = {
  args: {
    reverse: true,
  },
};

export const WithoutFade: Story = {
  args: {
    fade: false,
  },
};

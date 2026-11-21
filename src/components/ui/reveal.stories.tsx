import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Reveal } from "./reveal";

function Card({ label }: { label: string }) {
  return <div className="rounded-2xl bg-white/70 p-6 text-sm text-[var(--ink-soft)]">{label}</div>;
}

const meta = {
  title: "UI/Reveal",
  component: Reveal,
  parameters: { layout: "padded" },
  args: { index: 0, delay: 0, children: <Card label="Revealed on scroll" /> },
} satisfies Meta<typeof Reveal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Content already on screen stays visible; there is no flash on load. */
export const Default: Story = {};

/** Scroll the canvas: each card waits `index × 60ms` after the previous one. */
export const StaggeredOnScroll: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="h-[110vh] text-sm text-[var(--muted)]">Scroll down ↓</div>
      {["One", "Two", "Three", "Four"].map((label, i) => (
        <Reveal key={label} index={i}>
          <Card label={label} />
        </Reveal>
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChipList } from "./chip-list";

const meta = {
  title: "UI/ChipList",
  component: ChipList,
  args: { items: ["Deadlines", "Client follow-ups", "Documents", "Reminders"] },
} satisfies Meta<typeof ChipList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Chips wrap onto new lines when the row runs out of space. */
export const Wrapping: Story = {
  args: {
    items: ["GST returns", "TDS filings", "ROC compliance", "Income tax", "Audit reports", "Payroll", "Invoices"],
    className: "max-w-xs",
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlogCard } from "./BlogCard";

const meta = {
  title: "UI/BlogCard",
  component: BlogCard,
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
  args: {
    title: "What are billable hours?",
    excerpt: "A practical guide to tracking and invoicing your time.",
    category: "Management",
    href: "/blog/what-are-billable-hours",
    author: { name: "Obliq Team" },
    date: "2026-09-26",
    readingTime: 5,
  },
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MustRead: Story = {
  args: {
    category: "Must Read",
    cover: "peach",
  },
};

export const Featured: Story = {
  args: {
    featured: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[900px]">
        <Story />
      </div>
    ),
  ],
};

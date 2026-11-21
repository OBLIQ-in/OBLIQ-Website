import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MockupFrame } from "./mockup-frame";

function Placeholder() {
  return (
    <div className="flex h-full min-h-60 items-center justify-center p-6 text-sm text-[var(--muted)]">
      Screenshot goes here
    </div>
  );
}

const meta = {
  title: "UI/MockupFrame",
  component: MockupFrame,
  parameters: { layout: "padded" },
  args: { children: <Placeholder /> },
  argTypes: {
    variant: { control: "inline-radio", options: ["browser", "phone", "app"] },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MockupFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Browser: Story = { args: { variant: "browser", url: "app.obliq.in/dashboard", label: "Dashboard" } };
export const Phone: Story = { args: { variant: "phone", label: "Mobile app" } };
export const App: Story = { args: { variant: "app" } };

/** With no children the frame shows an empty `bg-mist` surface. */
export const Empty: Story = { args: { variant: "browser", children: undefined } };

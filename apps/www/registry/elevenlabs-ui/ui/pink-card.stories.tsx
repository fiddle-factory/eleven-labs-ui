import type { Meta, StoryObj } from "@storybook/react";

import { PinkCard } from "./pink-card";

const meta: Meta<typeof PinkCard> = {
  title: "UI/PinkCard",
  component: PinkCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof PinkCard>;

export const Default: Story = {
  args: {
    title: "Pink Card",
    description: "A card component with a pink background.",
  },
  render: (args) => (
    <div className="w-80">
      <PinkCard {...args} />
    </div>
  ),
};


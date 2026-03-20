import type { Meta, StoryObj } from "@storybook/nextjs"
import { UserMessage } from "./user-message"

const meta: Meta<typeof UserMessage> = {
  title: "UI/UserMessage",
  component: UserMessage,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A user message component with an initials-based avatar. The avatar colour is deterministically derived from the user's name so it stays consistent across renders.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof UserMessage>

export const Default: Story = {
  render: () => (
    <div className="w-[600px] bg-background p-4">
      <UserMessage
        name="Jane Doe"
        message="Hey! How are things going on your end?"
        timestamp="2:30 PM"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A default user message showing the initials avatar, name, timestamp and message bubble.",
      },
    },
  },
}

export const MultipleUsers: Story = {
  render: () => (
    <div className="w-[600px] space-y-1 bg-background p-4">
      <UserMessage
        name="Jane Doe"
        message="Looking forward to the meeting!"
        timestamp="9:00 AM"
      />
      <UserMessage
        name="Alex Kim"
        message="Me too — I've prepared the slides."
        timestamp="9:01 AM"
        variant="secondary"
      />
      <UserMessage
        name="Sam Rivera"
        message="Should we start in five minutes?"
        timestamp="9:02 AM"
        variant="outline"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple users each with unique avatar colours and different bubble variants.",
      },
    },
  },
}

export const LongMessage: Story = {
  render: () => (
    <div className="w-[600px] bg-background p-4">
      <UserMessage
        name="Christopher Banks"
        message="Just wanted to share a quick update — the design review went really well today. The team loved the new layout and colour palette. We're planning to move forward with the proposed changes and should have the final assets ready by end of week. Let me know if you need anything in the meantime!"
        timestamp="4:15 PM"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A longer message demonstrating how the bubble wraps text.",
      },
    },
  },
}


import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "./message";
import { Orb } from "./orb";

const meta: Meta = {
  title: "UI/Message",
  component: Message,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A message component for chat interfaces. Supports user and assistant messages with avatars and content variants.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const UserMessage: Story = {
  render: () => (
    <div className="w-[600px] bg-background p-4">
      <Message from="user">
        <MessageAvatar src="/avatars/01.png" name="John" />
        <MessageContent>Hello, how can I help you?</MessageContent>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A basic user message with avatar and text content.",
      },
    },
  },
};

export const AssistantMessage: Story = {
  render: () => (
    <div className="w-[600px] bg-background p-4">
      <Message from="assistant">
        <MessageAvatar src="/avatars/02.png" name="AI" />
        <MessageContent>I'm here to assist you with any questions!</MessageContent>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A basic assistant message with avatar and text content.",
      },
    },
  },
};

export const Conversation: Story = {
  render: () => (
    <div className="w-[600px] bg-background p-4">
      <Message from="user">
        <MessageAvatar src="/avatars/01.png" name="John" />
        <MessageContent>What's the weather like today?</MessageContent>
      </Message>
      <Message from="assistant">
        <MessageAvatar src="/avatars/02.png" name="AI" />
        <MessageContent>
          The weather today is sunny with a high of 75°F. Perfect for outdoor activities!
        </MessageContent>
      </Message>
      <Message from="user">
        <MessageAvatar src="/avatars/01.png" name="John" />
        <MessageContent>Great! Thanks for the info.</MessageContent>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A conversation thread with multiple messages.",
      },
    },
  },
};

export const FlatVariant: Story = {
  render: () => (
    <div className="w-[600px] bg-background p-4">
      <Message from="user">
        <MessageAvatar src="/avatars/01.png" name="John" />
        <MessageContent variant="flat">
          This is a user message with flat variant
        </MessageContent>
      </Message>
      <Message from="assistant">
        <MessageAvatar src="/avatars/02.png" name="AI" />
        <MessageContent variant="flat">
          This is an assistant message with flat variant - no background container
        </MessageContent>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Messages using the flat variant for a more minimal look.",
      },
    },
  },
};

export const WithOrb: Story = {
  render: () => (
    <div className="w-[600px] bg-background p-4">
      <Message from="assistant">
        <div className="size-8">
          <Orb className="h-full w-full" agentState={null} />
        </div>
        <MessageContent>
          I'm in idle mode. The orb is calm and still.
        </MessageContent>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Assistant message with an orb avatar in idle state.",
      },
    },
  },
};

export const WithOrbTalking: Story = {
  render: () => (
    <div className="w-[600px] bg-background p-4">
      <Message from="assistant">
        <div className="size-8">
          <Orb className="h-full w-full" agentState="talking" />
        </div>
        <MessageContent>
          I'm currently talking! Notice the orb is animated and active.
        </MessageContent>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Assistant message with an animated orb in talking state.",
      },
    },
  },
};

export const WithOrbListening: Story = {
  render: () => (
    <div className="w-[600px] bg-background p-4">
      <Message from="assistant">
        <div className="size-8">
          <Orb className="h-full w-full" agentState="listening" />
        </div>
        <MessageContent>
          I'm listening to your input. The orb shows I'm ready to receive.
        </MessageContent>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Assistant message with an orb in listening state.",
      },
    },
  },
};

export const ConversationWithOrb: Story = {
  render: () => (
    <div className="w-[600px] bg-background p-4">
      <Message from="user">
        <MessageAvatar src="/avatars/01.png" name="User" />
        <MessageContent>Can you explain quantum computing?</MessageContent>
      </Message>
      <Message from="assistant">
        <div className="size-8">
          <Orb className="h-full w-full" agentState="talking" />
        </div>
        <MessageContent>
          Quantum computing is a revolutionary approach to computation that leverages 
          quantum mechanical phenomena like superposition and entanglement to process 
          information in fundamentally different ways than classical computers.
        </MessageContent>
      </Message>
      <Message from="user">
        <MessageAvatar src="/avatars/01.png" name="User" />
        <MessageContent>That's fascinating! Tell me more.</MessageContent>
      </Message>
      <Message from="assistant">
        <div className="size-8">
          <Orb className="h-full w-full" agentState="thinking" />
        </div>
        <MessageContent>
          Let me think about the best way to explain this further...
        </MessageContent>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A complete conversation with orb states showing different agent activities.",
      },
    },
  },
};

export const LongMessage: Story = {
  render: () => (
    <div className="w-[600px] bg-background p-4">
      <Message from="assistant">
        <MessageAvatar src="/avatars/02.png" name="AI" />
        <MessageContent>
          This is a longer message to demonstrate how the component handles extended content.
          The message will wrap appropriately and maintain proper spacing and styling.
          You can include multiple paragraphs or longer explanations here, and the component
          will handle it gracefully with proper text wrapping and formatting.
        </MessageContent>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A message with longer content to show text wrapping behavior.",
      },
    },
  },
};


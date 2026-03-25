import type { Meta, StoryObj } from "@storybook/nextjs"
import { useState } from "react"

import {
  ChatPanel,
  ChatPanelLoadingSkeleton,
  type ChatMessage,
} from "./chat-panel"

const meta: Meta<typeof ChatPanel> = {
  title: "UI/ChatPanel",
  component: ChatPanel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A full-featured chat panel with message display, a text input, send button, empty state, and a typing indicator. Compose it with the exported sub-components for custom layouts.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-[540px] w-[480px]">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ChatPanel>

// --------------------------------------------------------------------------
// Sample data
// --------------------------------------------------------------------------

const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    from: "user",
    content: "Hey! Can you help me understand how React hooks work?",
    timestamp: new Date(),
  },
  {
    id: "2",
    from: "assistant",
    content:
      "Of course! React hooks are functions that let you use state and other React features inside functional components. The most common ones are useState, useEffect, and useCallback.",
    timestamp: new Date(),
  },
  {
    id: "3",
    from: "user",
    content: "Can you show me a quick example of useState?",
    timestamp: new Date(),
  },
  {
    id: "4",
    from: "assistant",
    content:
      "Sure! Here's a simple example:\n\nconst [count, setCount] = useState(0)\n\nYou destructure the current value and the setter from the hook. Calling setCount with a new value re-renders the component.",
    timestamp: new Date(),
  },
]

// --------------------------------------------------------------------------
// Default — interactive with live send
// --------------------------------------------------------------------------

export const Default: Story = {
  render: () => {
    const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages)
    const [isLoading, setIsLoading] = useState(false)

    const handleSend = (text: string) => {
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        from: "user",
        content: text,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMsg])
      setIsLoading(true)

      setTimeout(() => {
        const reply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          from: "assistant",
          content: `Thanks for your message! You said: "${text}"`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, reply])
        setIsLoading(false)
      }, 1500)
    }

    return (
      <ChatPanel
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSend}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fully interactive chat panel. Type a message and press Enter or click the send button — the assistant responds after a short delay.",
      },
    },
  },
}

// --------------------------------------------------------------------------
// Empty state
// --------------------------------------------------------------------------

export const Empty: Story = {
  args: {
    messages: [],
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Empty state shown when there are no messages yet. Includes a helpful prompt to start the conversation.",
      },
    },
  },
}

// --------------------------------------------------------------------------
// With messages
// --------------------------------------------------------------------------

export const WithMessages: Story = {
  args: {
    messages: sampleMessages,
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Panel pre-populated with a sample conversation thread.",
      },
    },
  },
}

// --------------------------------------------------------------------------
// Loading / typing indicator
// --------------------------------------------------------------------------

export const Loading: Story = {
  args: {
    messages: sampleMessages,
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows the animated typing indicator at the bottom of the message list while the assistant is generating a response.",
      },
    },
  },
}

// --------------------------------------------------------------------------
// Skeleton (initial page-load state)
// --------------------------------------------------------------------------

export const SkeletonState: Story = {
  render: () => (
    <div className="bg-background flex h-full w-full flex-col overflow-hidden rounded-xl border shadow-sm">
      <ChatPanelLoadingSkeleton className="flex-1" />
      <div className="border-border flex items-center gap-2 border-t px-4 py-3">
        <div className="bg-accent animate-pulse h-9 flex-1 rounded-md" />
        <div className="bg-accent animate-pulse size-9 rounded-md" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Full-panel skeleton shown while the conversation history is being fetched from the server.",
      },
    },
  },
}


"use client"

import { useCallback, useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { ChatPanel, type ChatMessage } from "./chat-panel"

const meta: Meta<typeof ChatPanel> = {
  title: "UI/ChatPanel",
  component: ChatPanel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A full-featured chat panel that composes UserMessage and Message components with a textarea input and an animated thinking indicator. Supports both controlled and uncontrolled usage.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-background h-[600px] w-[520px]">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ChatPanel>

// ─── Default (uncontrolled with simulated async reply) ───────────────────────

export const Default: Story = {
  render: () => {
    // Simulated assistant replies keyed on keywords
    const REPLIES: Record<string, string> = {
      hello: "Hey there! How can I help you today?",
      hi: "Hi! Great to meet you. What can I do for you?",
      help: "Of course! I'm here to help. What do you need assistance with?",
      thanks: "You're very welcome! Is there anything else I can help with?",
    }

    const getReply = (text: string) => {
      const lower = text.toLowerCase()
      for (const [key, reply] of Object.entries(REPLIES)) {
        if (lower.includes(key)) return reply
      }
      return `I received your message: "${text}". Let me think about that for a moment…`
    }

    const [messages, setMessages] = useState<ChatMessage[]>([
      {
        id: "seed-1",
        role: "assistant",
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: "9:00 AM",
      },
    ])
    const [isThinking, setIsThinking] = useState(false)

    const handleSend = useCallback(async (text: string) => {
      const now = new Date()
      const timestamp = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })

      setMessages((prev) => [
        ...prev,
        { id: `u-${Date.now()}`, role: "user", content: text, timestamp },
      ])
      setIsThinking(true)

      await new Promise((resolve) =>
        setTimeout(resolve, 1500 + Math.random() * 1000)
      )

      const replyTimestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: getReply(text),
          timestamp: replyTimestamp,
        },
      ])
      setIsThinking(false)
    }, [])

    return (
      <ChatPanel
        className="size-full"
        isThinking={isThinking}
        messages={messages}
        onSendMessage={handleSend}
        placeholder="Say something… (try 'hello' or 'help')"
        userName="Alex"
        assistantName="Assistant"
        thinkingText="Thinking"
        emptyState={
          <p className="text-muted-foreground text-sm">
            No messages yet. Start the conversation!
          </p>
        }
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fully interactive chat panel. Type a message and press Enter (or click Send). The assistant replies after a short simulated delay while the thinking indicator is shown.",
      },
    },
  },
}


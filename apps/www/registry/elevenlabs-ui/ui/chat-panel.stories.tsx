import type { Meta, StoryObj } from "@storybook/nextjs"
import { ChatPanel } from "./chat-panel"

const meta: Meta<typeof ChatPanel> = {
  title: "UI/ChatPanel",
  component: ChatPanel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A fully composed chat panel with a scrollable message list and a text input for sending new messages. Supports user and assistant message bubbles.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ChatPanel>

export const Default: Story = {
  render: () => (
    <div className="h-[520px] w-[600px]">
      <ChatPanel
        initialMessages={[
          {
            id: "1",
            from: "assistant",
            text: "Hey there! How can I help you today?",
          },
          {
            id: "2",
            from: "user",
            text: "I'd love to learn more about ElevenLabs.",
          },
          {
            id: "3",
            from: "assistant",
            text: "ElevenLabs is an AI audio research and deployment company. We create incredibly life‑like speech synthesis and voice cloning technology. What would you like to know?",
          },
          {
            id: "4",
            from: "user",
            text: "That sounds amazing! Can I build voice agents with it?",
          },
          {
            id: "5",
            from: "assistant",
            text: "Absolutely! With Conversational AI you can build fully autonomous voice agents that can hold natural real-time conversations — no complex orchestration needed.",
          },
        ]}
        userAvatarSrc="/avatars/01.png"
        userAvatarName="You"
        assistantAvatarSrc="/avatars/02.png"
        assistantAvatarName="AI"
        placeholder="Type a message…"
        variant="contained"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A chat panel pre-loaded with a conversation. Type in the input and press Enter or the send button to add new user messages.",
      },
    },
  },
}


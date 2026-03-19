"use client"

import * as React from "react"
import { SendHorizonal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/elevenlabs-ui/ui/button"
import { Input } from "@/registry/elevenlabs-ui/ui/input"
import {
  Message,
  MessageAvatar,
  MessageContent,
  type MessageProps,
} from "@/registry/elevenlabs-ui/ui/message"
import { ScrollArea } from "@/registry/elevenlabs-ui/ui/scroll-area"

// ─── Types ────────────────────────────────────────────────────────────────────

export type ChatMessage = {
  id: string
  from: "user" | "assistant"
  text: string
  avatar?: string
  name?: string
}

export type ChatWindowProps = {
  /** Initial set of messages to display */
  messages?: ChatMessage[]
  /** Placeholder text for the input field */
  placeholder?: string
  /** Callback fired when the user sends a message */
  onSend?: (text: string) => void
  /** Optional class for the outer container */
  className?: string
  /** Title shown in the header */
  title?: string
  /** Subtitle / status shown in the header */
  subtitle?: string
  /** Avatar src for the assistant */
  assistantAvatar?: string
  /** Avatar src for the user */
  userAvatar?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ChatWindow({
  messages: initialMessages = [],
  placeholder = "Type a message…",
  onSend,
  className,
  title = "Assistant",
  subtitle = "Online",
  assistantAvatar = "",
  userAvatar = "",
}: ChatWindowProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = React.useState("")
  const bottomRef = React.useRef<HTMLDivElement>(null)

  // Scroll to bottom whenever messages change
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      from: "user",
      text: trimmed,
    }

    setMessages((prev) => [...prev, newMessage])
    onSend?.(trimmed)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={cn(
        "flex h-[600px] w-[420px] flex-col rounded-xl border border-border bg-background shadow-lg",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <MessageAvatar
          src={assistantAvatar}
          name={title}
          className="size-9 shrink-0"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-tight">{title}</span>
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        </div>
      </div>

      {/* Message list */}
      <ScrollArea className="flex-1 px-4">
        <div className="flex flex-col py-2">
          {messages.map((msg) => (
            <Message key={msg.id} from={msg.from}>
              {msg.from === "assistant" && (
                <MessageAvatar
                  src={msg.avatar ?? assistantAvatar}
                  name={msg.name ?? title}
                />
              )}
              <MessageContent variant="contained">{msg.text}</MessageContent>
              {msg.from === "user" && (
                <MessageAvatar
                  src={msg.avatar ?? userAvatar}
                  name={msg.name ?? "Me"}
                />
              )}
            </Message>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input bar */}
      <div className="flex items-center gap-2 border-t border-border px-4 py-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          size="icon"
          variant="default"
          onClick={handleSend}
          disabled={!input.trim()}
          aria-label="Send message"
        >
          <SendHorizonal className="size-4" />
        </Button>
      </div>
    </div>
  )
}


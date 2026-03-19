"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { SendHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/elevenlabs-ui/ui/button"
import { Input } from "@/registry/elevenlabs-ui/ui/input"
import {
  Message,
  MessageAvatar,
  MessageContent,
  type MessageContentProps,
} from "@/registry/elevenlabs-ui/ui/message"
import { ScrollArea } from "@/registry/elevenlabs-ui/ui/scroll-area"

export type ChatMessage = {
  id: string
  from: "user" | "assistant"
  text: string
}

export type ChatPanelProps = {
  className?: string
  initialMessages?: ChatMessage[]
  userAvatarSrc?: string
  userAvatarName?: string
  assistantAvatarSrc?: string
  assistantAvatarName?: string
  placeholder?: string
  variant?: MessageContentProps["variant"]
  onSend?: (message: string) => void
}

export const ChatPanel = ({
  className,
  initialMessages = [],
  userAvatarSrc = "/avatars/01.png",
  userAvatarName = "You",
  assistantAvatarSrc = "/avatars/02.png",
  assistantAvatarName = "AI",
  placeholder = "Type a message…",
  variant = "contained",
  onSend,
}: ChatPanelProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState("")
  const viewportRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      if (viewportRef.current) {
        viewportRef.current.scrollTop = viewportRef.current.scrollHeight
      }
    }, 0)
  }

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      from: "user",
      text: trimmed,
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    onSend?.(trimmed)
    scrollToBottom()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={cn(
        "border-border bg-background flex h-full flex-col overflow-hidden rounded-xl border shadow-sm",
        className
      )}
    >
      {/* Message list */}
      <ScrollArea className="flex-1 px-4">
        <div ref={viewportRef as React.RefObject<HTMLDivElement>}>
          {messages.length === 0 ? (
            <div className="text-muted-foreground flex h-32 items-center justify-center text-sm">
              No messages yet. Say hello!
            </div>
          ) : (
            messages.map((msg) => (
              <Message key={msg.id} from={msg.from}>
                <MessageAvatar
                  src={
                    msg.from === "user" ? userAvatarSrc : assistantAvatarSrc
                  }
                  name={
                    msg.from === "user" ? userAvatarName : assistantAvatarName
                  }
                />
                <MessageContent variant={variant}>{msg.text}</MessageContent>
              </Message>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Chat input */}
      <div className="border-border border-t px-4 py-3">
        <div className="flex items-center gap-2">
          <Input
            className="flex-1"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <SendHorizontal />
          </Button>
        </div>
      </div>
    </div>
  )
}


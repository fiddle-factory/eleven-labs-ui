"use client"

import * as React from "react"
import { ArrowUpIcon, MessageCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/elevenlabs-ui/ui/button"
import { Card } from "@/registry/elevenlabs-ui/ui/card"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/elevenlabs-ui/ui/message"
import { Separator } from "@/registry/elevenlabs-ui/ui/separator"
import { Textarea } from "@/registry/elevenlabs-ui/ui/textarea"

export type ChatMessage = {
  id: string
  from: "user" | "assistant"
  content: string
  avatarSrc?: string
  avatarName?: string
}

export type ChatWindowProps = React.HTMLAttributes<HTMLDivElement> & {
  /** List of messages to display */
  messages?: ChatMessage[]
  /** Called with the text when the user sends a message */
  onSendMessage?: (message: string) => void
  /** Placeholder text for the input */
  inputPlaceholder?: string
  /** Title shown in the header */
  title?: string
  /** Subtitle / status shown below the title */
  subtitle?: string
  /** Whether the assistant is typing */
  isTyping?: boolean
  /** Default avatar src used as a fallback for user messages */
  userAvatarSrc?: string
  /** Default avatar src used as a fallback for assistant messages */
  assistantAvatarSrc?: string
}

export const ChatWindow = ({
  className,
  messages = [],
  onSendMessage,
  inputPlaceholder = "Type a message…",
  title = "Chat",
  subtitle,
  isTyping = false,
  userAvatarSrc = "",
  assistantAvatarSrc = "",
  ...props
}: ChatWindowProps) => {
  const [input, setInput] = React.useState("")
  const bottomRef = React.useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = React.useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed) return
    onSendMessage?.(trimmed)
    setInput("")
  }, [input, onSendMessage])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  return (
    <Card
      className={cn(
        "flex h-full w-full flex-col gap-0 overflow-hidden border shadow-lg",
        className
      )}
      {...props}
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
          <MessageCircleIcon className="text-primary size-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-none">{title}</span>
          {subtitle && (
            <span className="text-muted-foreground mt-0.5 text-xs">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* ── Message list ── */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
            <MessageCircleIcon className="size-8 opacity-30" />
            <p className="text-sm">No messages yet. Say hello!</p>
          </div>
        ) : (
          <div className="px-4 pb-2">
            {messages.map((msg) => (
              <Message key={msg.id} from={msg.from}>
                <MessageAvatar
                  src={
                    msg.avatarSrc ??
                    (msg.from === "user" ? userAvatarSrc : assistantAvatarSrc)
                  }
                  name={msg.avatarName}
                />
                <MessageContent>{msg.content}</MessageContent>
              </Message>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <Message from="assistant">
                <MessageAvatar src={assistantAvatarSrc} name="AI" />
                <MessageContent>
                  <span className="flex items-center gap-1">
                    <span className="bg-muted-foreground/60 size-1.5 animate-bounce rounded-full [animation-delay:-0.3s]" />
                    <span className="bg-muted-foreground/60 size-1.5 animate-bounce rounded-full [animation-delay:-0.15s]" />
                    <span className="bg-muted-foreground/60 size-1.5 animate-bounce rounded-full" />
                  </span>
                </MessageContent>
              </Message>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <Separator />

      {/* ── Input area ── */}
      <div className="relative px-3 py-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={inputPlaceholder}
          rows={1}
          className="min-h-[40px] resize-none border-0 pr-10 shadow-none focus-visible:ring-0"
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={handleSend}
          disabled={!input.trim()}
          className="absolute right-4 bottom-3 size-8"
          aria-label="Send message"
        >
          <ArrowUpIcon className="size-4" />
        </Button>
      </div>
    </Card>
  )
}

ChatWindow.displayName = "ChatWindow"


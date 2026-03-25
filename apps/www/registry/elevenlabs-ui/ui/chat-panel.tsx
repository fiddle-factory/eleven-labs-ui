"use client"

import type { ComponentProps, FormEvent, HTMLAttributes, KeyboardEvent } from "react"
import { useRef, useState } from "react"
import { SendHorizonal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/elevenlabs-ui/ui/button"
import { Input } from "@/registry/elevenlabs-ui/ui/input"
import { Message, MessageAvatar, MessageContent } from "@/registry/elevenlabs-ui/ui/message"
import { Skeleton } from "@/registry/elevenlabs-ui/ui/skeleton"

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------

export type ChatMessage = {
  id: string
  from: "user" | "assistant"
  content: string
  timestamp?: Date
}

// --------------------------------------------------------------------------
// ChatPanel root
// --------------------------------------------------------------------------

export type ChatPanelProps = HTMLAttributes<HTMLDivElement> & {
  /** All messages to display in the panel */
  messages?: ChatMessage[]
  /** Whether the assistant is currently generating a response */
  isLoading?: boolean
  /** Called when the user submits a new message */
  onSendMessage?: (message: string) => void
  /** Placeholder shown in the empty state */
  emptyStateTitle?: string
  emptyStateDescription?: string
  /** Avatar src for the user */
  userAvatarSrc?: string
  /** Avatar src for the assistant */
  assistantAvatarSrc?: string
  /** Placeholder text for the input */
  inputPlaceholder?: string
}

export const ChatPanel = ({
  className,
  messages = [],
  isLoading = false,
  onSendMessage,
  emptyStateTitle = "No messages yet",
  emptyStateDescription = "Send a message to start the conversation",
  userAvatarSrc = "/avatars/01.png",
  assistantAvatarSrc = "/avatars/02.png",
  inputPlaceholder = "Type a message…",
  ...props
}: ChatPanelProps) => {
  const [inputValue, setInputValue] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    if (!trimmed || isLoading) return
    onSendMessage?.(trimmed)
    setInputValue("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as FormEvent)
    }
  }

  return (
    <div
      className={cn(
        "bg-background flex h-full w-full flex-col overflow-hidden rounded-xl border shadow-sm",
        className
      )}
      {...props}
    >
      {/* Message list */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col overflow-y-auto"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.length === 0 && !isLoading ? (
          <ChatPanelEmptyState
            title={emptyStateTitle}
            description={emptyStateDescription}
          />
        ) : (
          <div className="flex flex-col gap-0 p-4">
            {messages.map((msg) => (
              <Message key={msg.id} from={msg.from}>
                <MessageAvatar
                  src={msg.from === "user" ? userAvatarSrc : assistantAvatarSrc}
                  name={msg.from === "user" ? "You" : "AI"}
                />
                <MessageContent>{msg.content}</MessageContent>
              </Message>
            ))}

            {isLoading && <ChatPanelTypingIndicator assistantAvatarSrc={assistantAvatarSrc} />}
          </div>
        )}
      </div>

      {/* Input bar */}
      <ChatPanelInputBar
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        placeholder={inputPlaceholder}
      />
    </div>
  )
}

// --------------------------------------------------------------------------
// ChatPanelEmptyState
// --------------------------------------------------------------------------

export type ChatPanelEmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
}

export const ChatPanelEmptyState = ({
  className,
  title = "No messages yet",
  description = "Send a message to start the conversation",
  ...props
}: ChatPanelEmptyStateProps) => (
  <div
    className={cn(
      "flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center",
      className
    )}
    {...props}
  >
    <div className="bg-muted flex size-12 items-center justify-center rounded-full">
      <SendHorizonal className="text-muted-foreground size-5" />
    </div>
    <div className="space-y-1">
      <h3 className="text-sm font-medium">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
    </div>
  </div>
)

// --------------------------------------------------------------------------
// ChatPanelTypingIndicator
// --------------------------------------------------------------------------

export type ChatPanelTypingIndicatorProps = {
  assistantAvatarSrc?: string
}

export const ChatPanelTypingIndicator = ({
  assistantAvatarSrc = "/avatars/02.png",
}: ChatPanelTypingIndicatorProps) => (
  <Message from="assistant">
    <MessageAvatar src={assistantAvatarSrc} name="AI" />
    <div className="bg-secondary flex items-center gap-1.5 rounded-lg px-4 py-3">
      <span className="bg-muted-foreground size-1.5 animate-bounce rounded-full [animation-delay:-0.3s]" />
      <span className="bg-muted-foreground size-1.5 animate-bounce rounded-full [animation-delay:-0.15s]" />
      <span className="bg-muted-foreground size-1.5 animate-bounce rounded-full" />
    </div>
  </Message>
)

// --------------------------------------------------------------------------
// ChatPanelLoadingSkeleton  (skeleton state for the whole panel)
// --------------------------------------------------------------------------

export type ChatPanelLoadingSkeletonProps = HTMLAttributes<HTMLDivElement>

export const ChatPanelLoadingSkeleton = ({
  className,
  ...props
}: ChatPanelLoadingSkeletonProps) => (
  <div className={cn("flex flex-col gap-4 p-4", className)} {...props}>
    {/* Assistant skeleton */}
    <div className="flex items-end gap-2">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <Skeleton className="h-12 w-56 rounded-lg" />
    </div>
    {/* User skeleton */}
    <div className="flex flex-row-reverse items-end gap-2">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <Skeleton className="h-9 w-40 rounded-lg" />
    </div>
    {/* Assistant skeleton */}
    <div className="flex items-end gap-2">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <Skeleton className="h-16 w-64 rounded-lg" />
    </div>
    {/* User skeleton */}
    <div className="flex flex-row-reverse items-end gap-2">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <Skeleton className="h-9 w-32 rounded-lg" />
    </div>
  </div>
)

// --------------------------------------------------------------------------
// ChatPanelInputBar
// --------------------------------------------------------------------------

export type ChatPanelInputBarProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}

export const ChatPanelInputBar = ({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  disabled = false,
  placeholder = "Type a message…",
  className,
}: ChatPanelInputBarProps) => (
  <form
    onSubmit={onSubmit}
    className={cn(
      "border-border bg-background flex items-center gap-2 border-t px-4 py-3",
      className
    )}
  >
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      aria-label="Message input"
      className="flex-1"
      autoComplete="off"
    />
    <Button
      type="submit"
      size="icon"
      disabled={disabled || !value.trim()}
      aria-label="Send message"
    >
      <SendHorizonal className="size-4" />
    </Button>
  </form>
)


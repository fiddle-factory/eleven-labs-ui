"use client"

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/elevenlabs-ui/ui/button"
import { Message, MessageContent } from "@/registry/elevenlabs-ui/ui/message"
import { Textarea } from "@/registry/elevenlabs-ui/ui/textarea"
import { UserMessage } from "@/registry/elevenlabs-ui/ui/user-message"

// ─── Types ───────────────────────────────────────────────────────────────────

export type ChatRole = "user" | "assistant"

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  timestamp?: string
}

export type ChatPanelProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The display name of the current user — used for the avatar initials and
   * message attribution.
   */
  userName?: string
  /**
   * Name shown for the assistant messages.
   */
  assistantName?: string
  /**
   * Controlled list of messages to display. When omitted the panel manages its
   * own internal state so you can use it uncontrolled.
   */
  messages?: ChatMessage[]
  /**
   * Called when the user submits a new message. Receives the message text.
   * If you return a Promise the panel will show the thinking indicator until
   * it resolves; if you reject, the thinking indicator is cleared too.
   */
  onSendMessage?: (message: string) => void | Promise<void>
  /**
   * Placeholder text shown in the textarea when it is empty.
   */
  placeholder?: string
  /**
   * When `true` the thinking indicator is displayed regardless of internal
   * state. Useful when you control `messages` yourself and handle the async
   * lifecycle externally.
   */
  isThinking?: boolean
  /**
   * Text shown next to the animated dots while the assistant is thinking.
   * Defaults to "Thinking".
   */
  thinkingText?: string
  /**
   * Pass an empty-state element to display when there are no messages yet.
   */
  emptyState?: React.ReactNode
}

// ─── ThinkingIndicator ───────────────────────────────────────────────────────

function ThinkingDot({ delay }: { delay: string }) {
  return (
    <span
      className="bg-muted-foreground inline-block size-1.5 animate-bounce rounded-full"
      style={{ animationDelay: delay, animationDuration: "1s" }}
    />
  )
}

function ThinkingIndicator({ text = "Thinking" }: { text?: string }) {
  return (
    <div className="flex items-end gap-2 py-2">
      {/* Left-aligned, matching assistant message direction */}
      <div className="bg-muted text-muted-foreground flex items-center gap-2 rounded-lg px-4 py-3 text-sm">
        <span>{text}</span>
        <span className="flex items-center gap-1">
          <ThinkingDot delay="0ms" />
          <ThinkingDot delay="160ms" />
          <ThinkingDot delay="320ms" />
        </span>
      </div>
    </div>
  )
}

// ─── ChatInput ───────────────────────────────────────────────────────────────

interface ChatInputProps {
  onSubmit: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

function ChatInput({ onSubmit, placeholder, disabled }: ChatInputProps) {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSubmit(trimmed)
    setValue("")
    // Reset height after clearing
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }, [value, disabled, onSubmit])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  return (
    <div className="border-border bg-background flex items-end gap-2 border-t px-4 py-3">
      <Textarea
        ref={textareaRef}
        className="min-h-[40px] flex-1 resize-none"
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "Type a message… (Enter to send)"}
        rows={1}
        value={value}
      />
      <Button
        className="shrink-0 self-end"
        disabled={disabled || !value.trim()}
        onClick={handleSubmit}
        size="sm"
        type="button"
      >
        Send
      </Button>
    </div>
  )
}

// ─── ChatPanel ───────────────────────────────────────────────────────────────

let _uid = 0
function uid() {
  return `chat-msg-${++_uid}-${Date.now()}`
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function ChatPanel({
  userName = "You",
  assistantName = "Assistant",
  messages: controlledMessages,
  onSendMessage,
  placeholder,
  isThinking: externalIsThinking,
  thinkingText = "Thinking",
  emptyState,
  className,
  ...props
}: ChatPanelProps) {
  const isControlled = controlledMessages !== undefined
  const [internalMessages, setInternalMessages] = useState<ChatMessage[]>([])
  const [internalIsThinking, setInternalIsThinking] = useState(false)

  const messages = isControlled ? controlledMessages : internalMessages
  const isThinking =
    externalIsThinking !== undefined ? externalIsThinking : internalIsThinking

  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom whenever messages or thinking state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isThinking])

  const handleSend = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content: text,
        timestamp: formatTime(new Date()),
      }

      if (!isControlled) {
        setInternalMessages((prev) => [...prev, userMsg])
        setInternalIsThinking(true)
      }

      try {
        await onSendMessage?.(text)
      } finally {
        if (!isControlled) {
          setInternalIsThinking(false)
        }
      }
    },
    [isControlled, onSendMessage]
  )

  const isEmpty = messages.length === 0 && !isThinking

  return (
    <div
      className={cn(
        "border-border bg-background flex h-full flex-col overflow-hidden rounded-xl border shadow-sm",
        className
      )}
      {...props}
    >
      {/* Messages area */}
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
        {isEmpty && emptyState ? (
          <div className="flex flex-1 items-center justify-center">
            {emptyState}
          </div>
        ) : (
          <>
            {messages.map((msg) =>
              msg.role === "user" ? (
                <UserMessage
                  key={msg.id}
                  message={msg.content}
                  name={userName}
                  timestamp={msg.timestamp}
                />
              ) : (
                <Message key={msg.id} from="assistant" className="py-2">
                  <MessageContent variant="flat">
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    {msg.timestamp && (
                      <span className="text-muted-foreground mt-1 block text-xs">
                        {msg.timestamp}
                      </span>
                    )}
                  </MessageContent>
                </Message>
              )
            )}

            {isThinking && <ThinkingIndicator text={thinkingText} />}
          </>
        )}

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <ChatInput
        disabled={isThinking}
        onSubmit={handleSend}
        placeholder={placeholder}
      />
    </div>
  )
}


"use client"

import {
  type ComponentProps,
  type FormEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from "react"
import { SendIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/elevenlabs-ui/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/elevenlabs-ui/ui/card"
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/registry/elevenlabs-ui/ui/conversation"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/elevenlabs-ui/ui/message"
import { Textarea } from "@/registry/elevenlabs-ui/ui/textarea"

export type ChatMessage = {
  id: string
  from: "user" | "assistant"
  content: string
  avatarSrc?: string
  avatarName?: string
}

export type ChatWindowProps = ComponentProps<typeof Card> & {
  /** Window title shown in the header */
  title?: string
  /** Initial messages to seed the conversation */
  initialMessages?: ChatMessage[]
  /** Placeholder text for the chat input */
  placeholder?: string
  /** Called when the user submits a message */
  onSend?: (message: string) => void
}

export function ChatWindow({
  className,
  title = "Chat",
  initialMessages = [],
  placeholder = "Type a message…",
  onSend,
  ...props
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      from: "user",
      content: trimmed,
      avatarSrc: "/avatars/01.png",
      avatarName: "Me",
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    onSend?.(trimmed)
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Card
      className={cn(
        "flex h-[600px] w-full max-w-[680px] flex-col gap-0 overflow-hidden border py-0",
        className
      )}
      {...props}
    >
      {/* ── Header ── */}
      <CardHeader className="border-b px-4 py-3 [.border-b]:pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      {/* ── Message list ── */}
      <CardContent className="relative flex min-h-0 flex-1 flex-col p-0">
        <Conversation className="flex-1">
          <ConversationContent>
            {messages.length === 0 ? (
              <ConversationEmptyState
                title="No messages yet"
                description="Send a message to start the conversation."
              />
            ) : (
              messages.map((msg) => (
                <Message key={msg.id} from={msg.from}>
                  <MessageAvatar
                    src={msg.avatarSrc ?? "/avatars/01.png"}
                    name={msg.avatarName}
                  />
                  <MessageContent>{msg.content}</MessageContent>
                </Message>
              ))
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </CardContent>

      {/* ── Input bar ── */}
      <CardFooter className="border-t p-0 [.border-t]:pt-0">
        <form
          className="flex w-full items-end gap-2 px-4 py-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            ref={textareaRef}
            className={cn(
              "max-h-36 min-h-[40px] flex-1 resize-none rounded-lg py-2 text-sm",
              "field-sizing-content"
            )}
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            aria-label="Send message"
            className="mb-px shrink-0"
          >
            <SendIcon className="size-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}


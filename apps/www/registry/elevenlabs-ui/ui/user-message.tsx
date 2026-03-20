import type { HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ─── Utility ────────────────────────────────────────────────────────────────

/** Extracts up to two initials from a full name, e.g. "Jane Doe" → "JD" */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Deterministically maps a name to one of several pleasant accent colours so
 * every user always gets the same colour.
 */
const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-cyan-500",
  "bg-fuchsia-500",
  "bg-teal-500",
] as const

function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

// ─── UserMessageAvatar ───────────────────────────────────────────────────────

export type UserMessageAvatarProps = HTMLAttributes<HTMLDivElement> & {
  /** Full name used to derive initials and avatar colour. */
  name: string
}

export const UserMessageAvatar = ({
  name,
  className,
  ...props
}: UserMessageAvatarProps) => (
  <div
    aria-label={name}
    className={cn(
      "ring-border flex size-8 shrink-0 select-none items-center justify-center rounded-full ring-1",
      "text-xs font-semibold tracking-wide text-white",
      getAvatarColor(name),
      className
    )}
    {...props}
  >
    {getInitials(name)}
  </div>
)

// ─── UserMessageTimestamp ────────────────────────────────────────────────────

export type UserMessageTimestampProps = HTMLAttributes<HTMLSpanElement>

export const UserMessageTimestamp = ({
  className,
  ...props
}: UserMessageTimestampProps) => (
  <span
    className={cn("text-muted-foreground mt-1 block text-xs", className)}
    {...props}
  />
)

// ─── UserMessageContent ──────────────────────────────────────────────────────

const userMessageContentVariants = cva(
  "flex flex-col gap-1 overflow-hidden rounded-lg px-4 py-3 text-sm leading-relaxed",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-foreground",
        outline:
          "border-border bg-background text-foreground border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type UserMessageContentProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof userMessageContentVariants>

export const UserMessageContent = ({
  children,
  className,
  variant,
  ...props
}: UserMessageContentProps) => (
  <div
    className={cn(userMessageContentVariants({ variant, className }))}
    {...props}
  >
    {children}
  </div>
)

// ─── UserMessageHeader ───────────────────────────────────────────────────────

export type UserMessageHeaderProps = HTMLAttributes<HTMLDivElement>

export const UserMessageHeader = ({
  className,
  ...props
}: UserMessageHeaderProps) => (
  <div
    className={cn("flex items-baseline gap-2", className)}
    {...props}
  />
)

export type UserMessageNameProps = HTMLAttributes<HTMLSpanElement>

export const UserMessageName = ({
  className,
  ...props
}: UserMessageNameProps) => (
  <span
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
)

// ─── UserMessage (root) ──────────────────────────────────────────────────────

export type UserMessageProps = HTMLAttributes<HTMLDivElement> & {
  /** Full name of the user — used for avatar initials and display. */
  name: string
  /** The message text or any React content. */
  message: string
  /** Optional formatted time string, e.g. "2:30 PM". */
  timestamp?: string
  /** Visual style of the message bubble. */
  variant?: VariantProps<typeof userMessageContentVariants>["variant"]
}

export const UserMessage = ({
  name,
  message,
  timestamp,
  variant,
  className,
  ...props
}: UserMessageProps) => (
  <div
    className={cn("flex w-full items-end justify-end gap-2 py-2", className)}
    {...props}
  >
    <div className="flex max-w-[80%] flex-col items-end gap-1">
      <UserMessageContent variant={variant}>
        <UserMessageHeader>
          <UserMessageName>{name}</UserMessageName>
          {timestamp && (
            <UserMessageTimestamp>{timestamp}</UserMessageTimestamp>
          )}
        </UserMessageHeader>
        <p>{message}</p>
      </UserMessageContent>
    </div>
    <UserMessageAvatar name={name} />
  </div>
)


import type { ComponentProps, HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/elevenlabs-ui/ui/avatar"

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: "user" | "assistant"
}

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full items-end gap-2 py-1",
      from === "user" ? "is-user justify-end" : "is-assistant justify-start",
      className
    )}
    {...props}
  />
)

const messageContentVariants = cva(
  "flex flex-col gap-2 overflow-hidden text-sm leading-relaxed",
  {
    variants: {
      variant: {
        contained: [
          "max-w-[75%] px-4 py-2.5",
          "group-[.is-user]:rounded-[18px] group-[.is-user]:rounded-br-[4px]",
          "group-[.is-user]:bg-[#0B93F6] group-[.is-user]:text-white",
          "group-[.is-assistant]:rounded-[18px] group-[.is-assistant]:rounded-bl-[4px]",
          "group-[.is-assistant]:bg-[#E5E5EA] group-[.is-assistant]:text-[#1C1C1E]",
        ],
        flat: [
          "group-[.is-user]:max-w-[75%] group-[.is-user]:rounded-[18px] group-[.is-user]:rounded-br-[4px]",
          "group-[.is-user]:bg-[#0B93F6] group-[.is-user]:px-4 group-[.is-user]:py-2.5 group-[.is-user]:text-white",
          "group-[.is-assistant]:text-[#1C1C1E]",
        ],
      },
    },
    defaultVariants: {
      variant: "contained",
    },
  }
)

export type MessageContentProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof messageContentVariants>

export const MessageContent = ({
  children,
  className,
  variant,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(messageContentVariants({ variant, className }))}
    {...props}
  >
    {children}
  </div>
)

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string
  name?: string
}

export const MessageAvatar = ({
  src,
  name,
  className,
  ...props
}: MessageAvatarProps) => (
  <Avatar className={cn("ring-border size-8 ring-1", className)} {...props}>
    <AvatarImage alt="" className="mt-0 mb-0" src={src} />
    <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
  </Avatar>
)



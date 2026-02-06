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
      "group flex w-full items-end justify-end gap-2 py-4",
      from === "user" ? "is-user" : "is-assistant flex-row-reverse justify-end",
      className
    )}
    {...props}
  />
)

const messageContentVariants = cva(
  "is-user:dark flex flex-col gap-2 overflow-hidden rounded-lg text-sm",
  {
    variants: {
      variant: {
        contained: [
          "max-w-[80%] px-4 py-3",
          "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground",
          "group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-foreground",
        ],
        flat: [
          "group-[.is-user]:max-w-[80%] group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground",
          "group-[.is-assistant]:text-foreground",
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
}: MessageContentProps) => {
  // Inject scroll stripe animation keyframes
  if (typeof document !== "undefined" && !document.querySelector("style[data-scroll-stripes]")) {
    const style = document.createElement("style")
    style.setAttribute("data-scroll-stripes", "true")
    style.textContent = `
      @keyframes scrollStripes {
        from { background-position-x: 0%; }
        to { background-position-x: 100%; }
      }
    `
    document.head.appendChild(style)
  }

  return (
    <div
      className={cn(messageContentVariants({ variant, className }), "relative")}
      {...props}
    >
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: "linear-gradient(90deg, transparent 0 80%, rgba(255,255,255,0.15) 0 100%)",
          backgroundSize: "8px 100%",
          backgroundRepeat: "repeat",
          animation: "scrollStripes 1s linear infinite",
          animationTimeline: "view()",
          animationRange: "entry 0% exit 100%",
        }}
      />
      <div className="relative z-20">
        {children}
      </div>
    </div>
  )
}

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



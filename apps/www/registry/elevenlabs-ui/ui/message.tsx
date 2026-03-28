import type { ComponentProps, HTMLAttributes } from "react"
import { useEffect, useRef, useState } from "react"
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
  const ref = useRef<HTMLDivElement>(null)
  const [glowColor, setGlowColor] = useState("#3b82f6")
  const [glowSpread, setGlowSpread] = useState(18)
  const [glowIntensity, setGlowIntensity] = useState(0.55)
  const [glowPulse, setGlowPulse] = useState(true)
  const [pulseSpeed, setPulseSpeed] = useState(2.5)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = (e: CustomEvent) => {
      const p = e.detail
      if (p.glowColor !== undefined) setGlowColor(p.glowColor)
      if (p.glowSpread !== undefined) setGlowSpread(p.glowSpread)
      if (p.glowIntensity !== undefined) setGlowIntensity(p.glowIntensity)
      if (p.glowPulse !== undefined) setGlowPulse(p.glowPulse)
      if (p.pulseSpeed !== undefined) setPulseSpeed(p.pulseSpeed)
    }
    el.addEventListener("animation:update", handler as EventListener)
    return () => el.removeEventListener("animation:update", handler as EventListener)
  }, [])

  const hex = glowColor.replace("#", "")
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const glowShadow = `0 0 ${glowSpread}px ${Math.round(glowSpread * 0.4)}px rgba(${r},${g},${b},${glowIntensity})`

  return (
    <div
      ref={ref}
      data-config-id="MessageContent-div-0"
      className={cn(messageContentVariants({ variant, className }), "msg-glow")}
      style={{ boxShadow: glowShadow } as React.CSSProperties}
      {...props}
    >
      {children}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        .msg-glow {
          animation: ${glowPulse ? `glowPulse ${pulseSpeed}s ease-in-out infinite` : "none"};
        }
      `}</style>
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



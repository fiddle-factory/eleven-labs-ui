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
  const [glowIntensity, setGlowIntensity] = useState(12)
  const [glowSpread, setGlowSpread] = useState(4)
  const [glowSpeed, setGlowSpeed] = useState(2.5)
  const [glowOpacity, setGlowOpacity] = useState(0.7)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = (e: CustomEvent) => {
      const p = e.detail
      if (p.glowColor !== undefined) setGlowColor(p.glowColor)
      if (p.glowIntensity !== undefined) setGlowIntensity(p.glowIntensity)
      if (p.glowSpread !== undefined) setGlowSpread(p.glowSpread)
      if (p.glowSpeed !== undefined) setGlowSpeed(p.glowSpeed)
      if (p.glowOpacity !== undefined) setGlowOpacity(p.glowOpacity)
    }
    el.addEventListener("animation:update", handler as EventListener)
    return () => el.removeEventListener("animation:update", handler as EventListener)
  }, [])

  const hexToRgb = (hex: string) => {
    const h = hex.replace(/^#/, "")
    const n = parseInt(h, 16)
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
  }

  const { r, g, b } = hexToRgb(glowColor)
  const shadowBase = `0 0 ${glowIntensity}px ${glowSpread}px rgba(${r},${g},${b},${glowOpacity})`
  const shadowLarge = `0 0 ${glowIntensity * 2}px ${glowSpread * 2}px rgba(${r},${g},${b},${glowOpacity * 0.5})`

  return (
    <>
      <div
        ref={ref}
        data-config-id="MessageContent-div-0"
        className={cn(messageContentVariants({ variant, className }), "msg-glow")}
        style={{
          ["--glow-shadow-base" as string]: shadowBase,
          ["--glow-shadow-large" as string]: shadowLarge,
          ["--glow-speed" as string]: `${glowSpeed}s`,
        }}
        {...props}
      >
        {children}
      </div>
      <style>{`
        @keyframes msgGlowPulse {
          0%, 100% { box-shadow: var(--glow-shadow-base); }
          50% { box-shadow: var(--glow-shadow-large); }
        }
        .msg-glow {
          animation: msgGlowPulse var(--glow-speed) ease-in-out infinite;
        }
      `}</style>
    </>
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



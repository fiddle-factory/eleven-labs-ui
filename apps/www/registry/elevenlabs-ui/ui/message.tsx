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
  const [glowIntensity, setGlowIntensity] = useState(18)
  const [glowSpread, setGlowSpread] = useState(4)
  const [glowOpacity, setGlowOpacity] = useState(0.55)
  const [glowPulse, setGlowPulse] = useState(true)
  const [pulseSpeed, setPulseSpeed] = useState(2.5)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = (e: CustomEvent) => {
      const p = e.detail
      if (p.glowColor !== undefined) setGlowColor(p.glowColor)
      if (p.glowIntensity !== undefined) setGlowIntensity(p.glowIntensity)
      if (p.glowSpread !== undefined) setGlowSpread(p.glowSpread)
      if (p.glowOpacity !== undefined) setGlowOpacity(p.glowOpacity)
      if (p.glowPulse !== undefined) setGlowPulse(p.glowPulse)
      if (p.pulseSpeed !== undefined) setPulseSpeed(p.pulseSpeed)
    }
    el.addEventListener("animation:update", handler as EventListener)
    return () => el.removeEventListener("animation:update", handler as EventListener)
  }, [])

  const hexToRgba = (hex: string, alpha: number) => {
    const h = hex.replace("#", "")
    const r = parseInt(h.substring(0, 2), 16)
    const g = parseInt(h.substring(2, 4), 16)
    const b = parseInt(h.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const glowShadow = `0 0 ${glowIntensity}px ${glowSpread}px ${hexToRgba(glowColor, glowOpacity)}`

  return (
    <div
      ref={ref}
      data-config-id="MessageContent-div-0"
      className={cn(messageContentVariants({ variant, className }))}
      style={{
        boxShadow: glowShadow,
        animation: glowPulse ? `messageGlowPulse ${pulseSpeed}s ease-in-out infinite` : "none",
      }}
      {...props}
    >
      {children}
      <style>{`
        @keyframes messageGlowPulse {
          0%, 100% { box-shadow: 0 0 ${glowIntensity}px ${glowSpread}px ${hexToRgba(glowColor, glowOpacity)}; }
          50% { box-shadow: 0 0 ${glowIntensity * 1.8}px ${glowSpread * 1.5}px ${hexToRgba(glowColor, glowOpacity * 0.6)}; }
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



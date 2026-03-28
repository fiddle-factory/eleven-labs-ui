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
  const [glowColor, setGlowColor] = useState("#facc15")
  const [glowIntensity, setGlowIntensity] = useState(18)
  const [glowSpread, setGlowSpread] = useState(4)
  const [glowOpacity, setGlowOpacity] = useState(0.7)
  const [pulseSpeed, setPulseSpeed] = useState(2.4)
  const [enablePulse, setEnablePulse] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = (e: CustomEvent) => {
      const p = e.detail
      if (p.glowColor !== undefined) setGlowColor(p.glowColor)
      if (p.glowIntensity !== undefined) setGlowIntensity(p.glowIntensity)
      if (p.glowSpread !== undefined) setGlowSpread(p.glowSpread)
      if (p.glowOpacity !== undefined) setGlowOpacity(p.glowOpacity)
      if (p.pulseSpeed !== undefined) setPulseSpeed(p.pulseSpeed)
      if (p.enablePulse !== undefined) setEnablePulse(p.enablePulse)
    }
    el.addEventListener("animation:update", handler as EventListener)
    return () => el.removeEventListener("animation:update", handler as EventListener)
  }, [])

  const hex2rgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${alpha})`
  }

  const glowShadow = `0 0 ${glowIntensity}px ${glowSpread}px ${hex2rgba(glowColor, glowOpacity)}`

  return (
    <div
      ref={ref}
      data-config-id="MessageContent-div-0"
      className={cn(messageContentVariants({ variant, className }), enablePulse ? "glow-pulse-anim" : "")}
      style={{ boxShadow: glowShadow }}
      {...props}
    >
      {children}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 ${glowIntensity * 0.6}px ${glowSpread * 0.6}px ${hex2rgba(glowColor, glowOpacity * 0.5)}; }
          50% { box-shadow: 0 0 ${glowIntensity * 1.5}px ${glowSpread * 1.5}px ${hex2rgba(glowColor, glowOpacity)}; }
        }
        .glow-pulse-anim {
          animation: glowPulse ${pulseSpeed}s ease-in-out infinite;
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



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
  const [glowSpeed, setGlowSpeed] = useState(2.5)
  const [glowOpacityMin, setGlowOpacityMin] = useState(0.35)
  const [glowOpacityMax, setGlowOpacityMax] = useState(0.85)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const handleUpdate = (e: CustomEvent) => {
      const p = e.detail
      if (p.glowColor !== undefined) setGlowColor(p.glowColor)
      if (p.glowIntensity !== undefined) setGlowIntensity(p.glowIntensity)
      if (p.glowSpread !== undefined) setGlowSpread(p.glowSpread)
      if (p.glowSpeed !== undefined) setGlowSpeed(p.glowSpeed)
      if (p.glowOpacityMin !== undefined) setGlowOpacityMin(p.glowOpacityMin)
      if (p.glowOpacityMax !== undefined) setGlowOpacityMax(p.glowOpacityMax)
    }
    element.addEventListener("animation:update", handleUpdate as EventListener)
    return () => element.removeEventListener("animation:update", handleUpdate as EventListener)
  }, [])

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `${r}, ${g}, ${b}`
  }

  const rgb = hexToRgb(glowColor)
  const shadowMin = `0 0 ${glowIntensity}px ${glowSpread}px rgba(${rgb}, ${glowOpacityMin})`
  const shadowMax = `0 0 ${glowIntensity * 1.8}px ${glowSpread * 2}px rgba(${rgb}, ${glowOpacityMax})`
  const animName = `blueGlowPulse-${glowColor.replace("#", "")}`

  return (
    <div
      ref={ref}
      data-config-id="MessageContent-div-0"
      className={cn(messageContentVariants({ variant, className }))}
      style={{ animation: `${animName} ${glowSpeed}s ease-in-out infinite` }}
      {...props}
    >
      {children}
      <style>{`
        @keyframes ${animName} {
          0%, 100% { box-shadow: ${shadowMin}; }
          50% { box-shadow: ${shadowMax}; }
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



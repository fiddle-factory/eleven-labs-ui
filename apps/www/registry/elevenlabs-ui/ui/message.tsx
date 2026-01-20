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
  const contentRef = useRef<HTMLDivElement>(null)
  const [glowColor, setGlowColor] = useState("#ff0000")
  const [glowIntensity, setGlowIntensity] = useState(0.5)
  const [glowSpeed, setGlowSpeed] = useState(2)
  const [glowSpread, setGlowSpread] = useState(10)

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.glowColor !== undefined) setGlowColor(params.glowColor)
      if (params.glowIntensity !== undefined) setGlowIntensity(params.glowIntensity)
      if (params.glowSpeed !== undefined) setGlowSpeed(params.glowSpeed)
      if (params.glowSpread !== undefined) setGlowSpread(params.glowSpread)
    }

    element.addEventListener('animation:update', handleAnimationUpdate as EventListener)
    return () => element.removeEventListener('animation:update', handleAnimationUpdate as EventListener)
  }, [])

  return (
    <div
      ref={contentRef}
      data-config-id="message-text-glow"
      className={cn(messageContentVariants({ variant, className }))}
      style={{
        animation: `textGlow ${glowSpeed}s ease-in-out infinite`,
        textShadow: `0 0 ${glowSpread * glowIntensity}px ${glowColor}`,
      }}
      {...props}
    >
      {children}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes textGlow {
            0%, 100% {
              text-shadow: 0 0 ${glowSpread * 0.3}px ${glowColor}, 0 0 ${glowSpread * 0.5}px ${glowColor};
            }
            50% {
              text-shadow: 0 0 ${glowSpread * glowIntensity}px ${glowColor}, 0 0 ${glowSpread * glowIntensity * 1.5}px ${glowColor}, 0 0 ${glowSpread * glowIntensity * 2}px ${glowColor};
            }
          }
        `
      }} />
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




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
  const [bgColor1, setBgColor1] = useState("#3b82f6")
  const [bgColor2, setBgColor2] = useState("#8b5cf6")
  const [bgSpeed, setBgSpeed] = useState(4)
  const [bgIntensity, setBgIntensity] = useState(0.15)

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.bgColor1 !== undefined) setBgColor1(params.bgColor1)
      if (params.bgColor2 !== undefined) setBgColor2(params.bgColor2)
      if (params.bgSpeed !== undefined) setBgSpeed(params.bgSpeed)
      if (params.bgIntensity !== undefined) setBgIntensity(params.bgIntensity)
    }

    element.addEventListener('animation:update', handleAnimationUpdate as EventListener)
    return () => element.removeEventListener('animation:update', handleAnimationUpdate as EventListener)
  }, [])

  return (
    <div
      ref={contentRef}
      data-config-id="message-bg-animation"
      className={cn(messageContentVariants({ variant, className }))}
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
      {...props}
    >
      <style>{`
        @keyframes messageBgColorCycle {
          0%, 100% { 
            background-color: ${bgColor1}${Math.round(bgIntensity * 255).toString(16).padStart(2, '0')}; 
          }
          50% { 
            background-color: ${bgColor2}${Math.round(bgIntensity * 255).toString(16).padStart(2, '0')}; 
          }
        }
        [data-config-id="message-bg-animation"] {
          animation: messageBgColorCycle ${bgSpeed}s ease-in-out infinite;
        }
      `}</style>
      {children}
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



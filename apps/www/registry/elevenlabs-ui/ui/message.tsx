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
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  // Animation config state
  const [strength, setStrength] = useState(0.38)
  const [threshold, setThreshold] = useState(1.6)
  const [easeIn, setEaseIn] = useState(0.18)
  const [easeOut, setEaseOut] = useState(0.10)
  const [shineOpacity, setShineOpacity] = useState(0.22)

  // Magnetic state refs (avoid re-renders in rAF loop)
  const stateRef = useRef({
    cx: 0, cy: 0, tx: 0, ty: 0,
    active: false,
    bx: "50%", by: "50%",
    strength, threshold, easeIn, easeOut, shineOpacity,
  })

  // Keep ref in sync with state
  useEffect(() => {
    stateRef.current.strength = strength
    stateRef.current.threshold = threshold
    stateRef.current.easeIn = easeIn
    stateRef.current.easeOut = easeOut
    stateRef.current.shineOpacity = shineOpacity
  }, [strength, threshold, easeIn, easeOut, shineOpacity])

  // Listen for editor updates
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const handler = (e: CustomEvent) => {
      const p = e.detail
      if (p.strength !== undefined) setStrength(p.strength)
      if (p.threshold !== undefined) setThreshold(p.threshold)
      if (p.easeIn !== undefined) setEaseIn(p.easeIn)
      if (p.easeOut !== undefined) setEaseOut(p.easeOut)
      if (p.shineOpacity !== undefined) setShineOpacity(p.shineOpacity)
    }
    el.addEventListener("animation:update", handler as EventListener)
    return () => el.removeEventListener("animation:update", handler as EventListener)
  }, [])

  // Magnetic + shine rAF loop
  useEffect(() => {
    const wrap = wrapRef.current
    const btn = innerRef.current
    if (!wrap || !btn) return

    let rafId: number

    const onMove = (e: MouseEvent) => {
      const s = stateRef.current
      const r = wrap.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      const radius = Math.max(r.width, r.height) * s.threshold

      if (dist < radius) {
        s.active = true
        s.tx = dx * s.strength
        s.ty = dy * s.strength
        s.bx = ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%"
        s.by = ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%"
      } else {
        s.active = false
        s.tx = 0
        s.ty = 0
      }
    }

    const loop = () => {
      const s = stateRef.current
      const ease = s.active ? s.easeIn : s.easeOut
      s.cx += (s.tx - s.cx) * ease
      s.cy += (s.ty - s.cy) * ease

      const dist = Math.hypot(s.cx, s.cy)
      const maxDist = 35
      const scale = 1 + Math.min(dist, maxDist) / maxDist * 0.045

      btn.style.transform = `translate(${s.cx.toFixed(2)}px, ${s.cy.toFixed(2)}px) scale(${scale.toFixed(4)})`
      btn.style.setProperty("--msg-bx", s.bx)
      btn.style.setProperty("--msg-by", s.by)
      btn.style.setProperty("--msg-shine", s.active ? String(s.shineOpacity) : "0")

      rafId = requestAnimationFrame(loop)
    }

    document.addEventListener("mousemove", onMove)
    rafId = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={wrapRef} data-config-id="message-content-magnetic" className="relative inline-flex" style={{ position: "relative" }}>
      <div
        ref={innerRef}
        className={cn(messageContentVariants({ variant, className }), "msg-magnetic")}
        style={{ willChange: "transform", position: "relative" }}
        {...props}
      >
        {/* Shine overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            background: "radial-gradient(circle at var(--msg-bx, 50%) var(--msg-by, 50%), rgba(255,255,255,0.32) 0%, transparent 65%)",
            opacity: "var(--msg-shine, 0)",
            transition: "opacity 0.3s ease",
          }}
        />
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


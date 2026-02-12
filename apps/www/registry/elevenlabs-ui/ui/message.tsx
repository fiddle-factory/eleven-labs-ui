import { useEffect, useRef, useState, type ComponentProps, type HTMLAttributes } from "react"
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
  const ref = useRef<HTMLDivElement>(null);
  const [glowColor, setGlowColor] = useState("#3b82f6");
  const [glowIntensity, setGlowIntensity] = useState(12);
  const [glowSpeed, setGlowSpeed] = useState(2.5);
  const [glowSpread, setGlowSpread] = useState(8);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail;
      if (params.glowColor !== undefined) setGlowColor(params.glowColor);
      if (params.glowIntensity !== undefined) setGlowIntensity(params.glowIntensity);
      if (params.glowSpeed !== undefined) setGlowSpeed(params.glowSpeed);
      if (params.glowSpread !== undefined) setGlowSpread(params.glowSpread);
    };

    element.addEventListener('animation:update', handleAnimationUpdate as EventListener);
    return () => element.removeEventListener('animation:update', handleAnimationUpdate as EventListener);
  }, []);

  const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const rgb = hexToRgb(glowColor);
  const animationName = "blueGlowPulse";

  const keyframes = `
    @keyframes ${animationName} {
      0%, 100% {
        box-shadow: 0 0 ${glowIntensity}px ${glowSpread}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25),
                    0 0 ${glowIntensity * 2}px ${glowSpread * 1.5}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1);
      }
      50% {
        box-shadow: 0 0 ${glowIntensity * 1.8}px ${glowSpread * 1.5}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.45),
                    0 0 ${glowIntensity * 3}px ${glowSpread * 2.5}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2);
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        ref={ref}
        data-config-id="MessageContent"
        className={cn(messageContentVariants({ variant, className }))}
        style={{
          animation: `${animationName} ${glowSpeed}s ease-in-out infinite`,
          boxShadow: `0 0 ${glowIntensity}px ${glowSpread}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`,
        }}
        {...props}
      >
        {children}
      </div>
    </>
  );
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



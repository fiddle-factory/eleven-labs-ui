import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/elevenlabs-ui/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/elevenlabs-ui/ui/card"

export interface AvatarCardProps extends React.ComponentProps<typeof Card> {
  /** The title displayed on the card */
  title: string
  /** Optional subtitle or description below the title */
  subtitle?: string
  /** URL of the avatar image */
  avatarSrc?: string
  /** Alt text for the avatar image */
  avatarAlt?: string
  /** Fallback text displayed when no avatar image is available (e.g. initials) */
  avatarFallback?: string
}

function AvatarCard({
  title,
  subtitle,
  avatarSrc,
  avatarAlt,
  avatarFallback,
  className,
  ...props
}: AvatarCardProps) {
  return (
    <Card className={cn("w-72", className)} {...props}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="size-12">
          {avatarSrc && <AvatarImage src={avatarSrc} alt={avatarAlt ?? title} />}
          <AvatarFallback className="text-sm font-medium">
            {avatarFallback ??
              title
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")
                .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <CardTitle className="text-base">{title}</CardTitle>
          {subtitle && (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          )}
        </div>
      </CardHeader>
    </Card>
  )
}

export { AvatarCard }


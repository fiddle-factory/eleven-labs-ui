import * as React from "react"

import { cn } from "@/lib/utils"

export interface PinkCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

function PinkCard({ className, title, description, children, ...props }: PinkCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-pink-200 bg-pink-100 p-6 shadow-sm dark:border-pink-900 dark:bg-pink-950",
        className
      )}
      {...props}
    >
      {title && (
        <h3 className="mb-1 text-lg font-semibold text-pink-900 dark:text-pink-100">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-pink-700 dark:text-pink-300">{description}</p>
      )}
      {children}
    </div>
  )
}

export { PinkCard }


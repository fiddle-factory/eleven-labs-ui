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
        "rounded-xl border border-red-200 bg-red-100 p-6 shadow-sm dark:border-red-900 dark:bg-red-950",
        className
      )}
      {...props}
    >
      {title && (
        <h3 className="mb-1 text-lg font-semibold text-red-900 dark:text-red-100">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-red-700 dark:text-red-300">{description}</p>
      )}
      {children}
    </div>
  )
}

export { PinkCard }





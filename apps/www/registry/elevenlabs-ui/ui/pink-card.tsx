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
        "rounded-xl border border-red-600 bg-red-500 p-6 shadow-sm dark:border-red-700 dark:bg-red-600",
        className
      )}
      {...props}
    >
      {title && (
        <h3 className="mb-1 text-lg font-semibold text-white dark:text-red-100">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-red-100 dark:text-red-300">{description}</p>
      )}
      {children}
    </div>
  )
}

export { PinkCard }








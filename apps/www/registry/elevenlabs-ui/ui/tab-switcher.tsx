"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ─── Context ────────────────────────────────────────────────────────────────

type TabSwitcherContextValue = {
  activeTab: string
  setActiveTab: (id: string) => void
  variant: "pill" | "underline" | "solid"
  size: "sm" | "md" | "lg"
}

const TabSwitcherContext = React.createContext<TabSwitcherContextValue | null>(
  null
)

function useTabSwitcher() {
  const ctx = React.useContext(TabSwitcherContext)
  if (!ctx)
    throw new Error("TabSwitcher parts must be used inside <TabSwitcher>")
  return ctx
}

// ─── Variants ────────────────────────────────────────────────────────────────

const tabListVariants = cva("flex items-center", {
  variants: {
    variant: {
      pill: "bg-muted gap-1 rounded-lg p-1",
      underline: "border-b border-border gap-0",
      solid: "gap-0 rounded-lg border border-border overflow-hidden",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "pill",
    size: "md",
  },
})

const tabTriggerVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer",
  {
    variants: {
      variant: {
        pill: [
          "rounded-md text-muted-foreground",
          "data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-sm",
          "hover:text-foreground",
        ],
        underline: [
          "rounded-none text-muted-foreground border-b-2 border-transparent -mb-px",
          "data-[active=true]:border-foreground data-[active=true]:text-foreground",
          "hover:text-foreground",
        ],
        solid: [
          "text-muted-foreground border-r border-border last:border-r-0",
          "data-[active=true]:bg-foreground data-[active=true]:text-background",
          "hover:bg-accent hover:text-foreground data-[active=true]:hover:bg-foreground",
        ],
      },
      size: {
        sm: "h-7 px-3 text-xs",
        md: "h-8 px-4 text-sm",
        lg: "h-10 px-5 text-sm",
      },
    },
    defaultVariants: {
      variant: "pill",
      size: "md",
    },
  }
)

// ─── Root ─────────────────────────────────────────────────────────────────────

export type TabSwitcherProps = {
  defaultTab?: string
  activeTab?: string
  onTabChange?: (id: string) => void
  variant?: "pill" | "underline" | "solid"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  className?: string
}

export function TabSwitcher({
  defaultTab,
  activeTab: controlledTab,
  onTabChange,
  variant = "pill",
  size = "md",
  children,
  className,
}: TabSwitcherProps) {
  const [internalTab, setInternalTab] = React.useState<string>(
    defaultTab ?? ""
  )

  const isControlled = controlledTab !== undefined
  const activeTab = isControlled ? controlledTab : internalTab

  const setActiveTab = React.useCallback(
    (id: string) => {
      if (!isControlled) setInternalTab(id)
      onTabChange?.(id)
    },
    [isControlled, onTabChange]
  )

  // Auto-select first tab when defaultTab is not set
  React.useLayoutEffect(() => {
    if (!defaultTab && !isControlled) {
      const first = React.Children.toArray(children).find(
        (c): c is React.ReactElement<TabPanelProps> =>
          React.isValidElement(c) && (c.type as { displayName?: string }).displayName === "TabPanel"
      )
      if (first) setInternalTab(first.props.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabSwitcherContext.Provider value={{ activeTab, setActiveTab, variant, size }}>
      <div data-slot="tab-switcher" className={cn("flex flex-col gap-4", className)}>
        {children}
      </div>
    </TabSwitcherContext.Provider>
  )
}
TabSwitcher.displayName = "TabSwitcher"

// ─── Tab List ─────────────────────────────────────────────────────────────────

export type TabListProps = React.HTMLAttributes<HTMLDivElement>

export function TabList({ className, children, ...props }: TabListProps) {
  const { variant, size } = useTabSwitcher()
  return (
    <div
      data-slot="tab-list"
      role="tablist"
      className={cn(tabListVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  )
}
TabList.displayName = "TabList"

// ─── Tab Trigger ──────────────────────────────────────────────────────────────

export type TabTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  id: string
  icon?: React.ReactNode
  badge?: React.ReactNode
}

export function TabTrigger({
  id,
  icon,
  badge,
  className,
  children,
  ...props
}: TabTriggerProps) {
  const { activeTab, setActiveTab, variant, size } = useTabSwitcher()
  const isActive = activeTab === id

  return (
    <button
      data-slot="tab-trigger"
      role="tab"
      type="button"
      aria-selected={isActive}
      data-active={isActive}
      onClick={() => setActiveTab(id)}
      className={cn(tabTriggerVariants({ variant, size }), className)}
      {...props}
    >
      {icon && <span className="[&_svg]:size-4 [&_svg]:shrink-0">{icon}</span>}
      {children}
      {badge && (
        <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-muted px-1 text-[10px] font-semibold tabular-nums text-muted-foreground group-data-[active=true]:bg-primary/10 group-data-[active=true]:text-primary">
          {badge}
        </span>
      )}
    </button>
  )
}
TabTrigger.displayName = "TabTrigger"

// ─── Tab Panel ────────────────────────────────────────────────────────────────

export type TabPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string
}

export function TabPanel({ id, className, children, ...props }: TabPanelProps) {
  const { activeTab } = useTabSwitcher()
  const isActive = activeTab === id

  if (!isActive) return null

  return (
    <div
      data-slot="tab-panel"
      role="tabpanel"
      className={cn("outline-none", className)}
      {...props}
    >
      {children}
    </div>
  )
}
TabPanel.displayName = "TabPanel"


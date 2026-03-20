"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { IconTable, type IconTableColumn } from "./icon-table"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TabSwitcherTab<TData extends Record<string, unknown> = Record<string, unknown>> {
  /** Unique identifier for the tab */
  id: string
  /** Label shown in the tab trigger */
  label: string
  /** Optional icon rendered before the label in the trigger */
  icon?: React.ReactNode
  /** Column definitions passed to IconTable */
  columns: IconTableColumn<TData>[]
  /** Row data passed to IconTable */
  data: TData[]
  /** Optional caption shown below the table */
  caption?: string
}

export interface TabSwitcherProps {
  /** Array of exactly 3 tabs to display */
  tabs: [TabSwitcherTab, TabSwitcherTab, TabSwitcherTab]
  /** The id of the tab that should be active on first render */
  defaultTab?: string
  /** Called when the active tab changes */
  onTabChange?: (tabId: string) => void
  /** Additional class name for the root element */
  className?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function TabSwitcher({ tabs, defaultTab, onTabChange, className }: TabSwitcherProps) {
  return (
    <Tabs
      defaultValue={defaultTab ?? tabs[0].id}
      onValueChange={onTabChange}
      className={cn("w-full", className)}
    >
      <TabsList className="w-full">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="flex-1 gap-1.5"
          >
            {tab.icon && (
              <span className="flex items-center [&>svg]:size-3.5">
                {tab.icon}
              </span>
            )}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          <IconTable
            columns={tab.columns}
            data={tab.data}
            caption={tab.caption}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export { TabSwitcher }


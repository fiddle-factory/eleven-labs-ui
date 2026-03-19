import * as React from "react"
import {
  Bot,
  HeadphonesIcon,
  Megaphone,
  Mic,
  Users,
  Activity,
  Globe,
  Zap,
  ShieldCheck,
  MapPin,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/elevenlabs-ui/ui/tabs"
import {
  SimpleTable,
  type SimpleTableColumn,
  type SimpleTableRow,
} from "@/registry/elevenlabs-ui/ui/simple-table"
import { Badge } from "@/registry/elevenlabs-ui/ui/badge"

// ─── Types ────────────────────────────────────────────────────────────────────

export type TabbedTableTab = {
  /** Unique value used to identify the tab */
  value: string
  /** Label shown on the tab trigger */
  label: string
  /** Lucide icon rendered next to the label */
  icon: React.ReactNode
  /** Columns passed to SimpleTable */
  columns: SimpleTableColumn[]
  /** Rows passed to SimpleTable */
  rows: SimpleTableRow[]
}

export type TabbedTableProps = {
  tabs: TabbedTableTab[]
  defaultTab?: string
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TabbedTable({ tabs, defaultTab, className }: TabbedTableProps) {
  const firstValue = tabs[0]?.value ?? ""

  return (
    <Tabs defaultValue={defaultTab ?? firstValue} className={cn("w-full", className)}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <SimpleTable columns={tab.columns} rows={tab.rows} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

// ─── Default tab data ─────────────────────────────────────────────────────────

const agentColumns: SimpleTableColumn[] = [
  { key: "agent",  label: "Agent",   icon: <Mic /> },
  { key: "users",  label: "Users",   icon: <Users /> },
  { key: "status", label: "Status",  icon: <Activity /> },
  { key: "region", label: "Region",  icon: <Globe /> },
]

const agentRows: SimpleTableRow[] = [
  { id: 1, agent: "Sales Bot",      users: "1,204", status: <Badge variant="default">Active</Badge>,    region: "US East" },
  { id: 2, agent: "Support Agent",  users: "876",   status: <Badge variant="secondary">Idle</Badge>,    region: "EU West" },
  { id: 3, agent: "Onboarding",     users: "3,510", status: <Badge variant="default">Active</Badge>,    region: "AP South" },
  { id: 4, agent: "HR Assistant",   users: "204",   status: <Badge variant="outline">Paused</Badge>,    region: "US West" },
]

const supportColumns: SimpleTableColumn[] = [
  { key: "agent",    label: "Agent",    icon: <HeadphonesIcon /> },
  { key: "tickets",  label: "Tickets",  icon: <Zap /> },
  { key: "status",   label: "Status",   icon: <ShieldCheck /> },
  { key: "region",   label: "Region",   icon: <MapPin /> },
]

const supportRows: SimpleTableRow[] = [
  { id: 1, agent: "Tier 1 Bot",    tickets: "342",   status: <Badge variant="default">Active</Badge>,    region: "US East" },
  { id: 2, agent: "Escalation AI", tickets: "89",    status: <Badge variant="secondary">Idle</Badge>,    region: "EU West" },
  { id: 3, agent: "Billing Help",  tickets: "1,105", status: <Badge variant="default">Active</Badge>,    region: "AP South" },
  { id: 4, agent: "Tech Desk",     tickets: "57",    status: <Badge variant="outline">Paused</Badge>,    region: "US West" },
]

const marketingColumns: SimpleTableColumn[] = [
  { key: "campaign", label: "Campaign", icon: <Megaphone /> },
  { key: "leads",    label: "Leads",    icon: <Users /> },
  { key: "status",   label: "Status",   icon: <Activity /> },
  { key: "region",   label: "Region",   icon: <Globe /> },
]

const marketingRows: SimpleTableRow[] = [
  { id: 1, campaign: "Summer Launch",  leads: "4,820", status: <Badge variant="default">Active</Badge>,    region: "Global" },
  { id: 2, campaign: "Retargeting",    leads: "1,340", status: <Badge variant="secondary">Idle</Badge>,    region: "US East" },
  { id: 3, campaign: "Referral Push",  leads: "2,900", status: <Badge variant="default">Active</Badge>,    region: "EU West" },
  { id: 4, campaign: "Churn Rescue",   leads: "610",   status: <Badge variant="outline">Paused</Badge>,    region: "AP South" },
]

export const defaultTabs: TabbedTableTab[] = [
  { value: "agents",    label: "Agents",    icon: <Bot />,            columns: agentColumns,     rows: agentRows },
  { value: "support",   label: "Support",   icon: <HeadphonesIcon />, columns: supportColumns,   rows: supportRows },
  { value: "marketing", label: "Marketing", icon: <Megaphone />,      columns: marketingColumns, rows: marketingRows },
]


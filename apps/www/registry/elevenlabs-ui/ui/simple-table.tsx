import * as React from "react"
import {
  Users,
  Mic,
  Activity,
  Globe,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/elevenlabs-ui/ui/table"
import { Badge } from "@/registry/elevenlabs-ui/ui/badge"

// ─── Types ────────────────────────────────────────────────────────────────────

export type SimpleTableColumn = {
  /** Unique key matching a key in `SimpleTableRow` */
  key: string
  /** Display label shown in the header */
  label: string
  /** Lucide icon rendered next to the label (mandatory) */
  icon: React.ReactNode
  className?: string
}

export type SimpleTableRow = {
  id: string | number
  [key: string]: React.ReactNode
}

export type SimpleTableProps = {
  columns: SimpleTableColumn[]
  rows: SimpleTableRow[]
  caption?: string
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SimpleTable({
  columns,
  rows,
  caption,
  className,
}: SimpleTableProps) {
  return (
    <div className={cn("rounded-lg border overflow-hidden", className)}>
      <Table>
        {caption && (
          <caption className="text-muted-foreground mt-4 mb-1 text-sm">
            {caption}
          </caption>
        )}
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            {columns.map((col) => (
              <TableHead key={col.key} className={col.className}>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-muted-foreground [&>svg]:size-3.5">
                    {col.icon}
                  </span>
                  {col.label}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell key={col.key}>{row[col.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// ─── Default data for stories / demos ────────────────────────────────────────

export const defaultColumns: SimpleTableColumn[] = [
  { key: "agent",  label: "Agent",   icon: <Mic />    },
  { key: "users",  label: "Users",   icon: <Users />  },
  { key: "status", label: "Status",  icon: <Activity /> },
  { key: "region", label: "Region",  icon: <Globe />  },
]

export const defaultRows: SimpleTableRow[] = [
  {
    id: 1,
    agent:  "Sales Bot",
    users:  "1,204",
    status: <Badge variant="default">Active</Badge>,
    region: "US East",
  },
  {
    id: 2,
    agent:  "Support Agent",
    users:  "876",
    status: <Badge variant="secondary">Idle</Badge>,
    region: "EU West",
  },
  {
    id: 3,
    agent:  "Onboarding",
    users:  "3,510",
    status: <Badge variant="default">Active</Badge>,
    region: "AP South",
  },
  {
    id: 4,
    agent:  "HR Assistant",
    users:  "204",
    status: <Badge variant="outline">Paused</Badge>,
    region: "US West",
  },
]


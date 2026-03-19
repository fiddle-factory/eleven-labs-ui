"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { SimpleTable, SimpleTableColumn, SimpleTableRow } from "@/registry/elevenlabs-ui/ui/simple-table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/elevenlabs-ui/ui/tabs"

export interface TabbedTableProps extends React.ComponentProps<"div"> {
  usersColumns?: SimpleTableColumn[]
  usersRows?: SimpleTableRow[]
  companiesColumns?: SimpleTableColumn[]
  companiesRows?: SimpleTableRow[]
}

function TabbedTable({
  usersColumns = [
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
  ],
  usersRows = [
    { name: "Alice", role: "Engineer" },
    { name: "Bob", role: "Designer" },
  ],
  companiesColumns = [
    { key: "company", header: "Company" },
    { key: "industry", header: "Industry" },
  ],
  companiesRows = [
    { company: "Acme Corp", industry: "Technology" },
    { company: "Globex", industry: "Finance" },
  ],
  className,
  ...props
}: TabbedTableProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <SimpleTable columns={usersColumns} rows={usersRows} />
        </TabsContent>
        <TabsContent value="companies">
          <SimpleTable columns={companiesColumns} rows={companiesRows} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { TabbedTable }


"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/elevenlabs-ui/ui/table"

export interface SimpleTableColumn {
  key: string
  header: string
}

export interface SimpleTableRow {
  [key: string]: React.ReactNode
}

export interface SimpleTableProps extends React.ComponentProps<"div"> {
  columns: SimpleTableColumn[]
  rows: SimpleTableRow[]
  caption?: string
}

function SimpleTable({
  columns,
  rows,
  caption,
  className,
  ...props
}: SimpleTableProps) {
  return (
    <div className={cn("rounded-lg border", className)} {...props}>
      <Table>
        {caption && (
          <caption className="text-muted-foreground mt-4 text-sm">
            {caption}
          </caption>
        )}
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
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

export { SimpleTable }


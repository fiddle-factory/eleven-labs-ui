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
} from "./table"

export interface IconTableColumn<TData = Record<string, unknown>> {
  /** Unique key matching a key on the data row */
  key: string
  /** Column header label */
  label: string
  /** Icon rendered alongside the header label */
  icon: React.ReactNode
  /** Optional cell renderer. Defaults to `String(row[key])` */
  render?: (value: unknown, row: TData) => React.ReactNode
  /** Optional class name applied to each cell in this column */
  cellClassName?: string
  /** Optional class name applied to the column header */
  headerClassName?: string
}

export interface IconTableProps<TData extends Record<string, unknown> = Record<string, unknown>> {
  /** Column definitions — provide exactly 3 for the default layout */
  columns: IconTableColumn<TData>[]
  /** Row data array */
  data: TData[]
  /** Optional caption shown below the table */
  caption?: string
  /** Additional class name for the wrapping element */
  className?: string
  /** Called when a row is clicked */
  onRowClick?: (row: TData) => void
}

function IconTableHead({
  icon,
  label,
  className,
}: {
  icon: React.ReactNode
  label: string
  className?: string
}) {
  return (
    <TableHead className={cn("", className)}>
      <span className="inline-flex items-center gap-1.5">
        <span className="text-muted-foreground [&>svg]:size-3.5 flex items-center">
          {icon}
        </span>
        <span>{label}</span>
      </span>
    </TableHead>
  )
}

function IconTable<TData extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  data,
  caption,
  className,
  onRowClick,
}: IconTableProps<TData>) {
  return (
    <div className={cn("rounded-md border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <IconTableHead
                key={col.key}
                icon={col.icon}
                label={col.label}
                className={col.headerClassName}
              />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                No results.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={cn(onRowClick && "cursor-pointer")}
              >
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.cellClassName}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
        {caption && (
          <caption className="mt-4 text-sm text-muted-foreground pb-2">
            {caption}
          </caption>
        )}
      </Table>
    </div>
  )
}

export { IconTable, IconTableHead }


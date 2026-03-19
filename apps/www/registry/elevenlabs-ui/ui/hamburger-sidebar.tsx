"use client"

import * as React from "react"
import { MenuIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/elevenlabs-ui/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/elevenlabs-ui/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/elevenlabs-ui/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/elevenlabs-ui/ui/tooltip"

// ── inline data ──────────────────────────────────────────────────────────────

const USERS = [
  { name: "Alice", role: "Engineer" },
  { name: "Bob", role: "Designer" },
]

const COMPANIES = [
  { company: "Acme Corp", industry: "Technology" },
  { company: "Globex", industry: "Finance" },
]

// ── types ─────────────────────────────────────────────────────────────────────

export interface HamburgerSidebarProps {
  /** Extra classes applied to the outermost wrapper */
  className?: string
  /** Tooltip text shown on the hamburger button */
  tooltipText?: string
  /** Initial open state */
  defaultOpen?: boolean
}

// ── component ─────────────────────────────────────────────────────────────────

export function HamburgerSidebar({
  className,
  tooltipText = "Open menu",
  defaultOpen = false,
}: HamburgerSidebarProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <div className={cn("relative flex h-full min-h-[480px] w-full overflow-hidden rounded-lg border bg-background", className)}>
      {/* ── top bar ── */}
      <header className="absolute inset-x-0 top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={open ? "Close sidebar" : "Open sidebar"}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                <XIcon className="size-5" />
              ) : (
                <MenuIcon className="size-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{open ? "Close menu" : tooltipText}</p>
          </TooltipContent>
        </Tooltip>

        <span className="text-sm font-semibold tracking-tight" data-config-id="HamburgerSidebar-span-0">Title</span>
      </header>

      {/* ── sidebar panel ── */}
      <aside
        className={cn(
          "absolute inset-y-0 left-0 z-10 flex w-64 flex-col border-r bg-muted/40 pt-14 transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-1 p-3">
          {["Overview", "Analytics", "Settings"].map((item) => (
            <button
              key={item}
              className="rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── main content ── */}
      <main
        className={cn(
          "absolute inset-0 pt-14 transition-[padding] duration-300 ease-in-out",
          open ? "pl-64" : "pl-0"
        )}
      >
        <div className="p-6">
          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
            </TabsList>

            {/* Users table */}
            <TabsContent value="users" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {USERS.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Companies table */}
            <TabsContent value="companies" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Industry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {COMPANIES.map((row) => (
                    <TableRow key={row.company}>
                      <TableCell>{row.company}</TableCell>
                      <TableCell>{row.industry}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}



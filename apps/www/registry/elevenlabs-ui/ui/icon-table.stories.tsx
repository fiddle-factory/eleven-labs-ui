import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Globe,
  User,
  Calendar,
  Hash,
  Cpu,
  Tag,
  BarChart2,
  Clock,
  Activity,
  DollarSign,
  Mail,
} from "lucide-react";
import { Badge } from "./badge";
import { IconTable, type IconTableColumn } from "./icon-table";

const meta: Meta<typeof IconTable> = {
  title: "UI/IconTable",
  component: IconTable,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A data table component where each column header displays an icon alongside the column title. Supports custom cell renderers, row click handlers, and fully typed column/data definitions.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof IconTable>;

// ---------------------------------------------------------------------------
// Default – Voice / AI model usage table
// ---------------------------------------------------------------------------

type UsageRow = {
  voice: string;
  model: string;
  requests: number;
};

const usageColumns: IconTableColumn<UsageRow>[] = [
  {
    key: "voice",
    label: "Voice",
    icon: <User />,
  },
  {
    key: "model",
    label: "Model",
    icon: <Cpu />,
  },
  {
    key: "requests",
    label: "Requests",
    icon: <BarChart2 />,
    render: (value) => (
      <span className="tabular-nums font-medium">{Number(value).toLocaleString()}</span>
    ),
  },
];

const usageData: UsageRow[] = [
  { voice: "Rachel", model: "Eleven Multilingual v2", requests: 14_820 },
  { voice: "Adam", model: "Eleven Turbo v2.5", requests: 9_204 },
  { voice: "Domi", model: "Eleven Monolingual v1", requests: 6_711 },
  { voice: "Bella", model: "Eleven Multilingual v2", requests: 3_050 },
  { voice: "Antoni", model: "Eleven Turbo v2.5", requests: 1_337 },
];

export const Default: Story = {
  render: () => (
    <div className="w-[640px] bg-background">
      <IconTable<UsageRow>
        columns={usageColumns}
        data={usageData}
        caption="Voice usage statistics for the current billing period."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default table showing voice, model, and request count columns — each header has a descriptive icon.",
      },
    },
  },
};

// ---------------------------------------------------------------------------
// With Status Badge – agent activity table
// ---------------------------------------------------------------------------

type AgentRow = {
  name: string;
  region: string;
  status: "active" | "idle" | "error";
};

const agentColumns: IconTableColumn<AgentRow>[] = [
  {
    key: "name",
    label: "Agent",
    icon: <Tag />,
  },
  {
    key: "region",
    label: "Region",
    icon: <Globe />,
  },
  {
    key: "status",
    label: "Status",
    icon: <Activity />,
    render: (value) => {
      const status = value as AgentRow["status"];
      const variant =
        status === "active"
          ? "default"
          : status === "error"
          ? "destructive"
          : "secondary";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];

const agentData: AgentRow[] = [
  { name: "Support Bot", region: "us-east-1", status: "active" },
  { name: "Sales Agent", region: "eu-west-1", status: "idle" },
  { name: "Onboarding AI", region: "ap-south-1", status: "active" },
  { name: "Billing Helper", region: "us-west-2", status: "error" },
];

export const WithStatusBadge: Story = {
  render: () => (
    <div className="w-[580px] bg-background">
      <IconTable<AgentRow>
        columns={agentColumns}
        data={agentData}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Table with a custom badge cell renderer for status values. Each column header has a contextual icon.",
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Scheduled Events – date / time columns
// ---------------------------------------------------------------------------

type EventRow = {
  title: string;
  date: string;
  time: string;
};

const eventColumns: IconTableColumn<EventRow>[] = [
  { key: "title", label: "Event", icon: <Hash /> },
  { key: "date", label: "Date", icon: <Calendar /> },
  { key: "time", label: "Time", icon: <Clock /> },
];

const eventData: EventRow[] = [
  { title: "Quarterly Review", date: "2025-07-15", time: "10:00 AM" },
  { title: "Product Launch", date: "2025-08-01", time: "02:00 PM" },
  { title: "Team Retrospective", date: "2025-08-12", time: "11:00 AM" },
  { title: "Annual Summit", date: "2025-09-20", time: "09:00 AM" },
];

export const ScheduledEvents: Story = {
  render: () => (
    <div className="w-[520px] bg-background">
      <IconTable<EventRow>
        columns={eventColumns}
        data={eventData}
        caption="Upcoming scheduled events."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Table displaying scheduled events with calendar and clock icons in the column headers.",
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Empty State
// ---------------------------------------------------------------------------

export const EmptyState: Story = {
  render: () => (
    <div className="w-[580px] bg-background">
      <IconTable<UsageRow>
        columns={usageColumns}
        data={[]}
        caption="No data available yet."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Table with an empty data array showing the built-in 'No results.' empty state.",
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Clickable Rows
// ---------------------------------------------------------------------------

type ContactRow = {
  name: string;
  email: string;
  spend: string;
};

const contactColumns: IconTableColumn<ContactRow>[] = [
  { key: "name", label: "Name", icon: <User /> },
  { key: "email", label: "Email", icon: <Mail /> },
  { key: "spend", label: "Spend", icon: <DollarSign /> },
];

const contactData: ContactRow[] = [
  { name: "Alice Johnson", email: "alice@example.com", spend: "$1,240.00" },
  { name: "Bob Martinez", email: "bob@example.com", spend: "$875.50" },
  { name: "Carol Smith", email: "carol@example.com", spend: "$3,100.00" },
];

export const ClickableRows: Story = {
  render: () => (
    <div className="w-[580px] bg-background">
      <IconTable<ContactRow>
        columns={contactColumns}
        data={contactData}
        onRowClick={(row) => alert(`Clicked: ${row.name}`)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Rows become interactive when `onRowClick` is provided — a pointer cursor is applied and each row fires the callback on click.",
      },
    },
  },
};


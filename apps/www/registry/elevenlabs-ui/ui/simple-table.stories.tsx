import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  SimpleTable,
  defaultColumns,
  defaultRows,
} from "./simple-table"

const meta: Meta<typeof SimpleTable> = {
  title: "UI/SimpleTable",
  component: SimpleTable,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A clean 2×2-style data table with mandatory header icons. Each column header requires a Lucide icon rendered alongside the label.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof SimpleTable>

export const Default: Story = {
  render: () => (
    <div className="w-[700px] bg-background p-6">
      <SimpleTable
        columns={defaultColumns}
        rows={defaultRows}
        caption="Agent overview — last 30 days"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A 4-column table with icon headers showing agent name, user count, status badge, and region.",
      },
    },
  },
}


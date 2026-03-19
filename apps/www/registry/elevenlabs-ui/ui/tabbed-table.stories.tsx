import type { Meta, StoryObj } from "@storybook/nextjs"
import { TabbedTable, defaultTabs } from "./tabbed-table"

const meta: Meta<typeof TabbedTable> = {
  title: "UI/TabbedTable",
  component: TabbedTable,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A tab-switcher component that renders a SimpleTable inside each tab. " +
          "Tabs include mandatory icons alongside their labels. Each tab has its own " +
          "column and row definitions.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof TabbedTable>

export const Default: Story = {
  render: () => (
    <div className="w-[700px] bg-background p-6">
      <TabbedTable tabs={defaultTabs} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three tabs — Agents, Support, and Marketing — each backed by its own SimpleTable with icon-labelled columns.",
      },
    },
  },
}


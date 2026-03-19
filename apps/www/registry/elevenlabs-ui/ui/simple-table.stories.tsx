import type { Meta, StoryObj } from "@storybook/nextjs";
import { SimpleTable } from "./simple-table";

const meta: Meta<typeof SimpleTable> = {
  title: "UI/SimpleTable",
  component: SimpleTable,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A simple 2×2 table component built on top of the base Table primitives. Accepts column definitions and row data for easy declarative use.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SimpleTable>;

export const Default: Story = {
  render: () => (
    <SimpleTable
      columns={[
        { key: "name", header: "Name" },
        { key: "role", header: "Role" },
      ]}
      rows={[
        { name: "Alice", role: "Engineer" },
        { name: "Bob", role: "Designer" },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "A basic 2×2 table with two columns and two rows of data.",
      },
    },
  },
};


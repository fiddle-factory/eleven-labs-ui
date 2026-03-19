import type { Meta, StoryObj } from "@storybook/nextjs"
import { HamburgerSidebar } from "./hamburger-sidebar"

const meta: Meta<typeof HamburgerSidebar> = {
  title: "UI/HamburgerSidebar",
  component: HamburgerSidebar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A sidebar that slides in when the hamburger button is clicked. The hamburger button has a tooltip, and the content area contains a tabbed table showing Users and Companies.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof HamburgerSidebar>

export const Default: Story = {
  args: {
    tooltipText: "Open menu",
    defaultOpen: false,
  },
  decorators: [
    (Story) => (
      <div className="h-[480px] w-[720px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Click the hamburger icon in the top-left to slide open the sidebar. Hover over the icon to see the tooltip.",
      },
    },
  },
}


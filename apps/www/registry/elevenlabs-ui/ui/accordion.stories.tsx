import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

const meta: Meta = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An accordion component built on Radix UI, supporting single or multiple expanded items with smooth animations.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger style={{ color: "#fcc203" }}>
          What is ElevenLabs?
        </AccordionTrigger>
        <AccordionContent style={{ color: "#03fcf0" }}>
          ElevenLabs is an AI audio research and deployment company. Our
          mission is to make content universally accessible in any language and
          any voice.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A single accordion item with a custom yellow title and cyan content.",
      },
    },
  },
};


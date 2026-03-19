import type { Meta, StoryObj } from "@storybook/nextjs";
import { AccordionAudioPlayer } from "./accordion-audio-player";
import { exampleTracks } from "./audio-player";

const meta: Meta<typeof AccordionAudioPlayer> = {
  title: "UI/AccordionAudioPlayer",
  component: AccordionAudioPlayer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A composed component that combines Accordion and AudioPlayer. Each accordion item reveals a full-featured audio player — a single shared context ensures only one track plays at a time.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AccordionAudioPlayer>;

export const Default: Story = {
  render: () => (
    <AccordionAudioPlayer
      className="w-[520px]"
      type="single"
      collapsible
      tracks={[
        {
          id: exampleTracks[0].id,
          title: exampleTracks[0].name,
          src: exampleTracks[0].url,
          description: "An ambient piece from the ElevenLabs II collection.",
        },
        {
          id: exampleTracks[1].id,
          title: exampleTracks[1].name,
          src: exampleTracks[1].url,
          description: "A second track — open to play while the first pauses.",
        },
        {
          id: exampleTracks[2].id,
          title: exampleTracks[2].name,
          src: exampleTracks[2].url,
          description: "Third entry in the series.",
        },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three audio tracks rendered as accordion items. Expanding an item reveals the player; only one track plays at a time thanks to the shared AudioPlayerProvider.",
      },
    },
  },
};


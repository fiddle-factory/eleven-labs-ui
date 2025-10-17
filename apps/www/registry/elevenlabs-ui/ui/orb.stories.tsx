import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { Orb, type AgentState } from "./orb";
import { Button } from "./button";

const meta: Meta<typeof Orb> = {
  title: "UI/Orb",
  component: Orb,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An animated 3D orb component for visualizing agent states. Perfect for voice assistants, AI interactions, and status indicators with smooth transitions and customizable colors.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Orb>;

// Basic States
export const Idle: Story = {
  render: () => (
    <div className="relative h-32 w-32">
      <Orb agentState={null} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Idle state - orb is calm and gently pulsing.",
      },
    },
  },
};

export const Listening: Story = {
  render: () => (
    <div className="relative h-32 w-32">
      <Orb agentState="listening" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Listening state - orb shows it's ready to receive input.",
      },
    },
  },
};

export const Talking: Story = {
  render: () => (
    <div className="relative h-32 w-32">
      <Orb agentState="talking" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Talking state - orb is animated showing active speech.",
      },
    },
  },
};

export const Thinking: Story = {
  render: () => (
    <div className="relative h-32 w-32">
      <Orb agentState="thinking" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Thinking state - orb shows processing activity.",
      },
    },
  },
};

// Size Variations
export const SmallOrb: Story = {
  render: () => (
    <div className="relative h-16 w-16">
      <Orb agentState="talking" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Small orb size - 64px.",
      },
    },
  },
};

export const LargeOrb: Story = {
  render: () => (
    <div className="relative h-64 w-64">
      <Orb agentState="talking" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Large orb size - 256px.",
      },
    },
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [agent, setAgent] = useState<AgentState>(null);

    return (
      <div className="w-full max-w-2xl rounded-lg border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Interactive Orb</h3>
          <p className="text-sm text-muted-foreground">
            Control the agent state to see different animations
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative h-40 w-40 rounded-full bg-muted p-2 shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
              <div className="h-full w-full overflow-hidden rounded-full bg-background shadow-[inset_0_0_12px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]">
                <Orb agentState={agent} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              size="sm"
              variant={agent === null ? "default" : "outline"}
              onClick={() => setAgent(null)}
            >
              Idle
            </Button>
            <Button
              size="sm"
              variant={agent === "listening" ? "default" : "outline"}
              onClick={() => setAgent("listening")}
            >
              Listening
            </Button>
            <Button
              size="sm"
              variant={agent === "talking" ? "default" : "outline"}
              onClick={() => setAgent("talking")}
            >
              Talking
            </Button>
            <Button
              size="sm"
              variant={agent === "thinking" ? "default" : "outline"}
              onClick={() => setAgent("thinking")}
            >
              Thinking
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Current State: <span className="font-medium">{agent || "Idle"}</span>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo with controls to switch between agent states.",
      },
    },
  },
};

// Multiple Orbs Demo
export const MultipleOrbs: Story = {
  render: () => {
    const [agent, setAgent] = useState<AgentState>(null);

    const orbColors: [string, string][] = [
      ["#CADCFC", "#A0B9D1"],
      ["#F6E7D8", "#E0CFC2"],
      ["#E5E7EB", "#9CA3AF"],
    ];

    return (
      <div className="w-full max-w-3xl rounded-lg border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Agent Orbs</h3>
          <p className="text-sm text-muted-foreground">
            Interactive orb visualization with agent states
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center gap-8">
            {orbColors.map((colors, index) => (
              <div key={index} className="relative">
                <div className="relative h-32 w-32 rounded-full bg-muted p-1 shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
                  <div className="h-full w-full overflow-hidden rounded-full bg-background shadow-[inset_0_0_12px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]">
                    <Orb
                      colors={colors}
                      seed={(index + 1) * 1000}
                      agentState={agent}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setAgent(null)}
              disabled={agent === null}
            >
              Idle
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setAgent("listening")}
              disabled={agent === "listening"}
            >
              Listening
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={agent === "talking"}
              onClick={() => setAgent("talking")}
            >
              Talking
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={agent === "thinking"}
              onClick={() => setAgent("thinking")}
            >
              Thinking
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Multiple orbs with different colors and seeds, all responding to the same state.",
      },
    },
  },
};

// State Comparison
export const StateComparison: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 rounded-lg border bg-background p-6 md:grid-cols-4">
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-24 w-24">
          <Orb agentState={null} />
        </div>
        <span className="text-sm text-muted-foreground">Idle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-24 w-24">
          <Orb agentState="listening" />
        </div>
        <span className="text-sm text-muted-foreground">Listening</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-24 w-24">
          <Orb agentState="talking" />
        </div>
        <span className="text-sm text-muted-foreground">Talking</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-24 w-24">
          <Orb agentState="thinking" />
        </div>
        <span className="text-sm text-muted-foreground">Thinking</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all agent states side by side.",
      },
    },
  },
};

// Color Palette Showcase
export const ColorPaletteShowcase: Story = {
  render: () => {
    const palettes: Array<{ name: string; colors: [string, string] }> = [
      { name: "Blue", colors: ["#CADCFC", "#A0B9D1"] },
      { name: "Warm", colors: ["#F6E7D8", "#E0CFC2"] },
      { name: "Gray", colors: ["#E5E7EB", "#9CA3AF"] },
      { name: "Purple", colors: ["#E9D5FF", "#C084FC"] },
      { name: "Green", colors: ["#BBF7D0", "#86EFAC"] },
      { name: "Rose", colors: ["#FECDD3", "#FB7185"] },
    ];

    return (
      <div className="grid grid-cols-2 gap-6 rounded-lg border bg-background p-6 md:grid-cols-3">
        {palettes.map((palette) => (
          <div key={palette.name} className="flex flex-col items-center gap-2">
            <div className="relative h-24 w-24">
              <Orb colors={palette.colors} agentState="talking" />
            </div>
            <span className="text-sm text-muted-foreground">{palette.name}</span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Showcase of different color palettes for the orb.",
      },
    },
  },
};


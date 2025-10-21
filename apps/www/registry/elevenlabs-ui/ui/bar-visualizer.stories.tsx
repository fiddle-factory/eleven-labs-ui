import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { BarVisualizer, type AgentState } from "./bar-visualizer";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

const meta: Meta<typeof BarVisualizer> = {
  title: "UI/BarVisualizer",
  component: BarVisualizer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Real-time audio frequency visualizer with animated state transitions. Perfect for voice assistants and audio applications with multiple agent states.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof BarVisualizer>;

// Basic States
export const Connecting: Story = {
  args: {
    state: "connecting",
    demo: true,
    barCount: 20,
    minHeight: 15,
    maxHeight: 90,
    className: "h-40 w-full max-w-md",
  },
  parameters: {
    docs: {
      description: {
        story: "Connecting state - bars animate from sides to center.",
      },
    },
  },
};

export const Initializing: Story = {
  args: {
    state: "initializing",
    demo: true,
    barCount: 20,
    minHeight: 15,
    maxHeight: 90,
    className: "h-40 w-full max-w-md",
  },
  parameters: {
    docs: {
      description: {
        story: "Initializing state - similar to connecting animation.",
      },
    },
  },
};

export const Listening: Story = {
  args: {
    state: "listening",
    demo: true,
    barCount: 20,
    minHeight: 15,
    maxHeight: 90,
    className: "h-40 w-full max-w-md",
  },
  parameters: {
    docs: {
      description: {
        story: "Listening state - center bar pulses to show listening.",
      },
    },
  },
};

export const Speaking: Story = {
  args: {
    state: "speaking",
    demo: true,
    barCount: 20,
    minHeight: 15,
    maxHeight: 90,
    className: "h-40 w-full max-w-md",
  },
  parameters: {
    docs: {
      description: {
        story: "Speaking state - bars react to simulated audio.",
      },
    },
  },
};

export const Thinking: Story = {
  args: {
    state: "thinking",
    demo: true,
    barCount: 20,
    minHeight: 15,
    maxHeight: 90,
    className: "h-40 w-full max-w-md",
  },
  parameters: {
    docs: {
      description: {
        story: "Thinking state - center bar pulses showing processing.",
      },
    },
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [state, setState] = useState<AgentState>("listening");

    return (
      <Card>
        <CardHeader>
          <CardTitle>Audio Frequency Visualizer</CardTitle>
          <CardDescription>
            Real-time frequency band visualization with animated state transitions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <BarVisualizer
              state={state}
              demo={true}
              barCount={20}
              minHeight={15}
              maxHeight={90}
              className="h-40 max-w-full"
            />

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={state === "connecting" ? "default" : "outline"}
                onClick={() => setState("connecting")}
              >
                Connecting
              </Button>
              <Button
                size="sm"
                variant={state === "initializing" ? "default" : "outline"}
                onClick={() => setState("initializing")}
              >
                Initializing
              </Button>
              <Button
                size="sm"
                variant={state === "listening" ? "default" : "outline"}
                onClick={() => setState("listening")}
              >
                Listening
              </Button>
              <Button
                size="sm"
                variant={state === "speaking" ? "default" : "outline"}
                onClick={() => setState("speaking")}
              >
                Speaking
              </Button>
              <Button
                size="sm"
                variant={state === "thinking" ? "default" : "outline"}
                onClick={() => setState("thinking")}
              >
                Thinking
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
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

// Height Variations
export const ShortBars: Story = {
  args: {
    state: "speaking",
    demo: true,
    barCount: 20,
    minHeight: 10,
    maxHeight: 50,
    className: "h-32 w-full max-w-md",
  },
  parameters: {
    docs: {
      description: {
        story: "Shorter bars with reduced height range.",
      },
    },
  },
};

export const TallBars: Story = {
  args: {
    state: "speaking",
    demo: true,
    barCount: 20,
    minHeight: 20,
    maxHeight: 100,
    className: "h-64 w-full max-w-md",
  },
  parameters: {
    docs: {
      description: {
        story: "Taller bars with extended height range.",
      },
    },
  },
};

// Center Aligned
export const CenterAligned: Story = {
  args: {
    state: "speaking",
    demo: true,
    barCount: 20,
    minHeight: 15,
    maxHeight: 90,
    centerAlign: true,
    className: "h-40 w-full max-w-md",
  },
  parameters: {
    docs: {
      description: {
        story: "Center-aligned bars instead of bottom-aligned.",
      },
    },
  },
};
import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { LiveWaveform } from "./live-waveform";
import { Button } from "./button";

const meta: Meta<typeof LiveWaveform> = {
  title: "UI/LiveWaveform",
  component: LiveWaveform,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Real-time audio waveform visualization component with microphone input support. Features static and scrolling modes, processing animations, and customizable appearance.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LiveWaveform>;

// Basic States
export const Idle: Story = {
  args: {
    active: false,
    processing: false,
    height: 80,
    barWidth: 3,
    barGap: 2,
  },
  parameters: {
    docs: {
      description: {
        story: "Idle state - waveform is not active or processing.",
      },
    },
  },
};

export const Active: Story = {
  args: {
    active: true,
    processing: false,
    height: 80,
    barWidth: 3,
    barGap: 2,
    mode: "static",
  },
  parameters: {
    docs: {
      description: {
        story: "Active state - listening to microphone input (requires permission).",
      },
    },
  },
};

export const Processing: Story = {
  args: {
    active: false,
    processing: true,
    height: 80,
    barWidth: 3,
    barGap: 2,
    mode: "static",
  },
  parameters: {
    docs: {
      description: {
        story: "Processing state - animated waveform showing processing activity.",
      },
    },
  },
};

// Mode Variations
export const StaticMode: Story = {
  args: {
    active: false,
    processing: true,
    height: 80,
    barWidth: 3,
    barGap: 2,
    mode: "static",
  },
  parameters: {
    docs: {
      description: {
        story: "Static mode - bars update in place without scrolling.",
      },
    },
  },
};

export const ScrollingMode: Story = {
  args: {
    active: false,
    processing: true,
    height: 80,
    barWidth: 3,
    barGap: 2,
    mode: "scrolling",
    historySize: 120,
  },
  parameters: {
    docs: {
      description: {
        story: "Scrolling mode - waveform scrolls from right to left.",
      },
    },
  },
};

// Size Variations
export const Compact: Story = {
  args: {
    active: false,
    processing: true,
    height: 40,
    barWidth: 2,
    barGap: 1,
    mode: "static",
  },
  parameters: {
    docs: {
      description: {
        story: "Compact waveform with smaller dimensions.",
      },
    },
  },
};

export const Large: Story = {
  args: {
    active: false,
    processing: true,
    height: 120,
    barWidth: 4,
    barGap: 3,
    mode: "static",
  },
  parameters: {
    docs: {
      description: {
        story: "Large waveform with increased dimensions.",
      },
    },
  },
};

// Color Variations
export const CustomColor: Story = {
  args: {
    active: false,
    processing: true,
    height: 80,
    barWidth: 3,
    barGap: 2,
    barColor: "hsl(142 76% 36%)",
    mode: "static",
  },
  parameters: {
    docs: {
      description: {
        story: "Waveform with custom green color.",
      },
    },
  },
};

export const BlueWaveform: Story = {
  args: {
    active: false,
    processing: true,
    height: 80,
    barWidth: 3,
    barGap: 2,
    barColor: "hsl(217 91% 60%)",
    mode: "static",
  },
  parameters: {
    docs: {
      description: {
        story: "Waveform with blue color.",
      },
    },
  },
};

// Edge Fading
export const WithoutFadeEdges: Story = {
  args: {
    active: false,
    processing: true,
    height: 80,
    barWidth: 3,
    barGap: 2,
    fadeEdges: false,
    mode: "static",
  },
  parameters: {
    docs: {
      description: {
        story: "Waveform without edge fading effect.",
      },
    },
  },
};

export const WithFadeEdges: Story = {
  args: {
    active: false,
    processing: true,
    height: 80,
    barWidth: 3,
    barGap: 2,
    fadeEdges: true,
    fadeWidth: 40,
    mode: "static",
  },
  parameters: {
    docs: {
      description: {
        story: "Waveform with pronounced edge fading effect.",
      },
    },
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [active, setActive] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [mode, setMode] = useState<"static" | "scrolling">("static");

    const handleToggleActive = () => {
      setActive(!active);
      if (!active) {
        setProcessing(false);
      }
    };

    const handleToggleProcessing = () => {
      setProcessing(!processing);
      if (!processing) {
        setActive(false);
      }
    };

    return (
      <div className="w-full max-w-2xl rounded-lg border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Live Audio Waveform</h3>
          <p className="text-sm text-muted-foreground">
            Real-time microphone input visualization with audio reactivity
          </p>
        </div>

        <div className="space-y-4">
          <LiveWaveform
            active={active}
            processing={processing}
            height={80}
            barWidth={3}
            barGap={2}
            mode={mode}
            fadeEdges={true}
            barColor="gray"
            historySize={120}
          />

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              size="sm"
              variant={active ? "default" : "outline"}
              onClick={handleToggleActive}
            >
              {active ? "Stop" : "Start"} Listening
            </Button>
            <Button
              size="sm"
              variant={processing ? "default" : "outline"}
              onClick={handleToggleProcessing}
            >
              {processing ? "Stop" : "Start"} Processing
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMode(mode === "static" ? "scrolling" : "static")}
            >
              Mode: {mode === "static" ? "Static" : "Scrolling"}
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo with controls to toggle states and modes.",
      },
    },
  },
};

// Themed Demos
export const RetroStyle: Story = {
  render: () => (
    <div className="rounded-lg border bg-muted/30 p-8">
      <LiveWaveform
        active={false}
        processing={true}
        height={80}
        barWidth={4}
        barGap={3}
        barColor="hsl(142 76% 36%)"
        barRadius={0}
        mode="static"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Retro-styled waveform with green color and square bars.",
      },
    },
  },
};

// Comparison View
export const ModeComparison: Story = {
  render: () => (
    <div className="space-y-6 rounded-lg border bg-background p-6">
      <div>
        <h4 className="mb-2 text-sm font-medium">Static Mode</h4>
        <LiveWaveform
          active={false}
          processing={true}
          height={60}
          barWidth={3}
          barGap={2}
          mode="static"
        />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Scrolling Mode</h4>
        <LiveWaveform
          active={false}
          processing={true}
          height={60}
          barWidth={3}
          barGap={2}
          mode="scrolling"
          historySize={120}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of static and scrolling modes.",
      },
    },
  },
};
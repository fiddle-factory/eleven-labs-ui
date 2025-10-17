import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Matrix,
  digits,
  loader,
  pulse,
  wave,
  snake,
  chevronLeft,
  chevronRight,
  vu,
  type Frame,
} from "./matrix";

const meta: Meta<typeof Matrix> = {
  title: "UI/Matrix",
  component: Matrix,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile LED matrix display component with built-in animations and presets. Perfect for retro displays, digital clocks, audio visualizers, and custom patterns.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Matrix>;

export const AllDigits: Story = {
  render: () => (
    <div className="flex gap-4 bg-background p-6 rounded-lg">
      {digits.map((digit, index) => (
        <Matrix key={index} rows={7} cols={5} pattern={digit} ariaLabel={`Digit ${index}`} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All digits 0-9 displayed in a row.",
      },
    },
  },
};

// Presets - Loader
export const Loader: Story = {
  args: {
    rows: 7,
    cols: 7,
    frames: loader,
    fps: 12,
  },
  parameters: {
    docs: {
      description: {
        story: "Rotating spinner animation (7×7, 12 frames).",
      },
    },
  },
};

// Presets - Pulse
export const Pulse: Story = {
  args: {
    rows: 7,
    cols: 7,
    frames: pulse,
    fps: 16,
  },
  parameters: {
    docs: {
      description: {
        story: "Expanding pulse effect (7×7, 16 frames).",
      },
    },
  },
};

// Presets - Wave
export const Wave: Story = {
  args: {
    rows: 7,
    cols: 7,
    frames: wave,
    fps: 20,
  },
  parameters: {
    docs: {
      description: {
        story: "Smooth sine wave animation (7×7, 24 frames).",
      },
    },
  },
};

// Presets - Snake
export const Snake: Story = {
  args: {
    rows: 7,
    cols: 7,
    frames: snake,
    fps: 15,
  },
  parameters: {
    docs: {
      description: {
        story: "Snake traversal pattern (7×7, ~40 frames).",
      },
    },
  },
};

// Presets - Chevrons
export const ChevronLeft: Story = {
  args: {
    rows: 5,
    cols: 5,
    pattern: chevronLeft,
  },
  parameters: {
    docs: {
      description: {
        story: "Simple left-pointing arrow (5×5).",
      },
    },
  },
};

export const ChevronRight: Story = {
  args: {
    rows: 5,
    cols: 5,
    pattern: chevronRight,
  },
  parameters: {
    docs: {
      description: {
        story: "Simple right-pointing arrow (5×5).",
      },
    },
  },
};

// Examples - Retro Display
export const RetroDisplay: Story = {
  render: () => (
    <div className="bg-muted/30 rounded-lg border p-8">
      <Matrix
        rows={7}
        cols={7}
        frames={wave}
        fps={20}
        size={16}
        gap={3}
        palette={{
          on: "hsl(142 76% 36%)",
          off: "hsl(142 76% 10%)",
        }}
        ariaLabel="Wave animation"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Retro-styled matrix display with custom green palette.",
      },
    },
  },
};

// Examples - Digital Clock
export const DigitalClock: Story = {
  render: () => (
    <div className="flex gap-2 bg-background p-6 rounded-lg">
      <Matrix rows={7} cols={5} pattern={digits[1]} size={12} gap={2} ariaLabel="Hour tens" />
      <Matrix rows={7} cols={5} pattern={digits[2]} size={12} gap={2} ariaLabel="Hour ones" />
      <div className="flex flex-col justify-center gap-2">
        <div className="w-2 h-2 bg-primary rounded-full" />
        <div className="w-2 h-2 bg-primary rounded-full" />
      </div>
      <Matrix rows={7} cols={5} pattern={digits[3]} size={12} gap={2} ariaLabel="Minute tens" />
      <Matrix rows={7} cols={5} pattern={digits[4]} size={12} gap={2} ariaLabel="Minute ones" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Digital clock showing 12:34 using digit patterns.",
      },
    },
  },
};

// Examples - Custom Pattern (Heart)
export const Heart: Story = {
  render: () => {
    const heartPattern: Frame = [
      [0, 1, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
    ];

    return (
      <Matrix
        rows={6}
        cols={7}
        pattern={heartPattern}
        size={14}
        gap={2}
        palette={{
          on: "hsl(0 84% 60%)",
          off: "hsl(0 84% 20%)",
        }}
        ariaLabel="Heart icon"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Custom heart pattern with red color palette.",
      },
    },
  },
};

// Examples - Custom Pattern (Smiley)
export const Smiley: Story = {
  render: () => {
    const smileyPattern: Frame = [
      [0, 0, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
    ];

    return (
      <Matrix
        rows={7}
        cols={7}
        pattern={smileyPattern}
        size={12}
        gap={2}
        palette={{
          on: "hsl(48 96% 53%)",
          off: "hsl(48 96% 20%)",
        }}
        ariaLabel="Smiley face"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Custom smiley face pattern with yellow palette.",
      },
    },
  },
};

// Examples - Custom Size & Gap
export const LargeMatrix: Story = {
  args: {
    rows: 7,
    cols: 7,
    frames: pulse,
    fps: 16,
    size: 20,
    gap: 4,
  },
  parameters: {
    docs: {
      description: {
        story: "Large matrix with increased cell size and spacing.",
      },
    },
  },
};

// Examples - Multiple Animations
export const AnimationShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 bg-background p-6 rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <Matrix rows={7} cols={7} frames={loader} fps={12} />
        <span className="text-sm text-muted-foreground">Loader</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Matrix rows={7} cols={7} frames={pulse} fps={16} />
        <span className="text-sm text-muted-foreground">Pulse</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Matrix rows={7} cols={7} frames={wave} fps={20} />
        <span className="text-sm text-muted-foreground">Wave</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Matrix rows={7} cols={7} frames={snake} fps={15} />
        <span className="text-sm text-muted-foreground">Snake</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Matrix rows={5} cols={5} pattern={chevronLeft} />
        <span className="text-sm text-muted-foreground">Left</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Matrix rows={5} cols={5} pattern={chevronRight} />
        <span className="text-sm text-muted-foreground">Right</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all built-in animations and patterns.",
      },
    },
  },
};


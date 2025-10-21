import type { Meta, StoryObj } from "@storybook/nextjs";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShimmeringText } from "./shimmering-text";

const meta: Meta<typeof ShimmeringText> = {
  title: "UI/ShimmeringText",
  component: ShimmeringText,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An animated text component with a shimmer gradient effect. Perfect for loading states, status messages, and attention-grabbing text.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ShimmeringText>;

// Basic Usage
export const Default: Story = {
  args: {
    text: "Shimmering Text Effect",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic shimmer text with default settings.",
      },
    },
  },
};

// Interactive Cycling Demo
export const CyclingPhrases: Story = {
  render: () => {
    const phrases = [
      "Agent is thinking...",
      "Processing your request...",
      "Analyzing the data...",
      "Generating response...",
      "Almost there...",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
      }, 3000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-full max-w-2xl rounded-lg border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Text Shimmer Effect</h3>
          <p className="text-sm text-muted-foreground">
            Animated gradient text with automatic cycling
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center rounded-lg bg-muted/10 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ShimmeringText text={phrases[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Cycling through different phrases with fade transitions.",
      },
    },
  },
};

// Custom Colors
export const CustomColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ShimmeringText
        text="Blue Shimmer"
        color="hsl(217 91% 40%)"
        shimmerColor="hsl(217 91% 70%)"
      />
      <ShimmeringText
        text="Green Shimmer"
        color="hsl(142 76% 30%)"
        shimmerColor="hsl(142 76% 60%)"
      />
      <ShimmeringText
        text="Purple Shimmer"
        color="hsl(280 89% 40%)"
        shimmerColor="hsl(280 89% 70%)"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shimmer text with custom base and shimmer colors.",
      },
    },
  },
};

// Different Durations
export const DifferentDurations: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">Fast (1s)</div>
        <ShimmeringText text="Quick shimmer animation" duration={1} />
      </div>
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">Normal (2s)</div>
        <ShimmeringText text="Normal shimmer animation" duration={2} />
      </div>
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">Slow (4s)</div>
        <ShimmeringText text="Slow shimmer animation" duration={4} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shimmer animations with different speeds.",
      },
    },
  },
};

// Single Animation
export const SingleAnimation: Story = {
  args: {
    text: "This shimmers only once",
    repeat: false,
    duration: 2,
  },
  parameters: {
    docs: {
      description: {
        story: "Shimmer effect that plays only once without repeating.",
      },
    },
  },
};

// Large Text
export const LargeText: Story = {
  args: {
    text: "Large Shimmer",
    className: "text-4xl font-bold",
  },
  parameters: {
    docs: {
      description: {
        story: "Shimmer effect on larger text sizes.",
      },
    },
  },
};


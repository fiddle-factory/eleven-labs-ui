import type { Meta, StoryObj } from "@storybook/nextjs";
import { useEffect, useState } from "react";
import { Mic } from "lucide-react";
import { VoiceButton, type VoiceButtonState } from "./voice-button";

const meta: Meta<typeof VoiceButton> = {
  title: "UI/VoiceButton",
  component: VoiceButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A specialized button for voice interactions with built-in waveform visualization and state management. Supports recording, processing, success, and error states with visual feedback.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof VoiceButton>;

// Basic States
export const Idle: Story = {
  args: {
    label: "Voice",
    trailing: "⌥Space",
    state: "idle",
  },
  parameters: {
    docs: {
      description: {
        story: "Idle state - ready to start recording.",
      },
    },
  },
};

export const Recording: Story = {
  args: {
    label: "Voice",
    trailing: "⌥Space",
    state: "recording",
  },
  parameters: {
    docs: {
      description: {
        story: "Recording state - showing active waveform.",
      },
    },
  },
};

export const Processing: Story = {
  args: {
    label: "Voice",
    trailing: "⌥Space",
    state: "processing",
  },
  parameters: {
    docs: {
      description: {
        story: "Processing state - animated waveform showing activity.",
      },
    },
  },
};

export const Success: Story = {
  args: {
    label: "Voice",
    trailing: "⌥Space",
    state: "success",
  },
  parameters: {
    docs: {
      description: {
        story: "Success state - shows checkmark feedback.",
      },
    },
  },
};

export const Error: Story = {
  args: {
    label: "Voice",
    trailing: "⌥Space",
    state: "error",
  },
  parameters: {
    docs: {
      description: {
        story: "Error state - shows X icon feedback.",
      },
    },
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [state, setState] = useState<VoiceButtonState>("idle");

    const handlePress = () => {
      if (state === "idle") {
        setState("recording");
      } else if (state === "recording") {
        setState("processing");

        setTimeout(() => {
          setState("success");

          setTimeout(() => {
            setState("idle");
          }, 1500);
        }, 1000);
      }
    };

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.altKey && e.code === "Space") {
          e.preventDefault();
          handlePress();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [state]);

    return (
      <div className="flex min-h-[200px] w-full items-center justify-center">
        <VoiceButton
          label="Voice"
          trailing="⌥Space"
          state={state}
          onPress={handlePress}
          className="min-w-[180px]"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo with automatic state transitions. Try clicking or pressing Alt+Space!",
      },
    },
  },
};

export const OutlineVariant: Story = {
  args: {
    label: "Voice",
    trailing: "⌥Space",
    state: "idle",
    variant: "outline",
  },
  parameters: {
    docs: {
      description: {
        story: "Button with outline variant (default).",
      },
    },
  },
};

export const GhostVariant: Story = {
  args: {
    label: "Voice",
    trailing: "⌥Space",
    state: "idle",
    variant: "ghost",
  },
  parameters: {
    docs: {
      description: {
        story: "Button with ghost variant styling.",
      },
    },
  },
};

// Different Sizes
export const SmallSize: Story = {
  args: {
    label: "Voice",
    trailing: "⌥Space",
    state: "idle",
    size: "sm",
  },
  parameters: {
    docs: {
      description: {
        story: "Small size button.",
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    label: "Voice",
    trailing: "⌥Space",
    state: "idle",
    size: "lg",
    className: "min-w-[200px]",
  },
  parameters: {
    docs: {
      description: {
        story: "Large size button.",
      },
    },
  },
};

// Icon Size
export const IconButton: Story = {
  render: () => {
    const [state, setState] = useState<VoiceButtonState>("idle");

    const handlePress = () => {
      if (state === "idle") {
        setState("recording");
      } else if (state === "recording") {
        setState("processing");
        setTimeout(() => {
          setState("success");
          setTimeout(() => setState("idle"), 1500);
        }, 1000);
      }
    };

    return (
      <VoiceButton
        icon={<Mic className="h-4 w-4" />}
        state={state}
        onPress={handlePress}
        size="icon"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Icon-only button with waveform overlay.",
      },
    },
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: "Voice",
    trailing: "⌥Space",
    state: "idle",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled voice button.",
      },
    },
  },
};

// Compact Layout
export const CompactLayout: Story = {
  render: () => {
    const [state, setState] = useState<VoiceButtonState>("idle");

    return (
      <div className="flex items-center gap-2 rounded-lg border bg-card p-2">
        <span className="text-sm text-muted-foreground">Quick record:</span>
        <VoiceButton
          label="Voice"
          trailing="⌥Space"
          state={state}
          onPress={() => {
            if (state === "idle") setState("recording");
            else if (state === "recording") {
              setState("processing");
              setTimeout(() => {
                setState("success");
                setTimeout(() => setState("idle"), 1500);
              }, 1000);
            }
          }}
          size="sm"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Compact inline layout with surrounding context.",
      },
    },
  },
};


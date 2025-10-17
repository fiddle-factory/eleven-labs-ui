import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  AudioPlayerProvider,
  AudioPlayerButton,
  AudioPlayerProgress,
  AudioPlayerTime,
  AudioPlayerDuration,
  AudioPlayerSpeed,
  AudioPlayerSpeedButtonGroup,
  exampleTracks,
} from "./audio-player";

const meta: Meta = {
  title: "UI/AudioPlayer",
  component: AudioPlayerProvider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A comprehensive audio player component with playback controls, progress tracking, time display, and speed controls. Includes context provider for managing audio state across multiple components.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const BasicPlayer: Story = {
  render: () => (
    <AudioPlayerProvider>
      <div className="flex w-[600px] flex-col gap-4 rounded-lg border border-border bg-background p-6">
        <div className="flex items-center gap-4">
          <AudioPlayerButton
            item={{
              id: "demo",
              src: exampleTracks[0].url,
              data: { name: exampleTracks[0].name },
            }}
            size="icon"
            variant="default"
          />
          <div className="flex flex-1 flex-col gap-2">
            <AudioPlayerProgress />
            <div className="flex justify-between">
              <AudioPlayerTime />
              <AudioPlayerDuration />
            </div>
          </div>
          <AudioPlayerSpeed />
        </div>
      </div>
    </AudioPlayerProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "A basic audio player with play/pause, progress bar, time display, and speed control.",
      },
    },
  },
};

export const WithSpeedButtons: Story = {
  render: () => (
    <AudioPlayerProvider>
      <div className="flex w-[600px] flex-col gap-4 rounded-lg border border-border bg-background p-6">
        <div className="flex items-center gap-4">
          <AudioPlayerButton
            item={{
              id: "demo",
              src: exampleTracks[1].url,
              data: { name: exampleTracks[1].name },
            }}
            size="icon"
            variant="default"
          />
          <div className="flex flex-1 flex-col gap-2">
            <AudioPlayerProgress />
            <div className="flex justify-between">
              <AudioPlayerTime />
              <AudioPlayerDuration />
            </div>
          </div>
        </div>
        <AudioPlayerSpeedButtonGroup speeds={[0.5, 1, 1.5, 2]} />
      </div>
    </AudioPlayerProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Audio player with button group for quick speed adjustments.",
      },
    },
  },
};

export const Playlist: Story = {
  render: () => (
    <AudioPlayerProvider>
      <div className="flex w-[600px] flex-col gap-4 rounded-lg border border-border bg-background p-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <AudioPlayerProgress />
            <div className="flex justify-between">
              <AudioPlayerTime />
              <AudioPlayerDuration />
            </div>
          </div>
          <AudioPlayerSpeed />
        </div>
        <div className="flex flex-col gap-2">
          {exampleTracks.slice(0, 5).map((track) => (
            <div
              key={track.id}
              className="flex items-center gap-3 rounded-md border border-border p-3 hover:bg-accent/50"
            >
              <AudioPlayerButton
                item={{
                  id: track.id,
                  src: track.url,
                  data: { name: track.name },
                }}
                size="sm"
                variant="ghost"
              />
              <span className="text-sm">{track.name}</span>
            </div>
          ))}
        </div>
      </div>
    </AudioPlayerProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "A playlist view with multiple tracks, each with its own play/pause button sharing the same audio player state.",
      },
    },
  },
};

export const MinimalPlayer: Story = {
  render: () => (
    <AudioPlayerProvider>
      <div className="flex w-[400px] items-center gap-3 rounded-lg border border-border bg-background p-4">
        <AudioPlayerButton
          item={{
            id: "minimal",
            src: exampleTracks[2].url,
          }}
          size="sm"
          variant="outline"
        />
        <div className="flex flex-1 flex-col gap-1">
          <AudioPlayerProgress />
        </div>
        <div className="flex items-center gap-2 text-xs tabular-nums text-muted-foreground">
          <AudioPlayerTime />
          <span>/</span>
          <AudioPlayerDuration />
        </div>
      </div>
    </AudioPlayerProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "A minimal, compact audio player design.",
      },
    },
  },
};


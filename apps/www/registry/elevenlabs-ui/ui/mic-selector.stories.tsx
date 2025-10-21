import type { Meta, StoryObj } from "@storybook/nextjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Disc, Pause, Play, Trash2 } from "lucide-react";
import { MicSelector } from "./mic-selector";
import { Button } from "./button";
import { Card } from "./card";
import { LiveWaveform } from "./live-waveform";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";

const meta: Meta<typeof MicSelector> = {
  title: "UI/MicSelector",
  component: MicSelector,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A microphone input selector with live audio preview. Allows users to choose from available audio input devices and toggle mute state with visual feedback.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MicSelector>;

// Basic Usage
export const Default: Story = {
  render: () => {
    const [selectedDevice, setSelectedDevice] = useState<string>("");
    const [isMuted, setIsMuted] = useState(false);

    return (
      <div className="rounded-lg border bg-background p-6">
        <MicSelector
          value={selectedDevice}
          onValueChange={setSelectedDevice}
          muted={isMuted}
          onMutedChange={setIsMuted}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Basic microphone selector with device selection and mute toggle.",
      },
    },
  },
};

// Muted State
export const Muted: Story = {
  render: () => {
    const [selectedDevice, setSelectedDevice] = useState<string>("");
    const [isMuted, setIsMuted] = useState(true);

    return (
      <div className="rounded-lg border bg-background p-6">
        <MicSelector
          value={selectedDevice}
          onValueChange={setSelectedDevice}
          muted={isMuted}
          onMutedChange={setIsMuted}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Microphone selector in muted state.",
      },
    },
  },
};

// Disabled State
export const Disabled: Story = {
  render: () => {
    const [selectedDevice, setSelectedDevice] = useState<string>("");

    return (
      <div className="rounded-lg border bg-background p-6">
        <MicSelector
          value={selectedDevice}
          onValueChange={setSelectedDevice}
          disabled={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled microphone selector.",
      },
    },
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [selectedDevice, setSelectedDevice] = useState<string>("");
    const [isMuted, setIsMuted] = useState(false);

    return (
      <div className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6">
        <div>
          <h3 className="text-lg font-semibold">Microphone Settings</h3>
          <p className="text-sm text-muted-foreground">
            Select your microphone and adjust settings
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Selected Device
            </label>
            <MicSelector
              value={selectedDevice}
              onValueChange={setSelectedDevice}
              muted={isMuted}
              onMutedChange={setIsMuted}
            />
          </div>

          <div className="flex items-center justify-between rounded-md border bg-muted/50 p-3">
            <span className="text-sm">Status:</span>
            <span className="text-sm font-medium">
              {isMuted ? "🔇 Muted" : "🎤 Active"}
            </span>
          </div>

          {selectedDevice && (
            <div className="rounded-md border bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">
                Device ID: <code className="text-xs">{selectedDevice.slice(0, 20)}...</code>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo showing device selection and state management.",
      },
    },
  },
};

// Recording Demo
type RecordingState = "idle" | "loading" | "recording" | "recorded" | "playing";

export const RecordingDemo: Story = {
  render: () => {
    const [selectedDevice, setSelectedDevice] = useState<string>("");
    const [isMuted, setIsMuted] = useState(false);
    const [state, setState] = useState<RecordingState>("idle");
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioElementRef = useRef<HTMLAudioElement | null>(null);

    const startRecording = useCallback(async () => {
      try {
        setState("loading");

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: selectedDevice ? { deviceId: { exact: selectedDevice } } : true,
        });

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          setAudioBlob(blob);
          stream.getTracks().forEach((track) => track.stop());
          setState("recorded");
        };

        mediaRecorder.start();
        setState("recording");
      } catch (error) {
        console.error("Error starting recording:", error);
        setState("idle");
      }
    }, [selectedDevice]);

    const stopRecording = useCallback(() => {
      if (mediaRecorderRef.current && state === "recording") {
        mediaRecorderRef.current.stop();
      }
    }, [state]);

    const playRecording = useCallback(() => {
      if (!audioBlob) return;

      const audio = new Audio(URL.createObjectURL(audioBlob));
      audioElementRef.current = audio;

      audio.onended = () => {
        setState("recorded");
      };

      audio.play();
      setState("playing");
    }, [audioBlob]);

    const pausePlayback = useCallback(() => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        setState("recorded");
      }
    }, []);

    const restart = useCallback(() => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current = null;
      }
      setAudioBlob(null);
      audioChunksRef.current = [];
      setState("idle");
    }, []);

    // Stop recording when muted
    useEffect(() => {
      if (isMuted && state === "recording") {
        stopRecording();
      }
    }, [isMuted, state, stopRecording]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
        }
        if (audioElementRef.current) {
          audioElementRef.current.pause();
        }
      };
    }, []);

    const showWaveform = state === "recording" && !isMuted;
    const showProcessing = state === "loading" || state === "playing";
    const showRecorded = state === "recorded";

    return (
      <div className="flex min-h-[200px] w-full items-center justify-center p-4">
        <Card className="m-0 w-full max-w-2xl border p-0 shadow-lg">
          <div className="flex items-center justify-between gap-2 p-2">
            <div className="h-8 w-[120px] md:h-10 md:w-[200px]">
              <div
                className={cn(
                  "flex h-full items-center gap-2 rounded-md py-1",
                  "bg-foreground/5 text-foreground/70"
                )}
              >
                <div className="h-full flex-1">
                  <div className="relative flex h-full w-full shrink-0 items-center justify-center overflow-hidden rounded-sm">
                    <LiveWaveform
                      key={state}
                      active={showWaveform}
                      processing={showProcessing}
                      deviceId={selectedDevice}
                      barWidth={3}
                      barGap={1}
                      barRadius={4}
                      fadeEdges={true}
                      fadeWidth={24}
                      sensitivity={1.8}
                      smoothingTimeConstant={0.85}
                      height={20}
                      mode="scrolling"
                      className={cn(
                        "h-full w-full transition-opacity duration-300",
                        state === "idle" && "opacity-0"
                      )}
                    />
                    {state === "idle" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] font-medium text-foreground/50">
                          Start Recording
                        </span>
                      </div>
                    )}
                    {showRecorded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] font-medium text-foreground/50">
                          Ready to Play
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <MicSelector
                value={selectedDevice}
                onValueChange={setSelectedDevice}
                muted={isMuted}
                onMutedChange={setIsMuted}
                disabled={state === "recording" || state === "loading"}
              />
              <Separator orientation="vertical" className="mx-1 -my-2.5" />
              {state === "idle" && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={startRecording}
                  disabled={isMuted}
                  aria-label="Start recording"
                >
                  <Disc className="h-5 w-5" />
                </Button>
              )}
              {(state === "loading" || state === "recording") && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={stopRecording}
                  disabled={state === "loading"}
                  aria-label="Stop recording"
                >
                  <Pause className="h-5 w-5" />
                </Button>
              )}
              {showRecorded && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={playRecording}
                  aria-label="Play recording"
                >
                  <Play className="h-5 w-5" />
                </Button>
              )}
              {state === "playing" && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={pausePlayback}
                  aria-label="Pause playback"
                >
                  <Pause className="h-5 w-5" />
                </Button>
              )}
              <Separator orientation="vertical" className="mx-1 -my-2.5" />
              <Button
                variant="ghost"
                size="icon"
                onClick={restart}
                disabled={
                  state === "idle" || state === "loading" || state === "recording"
                }
                aria-label="Delete recording"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Complete recording interface with microphone selector, live waveform, and playback controls.",
      },
    },
  },
};

// Simple Recording Control
export const SimpleRecordingControl: Story = {
  render: () => {
    const [selectedDevice, setSelectedDevice] = useState<string>("");
    const [isMuted, setIsMuted] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const toggleRecording = async () => {
      if (isRecording) {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
      } else {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: selectedDevice ? { deviceId: { exact: selectedDevice } } : true,
          });
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.start();
          setIsRecording(true);
        } catch (error) {
          console.error("Error starting recording:", error);
        }
      }
    };

    return (
      <div className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between">
          <MicSelector
            value={selectedDevice}
            onValueChange={setSelectedDevice}
            muted={isMuted}
            onMutedChange={setIsMuted}
          />
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="sm"
            onClick={toggleRecording}
            disabled={isMuted}
          >
            {isRecording ? "Stop" : "Record"}
          </Button>
        </div>
        <div className="h-16 rounded-md border bg-muted/50 p-2">
          <LiveWaveform
            active={isRecording && !isMuted}
            deviceId={selectedDevice}
            height={48}
            mode="scrolling"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Simplified recording control with waveform visualization.",
      },
    },
  },
};

// Compact Layout
export const CompactLayout: Story = {
  render: () => {
    const [selectedDevice, setSelectedDevice] = useState<string>("");
    const [isMuted, setIsMuted] = useState(false);

    return (
      <div className="flex items-center gap-2 rounded-lg border bg-card p-2">
        <MicSelector
          value={selectedDevice}
          onValueChange={setSelectedDevice}
          muted={isMuted}
          onMutedChange={setIsMuted}
        />
        <div className="h-8 w-32 rounded bg-muted/50 p-1">
          <LiveWaveform
            active={!isMuted}
            deviceId={selectedDevice}
            height={24}
            barWidth={2}
            barGap={1}
            mode="static"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Compact layout with inline waveform preview.",
      },
    },
  },
};


"use client"

import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/elevenlabs-ui/ui/accordion"
import {
  AudioPlayerButton,
  AudioPlayerDuration,
  AudioPlayerProgress,
  AudioPlayerProvider,
  AudioPlayerSpeed,
  AudioPlayerTime,
} from "@/registry/elevenlabs-ui/ui/audio-player"

export interface AccordionAudioTrack {
  /** Unique identifier for the track */
  id: string
  /** Display title shown in the accordion trigger */
  title: string
  /** Audio source URL */
  src: string
  /** Optional description shown below the player */
  description?: string
}

export interface AccordionAudioPlayerProps {
  /** List of tracks to render as accordion items */
  tracks: AccordionAudioTrack[]
  /** Controls whether one or multiple items can be open simultaneously */
  type?: "single" | "multiple"
  /** Whether the accordion can be fully collapsed (only applies when type="single") */
  collapsible?: boolean
  /** Default open item value(s) */
  defaultValue?: string | string[]
  /** Additional className for the root Accordion */
  className?: string
}

/**
 * AccordionAudioPlayer — a composed component that renders a list of audio
 * tracks inside an Accordion. Each accordion item contains a full-featured
 * AudioPlayer (play/pause, progress bar, timestamps, speed control).
 *
 * A single shared `AudioPlayerProvider` context is used so that only one
 * track plays at a time across all accordion items.
 */
export function AccordionAudioPlayer({
  tracks,
  type = "single",
  collapsible = true,
  defaultValue,
  className,
}: AccordionAudioPlayerProps) {
  const accordionProps =
    type === "single"
      ? {
          type: "single" as const,
          collapsible: collapsible as true,
          defaultValue: defaultValue as string | undefined,
        }
      : {
          type: "multiple" as const,
          defaultValue: defaultValue as string[] | undefined,
        }

  return (
    <AudioPlayerProvider>
      <Accordion {...accordionProps} className={className}>
        {tracks.map((track) => (
          <AccordionItem key={track.id} value={track.id}>
            <AccordionTrigger>{track.title}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3 pb-1">
                {/* Player row */}
                <div className="flex items-center gap-3">
                  <AudioPlayerButton
                    item={{ id: track.id, src: track.src }}
                    size="icon"
                    variant="default"
                    className="shrink-0"
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <AudioPlayerProgress />
                    <div className="flex justify-between">
                      <AudioPlayerTime />
                      <AudioPlayerDuration />
                    </div>
                  </div>
                  <AudioPlayerSpeed />
                </div>

                {/* Optional description */}
                {track.description && (
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {track.description}
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </AudioPlayerProvider>
  )
}


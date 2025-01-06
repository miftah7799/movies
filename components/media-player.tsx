"use client"

import "@vidstack/react/player/styles/base.css"
import { useEffect, useRef } from "react"
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  isHLSProvider,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from "@vidstack/react"

import { VideoLayout } from "./ui/layout/video-layout"

export function Player() {
  let player = useRef<MediaPlayerInstance>(null)

  useEffect(() => {
    // Subscribe to state updates.
    return player.current!.subscribe(({ paused, viewType }) => {
      // console.log('is paused?', '->', state.paused);
      // console.log('is audio view?', '->', state.viewType === 'audio');
    })
  }, [])

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {}
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent
  ) {
    // ...
  }

  return (
    <MediaPlayer
      className="aspect-video w-full overflow-hidden rounded-md bg-slate-900 font-sans text-white ring-media-focus data-[focus]:ring-4"
      title="Sprite Fight"
      src="https://files.vidstack.io/sprite-fight/720p.mp4"
      crossOrigin
      playsInline
      onProviderChange={onProviderChange}
      onCanPlay={onCanPlay}
      ref={player}
    >
      <MediaProvider>
        <Poster
          className="absolute inset-0 block size-full rounded-md object-cover opacity-0 transition-opacity data-[visible]:opacity-100"
          src="https://files.vidstack.io/sprite-fight/poster.webp"
          alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
        />
        {textTracks.map((track) => (
          <Track {...track} key={track.src} />
        ))}
      </MediaProvider>

      <VideoLayout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" />
    </MediaPlayer>
  )
}
export const textTracks = [
  // Subtitles
  {
    src: "https://files.vidstack.io/sprite-fight/subs/english.vtt",
    label: "English",
    language: "en-US",
    kind: "subtitles",
    default: true,
  },
  {
    src: "https://files.vidstack.io/sprite-fight/subs/spanish.vtt",
    label: "Spanish",
    language: "es-ES",
    kind: "subtitles",
  },
  // Chapters
  {
    src: "https://files.vidstack.io/sprite-fight/chapters.vtt",
    kind: "chapters",
    language: "en-US",
    default: true,
  },
] as const

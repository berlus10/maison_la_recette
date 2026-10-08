'use client';

import { useRef, useState, type SyntheticEvent } from 'react';

const PREVIEW_SECONDS = 60;
const AUDIO_PROXY_URL = '/api/podcast/preview-audio';

export function PodcastPreview() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [showNativeControls, setShowNativeControls] = useState(false);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
      return;
    }

    setError(false);
    if (audio.currentTime >= PREVIEW_SECONDS) {
      audio.currentTime = 0;
      setProgress(0);
    }

    setIsLoading(true);
    try {
      await audio.play();
    } catch (playError) {
      console.error('Podcast preview playback could not start.', playError);
      setIsLoading(false);
      setShowNativeControls(true);
      setError(true);
    }
  }

  function stopAtPreviewEnd(event: SyntheticEvent<HTMLAudioElement>) {
    const audio = event.currentTarget;
    const currentTime = Math.min(audio.currentTime, PREVIEW_SECONDS);
    setProgress((currentTime / PREVIEW_SECONDS) * 100);

    if (currentTime >= PREVIEW_SECONDS && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
      setIsLoading(false);
    }
  }

  const buttonLabel = error
    ? 'Réessayer l’extrait'
    : isLoading
      ? 'Chargement de l’extrait…'
      : isPlaying
        ? 'Mettre l’extrait en pause'
        : progress >= 100
          ? `Réécouter l’extrait de ${PREVIEW_SECONDS} secondes`
          : `Écouter l’extrait de ${PREVIEW_SECONDS} secondes`;

  return (
    <div>
      <audio
        ref={audioRef}
        src={AUDIO_PROXY_URL}
        preload="none"
        controls={showNativeControls}
        tabIndex={showNativeControls ? 0 : -1}
        aria-hidden={!showNativeControls}
        className={showNativeControls ? 'mb-2 w-full max-w-[360px]' : 'hidden'}
        onTimeUpdate={stopAtPreviewEnd}
        onPlaying={() => {
          setIsPlaying(true);
          setIsLoading(false);
        }}
        onPause={() => {
          setIsPlaying(false);
          setIsLoading(false);
        }}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onEnded={() => {
          setIsPlaying(false);
          setIsLoading(false);
          setProgress(100);
        }}
        onError={() => {
          setIsPlaying(false);
          setIsLoading(false);
          setShowNativeControls(true);
          setError(true);
        }}
      />
      <button
        type="button"
        onClick={() => void togglePlayback()}
        aria-label={buttonLabel}
        aria-pressed={isPlaying}
        aria-busy={isLoading}
        className="relative isolate flex min-h-12 w-full max-w-[360px] items-center gap-3 overflow-hidden rounded-full border border-white/30 bg-white/10 px-4 py-2 text-left text-sm font-medium text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 -z-10 bg-[#2B2119]/40 transition-[width] duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        />
        <span
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center"
        >
          {isLoading ? (
            <svg
              className="size-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-90"
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          ) : isPlaying ? (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
              <path d="M7 5h4v14H7zM15 5h4v14h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
              <path d="M8 5.5a1 1 0 0 1 1.5-.86l10 6.5a1 1 0 0 1 0 1.72l-10 6.5A1 1 0 0 1 8 18.5z" />
            </svg>
          )}
        </span>
        <span className="min-w-0">{buttonLabel}</span>
      </button>
      {error ? (
        <p role="status" className="mt-2 text-sm text-white">
          Le lecteur simplifié n’a pas pu démarrer. Essaie avec les contrôles
          audio du navigateur ci-dessus.
        </p>
      ) : null}
    </div>
  );
}

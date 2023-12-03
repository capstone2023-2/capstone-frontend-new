"use client";

import { useRef } from "react";

export default function QuestionSpeaker({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="w(80) h(80) pack">
      <audio ref={audioRef} src={src} typeof="audio/mp3" preload="none"></audio>
      <button
        className="w(100%) h(100%) label text-large b(2/solid/--primary) c(--primary) r(50%) transtion(all=0.25s) hover:b(2/solid/--accent)+c(--accent)"
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.play();
          }
        }}
      >
        ▶️
      </button>
    </div>
  );
}

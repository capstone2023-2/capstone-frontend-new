"use client";

import { useRef, useEffect } from "react";

// 질문 음성을 재생하는 컴포넌트
export default function QuestionSpeaker({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src={src} typeof="audio/mp3" preload="none"></audio>
      <button
        className="w(50) h(50) label text-large b(2/solid/--primary) c(--primary) r(50%) transtion(all=0.25s) hover:b(2/solid/--accent)+c(--accent)"
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.play();
          }
        }}
      >
        ▶️
      </button>
    </>
  );
}

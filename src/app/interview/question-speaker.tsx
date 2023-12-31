"use client";

import { useRef, useEffect } from "react";

// 질문 음성을 재생하는 컴포넌트
export default function QuestionSpeaker({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // 페이지가 로딩되면 바로 음성을 재생합니다.
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <>
      <div className="vbox(center) gap(4)">
        <audio
          ref={audioRef}
          src={src}
          typeof="audio/mp3"
          preload="none"
        ></audio>
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
        <p className="paragraph text-small c(--primary) letter-spacing(-0.5px) user-select-none">
          질문 재생
        </p>
      </div>
    </>
  );
}

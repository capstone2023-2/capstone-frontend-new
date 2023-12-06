"use client";

import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { interviewProgressState } from "@/store";
import { QuestionSpeaker } from "..";

export default function Working({
  audioSrc,
  defaultTime = 90,
}: {
  audioSrc: string;
  defaultTime?: number;
}) {
  // 상태 관리
  const setInterviewProgress = useSetRecoilState(interviewProgressState);

  // 타이머
  const [time, setTime] = useState<number>(defaultTime);

  useEffect(() => {
    // 타이머를 설정합니다.
    const timerInterval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    // 타이머가 끝나면, 설정해둔 인터벌을 삭제한 후 모의 면접 단계를 "finishRecording"으로 변경합니다.
    if (time === 0) {
      clearInterval(timerInterval);
      setInterviewProgress({
        progress: "finishRecording",
      });
    }

    // 해당 컴포넌트가 모종의 이유로 Unmount될 때 설정되어 있는 인터벌을 삭제합니다.
    return () => {
      clearInterval(timerInterval);
    };
  });

  return (
    <div className="vbox(center) gap(24)">
      <QuestionSpeaker src={audioSrc} />
      <div className="vbox(center)">
        <p className="label text-xxl c(--primary) letter-spacing(-0.5px) user-select-none">
          {String(Math.floor(time / 60)).padStart(2, "0")}:
          {String(time % 60).padStart(2, "0")}
        </p>
        <button
          className="paragraph text-small c(--primary) letter-spacing(-0.5px) hover:c(--accent)"
          onClick={() =>
            setInterviewProgress({
              progress: "finishRecording",
            })
          }
        >
          종료
        </button>
      </div>
    </div>
  );
}

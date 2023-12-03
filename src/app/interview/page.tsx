"use client";

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/store";
import { getRandomQuestionFromRandomTopic, singleInterviewType } from "@/apis";
import { QuestionSpeaker, VideoRecorder } from ".";

export default function InterviewPage() {
  const accessTokenValue = useRecoilValue(accessTokenState);
  const [singleInterview, setSingleInterview] = useState<singleInterviewType>();

  // API를 통해 랜덤 질문을 가져옵니다.
  useEffect(() => {
    getRandomQuestionFromRandomTopic(accessTokenValue).then(
      singleInterviewObject => setSingleInterview(singleInterviewObject!)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <title>모의 면접 - CS-Essence</title>
      <div className="vbox(center) w(100%) gap(80)">
        <QuestionSpeaker src={singleInterview?.audio!} />
        <VideoRecorder showRealtime={false} />
      </div>
    </>
  );
}

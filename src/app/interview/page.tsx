"use client";

import { useEffect, useState} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getRandomQuestionFromRandomTopic, singleInterviewType } from "@/apis";
import { accessTokenState, interviewProgressState, recordedVideoUrlState } from "@/store";
import { VideoRecorder, Preparing, Ready, Working, RecordedVideo, Processing } from ".";

export default function InterviewPage() {
  // 상태 관리
  const accessTokenValue = useRecoilValue(accessTokenState);
  const [interviewProgress, setInterviewProgress] = useRecoilState(
    interviewProgressState
  );
  const [recordedVideoUrl, setRecordedVideoUrl] = useRecoilState(
    recordedVideoUrlState
  );

  const [singleInterview, setSingleInterview] = useState<singleInterviewType>(); // 랜덤 질문

  useEffect(() => {
    // 만약 녹화된 비디오가 초기화되지 않은 상태라면, 초기화시키면서 메모리 누수를 방지합니다.
    if (recordedVideoUrl.length != 0) {
      URL.revokeObjectURL(recordedVideoUrl);
      setRecordedVideoUrl("");
    }
    // 랜덤 질문과 오디오를 API 호출을 통해 가져옵니다.
    getRandomQuestionFromRandomTopic(accessTokenValue).then(
      (singleInterviewObject) => setSingleInterview(singleInterviewObject!)
    );
    // 모의 면접 단계를 Preparing으로 설정합니다.
    setInterviewProgress({
      progress: "preparing",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <title>모의 면접 - CS-Essence</title>
      <div className="vbox(center) w(100%) gap(24)">
        {
          {
            preparing: <VideoRecorder />,
            ready: <VideoRecorder />,
            working: <VideoRecorder muteVideo />,
            finishRecording: <VideoRecorder muteVideo />,
            processing: <RecordedVideo />,
            finished: <RecordedVideo />,
          }[interviewProgress.progress as string]
        }
        {
          {
            preparing: <Preparing />,
            ready: <Ready />,
            working: <Working audioSrc={singleInterview?.audio!} />,
            processing: <Processing question={singleInterview?.question!} answer={singleInterview?.answer!} />
          }[interviewProgress.progress as string]
        }
      </div>
    </>
  );
}

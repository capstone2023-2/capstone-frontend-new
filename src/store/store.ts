import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface accessTokenProps {
  accessToken: string;
  expireDate: number;
}

// 로그인 후 accessToken을 저장
export const accessTokenState = atom<accessTokenProps>({
  key: "accessTokenState",
  default: {
    accessToken: "",
    expireDate: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

/* 
모의 면접 단계는 다음과 같이 구성되어 있습니다:

1. Preparing
비디오 및 오디오 권한을 대기합니다.
- 실시간 비디오/오디오, 권한 관련 안내문

2. Ready
사용자가 모의 면접을 시작하는 걸 대기합니다.
- 실시간 비디오/오디오, 모의 면접 시작 버튼 및 안내문

3. Working
모의 면접 중입니다.
- 실시간 비디오 (Muted 속성으로 구현), 타이머 (기본 90초), 음성 재생 버튼, 모의 면접 조기 종료 버튼

4. finishRecording
타이머 인터럽트나 사용자의 입력에 의해 모의 면접이 끝난 후이며, 모의 면접이 완료된 후 녹화된 영상의 URL을 만들어냅니다.

4. Processing
녹화된 영상을 API에 보내 STT를 대기합니다.
- 녹화된 비디오, 질문 및 모범 답안

5. Finished
STT로 사용자가 대답한 내용을 받아온 상태입니다.
- 녹화된 비디오, 질문 및 모범 답안, 사용자가 대답한 내용
*/
export interface interviewProgressProps {
  progress: "preparing" | "ready" | "working" | "finishRecording" | "processing" | "finished"
}

// 모의 면접 단계를 저장
export const interviewProgressState = atom<interviewProgressProps>({
  key: "interviewProgressState",
  default: {
    progress: "preparing",
  },
})

// 녹화된 영상의 URL을 저장
export const recordedVideoUrlState = atom<string>({
  key: "recordedVideoUrlState",
  default: "",
})
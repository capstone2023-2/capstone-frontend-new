import { accessTokenProps } from "@/store";
import API_URL, { STT_API_URL } from ".";

export interface singleInterviewType {
  id: number;
  topic: string;
  question: string;
  answer: string;
  audio: string; 
}

// 모의 면접에 사용할 랜덤 질문 1개를 가져옵니다. 
export async function getRandomQuestionFromRandomTopic(
  accessTokenValue: accessTokenProps
) {
  if (accessTokenValue.expireDate > Date.now()) {
    console.log("Expired Access Token Detected! Please re-login!");
    return null;
  }

  const request = await fetch(`${API_URL}/interview`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessTokenValue.accessToken}`,
    },
  });

  if (request.status == 200) {
    const response = await request.json();
    return response as singleInterviewType;
  } else {
    return null;
  }
}

// 사용자가 작성한 답변을 MP4 파일 형태로 전송합니다.
export async function sendAnswerAndWaitSTT(answerFile: File) {
  const formData = new FormData();
  formData.append("file", answerFile);
  console.log(answerFile);

  const request = await fetch(`${STT_API_URL}/stt`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    body: formData,
  });

  console.log(request);
}
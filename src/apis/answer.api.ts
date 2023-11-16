import { accessTokenProps } from "@/store";
import API_URL from ".";

interface AnswerProps {
  topic: string;
  questionId: number;
  accessTokenValue: accessTokenProps;
}

interface WriteAnswerProps {
  answer: string;
  otherProps: AnswerProps;
}

export interface AnswerHistoryType {
  answer: string;
  createdAt: string;
}

export interface GetAnswerHistoryDataType {
  result: AnswerHistoryType[];
}

// 질문별 사용자 답변 히스토리를 조회
export async function getAnswerHistory({
  topic,
  questionId,
  accessTokenValue,
}: AnswerProps) {
  if (accessTokenValue.expireDate > Date.now()) {
    console.log("Expired Access Token Detected! Please re-login!");
    return null;
  }

  const request = await fetch(`${API_URL}/user-answer/${topic}/${questionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessTokenValue.accessToken}`,
    },
  });

  if (request.status == 200) {
    const response = await request.json();
    return { result: response } as GetAnswerHistoryDataType;
  } else {
    return null;
  }
}

// 질문에 답변을 추가
export async function writeAnswerToServer({
  answer,
  otherProps: { topic, questionId, accessTokenValue },
}: WriteAnswerProps) {
  if (accessTokenValue.expireDate > Date.now()) {
    console.log("Expired Access Token Detected! Please re-login!");
    return null;
  }

  const request = await fetch(`${API_URL}/user-answer/${topic}/${questionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessTokenValue.accessToken}`,
    },
    body: JSON.stringify({
      answer: answer,
    }),
  });

  if (request.status == 200) {
    const response = await request.json();
    return response as AnswerHistoryType;
  } else {
    return null;
  }
}

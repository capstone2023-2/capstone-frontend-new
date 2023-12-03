import { accessTokenProps } from "@/store";
import API_URL from ".";

export interface singleInterviewType {
  id: number;
  topic: string;
  question: string;
  answer: string;
  audio: string; 
}

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

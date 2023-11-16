import API_URL from ".";

// 토픽으로 링크될 수 있는 데이터
interface TopicLinkType {
  topic: string;
  uri: string;
}

// 모든 토픽을 가져옵니다.
export async function getTopics() {
  const request = await fetch(`${API_URL}/topics/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (request.status == 200) {
    const response = await request.json();
    return response as TopicLinkType[];
  } else {
    return null;
  }
}

// 토픽 내부 질문 하나의 데이터
interface QuestionDataType {
  id: number;
  topic: string;
  question: string;
  answer: string;
}

// 특정한 토픽의 정보를 가져옵니다.
export async function getTopic({ name }: { name: string }) {
  const request = await fetch(`${API_URL}/topics/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (request.status == 200) {
    const response = await request.json();
    return response as QuestionDataType[];
  } else {
    return null;
  }
}

import API_URL, { postDataType } from ".";


// 스레드 생성
interface addThreadInformationType {
  name: string;
  description: string;
  userToken: string;
}

interface addThreadDataType {
  author: string;
  collectionId: any[] | null;  // 임시
  description: string;
  name: string;
  posts: postDataType[];
  threadId: number;
}

// 포스트 정보 조회
interface addThreadFetchType {
  data: addThreadDataType;
  message: string;
  status: number;
}

export async function addThread({
  name,
  description,
  userToken,
}: addThreadInformationType) {
  const request = await fetch(`${API_URL}/threads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      name: name,
      description: description,
    }),
  });

  // Created: Status = 201
  if (request.status == 201) {
    const response = await request.json();
    const data = (response as addThreadFetchType).data;
    return data;
  } else {
    return null;
  }
}


// 모든 스레드 조회
interface getThreadDataType {
  author: string;
  collectionId: number | null;
  description: string;
  name: string;
  posts: postDataType[];  // ToDo: 없어도 될 것 같음
  threadId: number;
}

interface getAllThreadsFetchType {
  data: getThreadDataType[];
  message: string;
  status: number;
}

export async function getAllThreads() {
  const request = await fetch(`${API_URL}/threads`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (request.status == 200) {
    const response = await request.json();
    const data = (response as getAllThreadsFetchType).data;
    return data;
  } else {
    return null;
  }
}


// (특정) 스레드 조회
interface getThreadInformationType {
  id: number;
}

interface getThreadFetchType {
  data: getThreadDataType;
  message: string;
  status: number;
}

export async function getThread({ id }: getThreadInformationType) {
  const request = await fetch(`${API_URL}/threads/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (request.status == 200) {
    const response = await request.json();
    const data = (response as getThreadFetchType).data;
    return data;
  } else {
    return null;
  }
}

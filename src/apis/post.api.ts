import API_URL from ".";

// 포스트 타입
export interface postDataType {
  bookmarkCount: number | null;
  comments: any[]; // 임시
  content?: string;
  createdAt: string;
  postId: number;
  threadId: number;
  title: string;
  updatedAt: string;
  username: string;
  views: number;
  voteCount: number;
}

// 포스트 정보 조회
interface getPostFetchType {
  data: postDataType;
  message: string;
  status: number;
}

export async function getPost({ id }: { id: number }) {
  const request = await fetch(`${API_URL}/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (request.status == 200) {
    const response = await request.json();
    const data = (response as getPostFetchType).data;
    return data;
  } else {
    return null;
  }
}

// 특정 스레드의 모든 포스트 조회
interface getThreadPostsFetchType {
  data: postDataType[];
  message: string;
  status: number;
}

export async function getThreadPosts({ id }: { id: number }) {
  const request = await fetch(`${API_URL}/threads/${id}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (request.status == 200) {
    const response = await request.json();
    const data = (response as getThreadPostsFetchType).data;
    return data;
  } else {
    return null;
  }
}

// 특정 스레드에 포스트 추가
interface writePostToThreadInformationType {
  title: string;
  content: string;
  threadId: number;
  userToken: string;
}

interface writePostFetchType {
  data: postDataType;
  message: string;
  status: number;
}

export async function writePostToThread({
  title,
  content,
  threadId,
  userToken,
}: writePostToThreadInformationType) {
  const request = await fetch(`${API_URL}/threads/${threadId}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  // Created: Status = 201
  if (request.status == 201) {
    const response = await request.json();
    const data = (response as writePostFetchType).data;
    return data;
  } else {
    return null;
  }
}

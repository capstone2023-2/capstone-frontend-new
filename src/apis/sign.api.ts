import API_URL from ".";
import { accessTokenState } from "@/store";
import { useSetRecoilState, useRecoilValue } from "recoil";


// 로그인
interface signInInformationType {
  email: string;
  password: string;
}

export async function signIn({
  email,
  password,
}: signInInformationType): Promise<string | null> {
  const request = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  console.log(request);

  if (request.status == 200) {
    const response = await request.json();  
    return response;
  } else {
    return null;
  }
}

// 기존 로그인 방식 (Deprecated)
export async function signInOld({
  email,
  password,
}: signInInformationType): Promise<string | null> {
  const request = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (request.status == 200) {
    const response = await request.json();
    return response;
  } else {
    return null;
  }
}


// 회원가입
interface signUpInformationType {
  email: string;
  password: string;
  nickname: string;
}

export async function signUp({
  email,
  password,
  nickname,
}: signUpInformationType): Promise<boolean> {
  const request = await fetch(`${API_URL}/users/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password,
      username: nickname,
    }),
  });

  if (request.status == 200) {
    return true;
  } else {
    return false;
  }
}

import API_URL from ".";
import { setCookie } from ".";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { jwtDecode } from "jwt-decode";
import { accessTokenProps, accessTokenState } from "@/store";


// 로그인
interface SignInInformationType {
  email: string;
  password: string;
}

export async function signIn({
  email,
  password,
}: SignInInformationType): Promise<accessTokenProps | null> {
  const request = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    credentials: "include",
  });

  if (request.status == 200) {
    // 로그인에 성공하면 accessToken과 refreshToken을 JWT 형태로 전달받습니다.
    // refreshToken은 "" 형태로 전달되며, 쿠키에 저장합니다.
    const refreshTokenJWT = request.headers.get("Set-Cookie")?.substring(7);
    console.log(refreshTokenJWT);

    // accessToken은 "Bearer ..." 형태로 전달됩니다.
    const accessTokenJWT = request.headers.get("Authorization")?.substring(7);
    if (accessTokenJWT) {
      const accessTokenDecoded = jwtDecode(accessTokenJWT);
      const accessTokenData: accessTokenProps = {
        accessToken: accessTokenJWT,
        expireDate: accessTokenDecoded.exp!,
      }
      return accessTokenData;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

// 기존 로그인 방식 (Deprecated)
export async function signInOld({
  email,
  password,
}: SignInInformationType): Promise<string | null> {
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
  const request = await fetch(`${API_URL}/auth/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password,
      checkPassword: password,
      username: nickname,
    }),
  });

  if (request.status == 200 || request.status == 201) {
    return true;
  } else {
    return false;
  }
}

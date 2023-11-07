"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { signIn } from "@/apis";
import { accessTokenState } from "@/store";

// 로그인 에러 컴포넌트
function SignInError() {
  return (
    <div className="hbox(left) w(100%) bg(--negative) r(8) p(12/16) gap(4)">
      <span className="paragraph text-medium c(--white)">
        이메일과 비밀번호를 다시 확인해주세요.
      </span>
    </div>
  );
}

// 로그인
export default function SignInPage() {
  // 페이지 이동 및 쿼리 스트링
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectURL = searchParams.get("redirect") ?? "";

  // 액세스 토큰
  const setAccessToken = useSetRecoilState(accessTokenState);

  // 입력창
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFailed, setLoginFailed] = useState<boolean>(false);

  // 입력된 이메일을 변경합니다.
  function handleEmail(e: { target: any }) {
    setEmail(e.target.value);
  }

  // 입력된 비밀번호를 변경합니다.
  function handlePassword(e: { target: any }) {
    setPassword(e.target.value);
  }

  // 로그인을 진행합니다.
  async function handleSignInSubmit(e: FormEvent) {
    e.preventDefault();

    const data = await signIn({
      email: email,
      password: password,
    });

    // 로그인에 성공하면 메인 페이지로 돌아갑니다.
    // ToDo: Redirect URL이 지정되어 있다면 해당 URL로 이동합니다.
    if (data) {
      setAccessToken(data);
      if (redirectURL) {
        router.push(`${redirectURL}`);
      } else {
        router.push("/");
      }
    } else {
      setLoginFailed(true);
    }
  }

  return (
    <>
      <form
        className="vbox(right) w(500) py(120) mx(auto) gap(24) ~lg:w(~90vw)"
        method="post"
        onSubmit={handleSignInSubmit}
      >
        {loginFailed ? <SignInError /> : <></>}
        <div className="vbox w(100%) gap(4)">
          <label
            htmlFor="id"
            className="label text-medium c(--primary) user-select-none"
          >
            이메일
          </label>
          <input
            type="text"
            name="id"
            id="id"
            className="paragraph text-medium c(--black) b(1/solid/--primary) outline(none) r(4) p(4/12) nowrap... focus:b(1/solid/--accent)"
            value={email}
            onChange={handleEmail}
            autoFocus
          ></input>
        </div>
        <div className="vbox w(100%) gap(4)">
          <label
            htmlFor="password"
            className="label text-medium c(--primary) user-select-none"
          >
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="paragraph text-medium c(--black) b(1/solid/--primary) outline(none) r(4) p(4/12) nowrap... focus:b(1/solid/--accent)"
            value={password}
            onChange={handlePassword}
          ></input>
        </div>
        <div className="h(12)"></div>
        <div className="hbox w(100%) gap(auto)">
          <div className="hbox gap(8) user-select-none">
            <span className="paragraph text-medium c(--primary)">
              계정이 없다면?
            </span>
            <Link
              href="/sign-up"
              className="label text-medium c(--primary) pointer"
            >
              회원가입
            </Link>
          </div>
          <button className="w(100) label text-medium c(--primary) b(1/solid/--primary) r(8) p(4/12)">
            로그인
          </button>
        </div>
      </form>
    </>
  );
}

SignInPage.displayName = "Sign";

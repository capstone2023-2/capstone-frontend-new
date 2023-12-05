"use client";

import Link from "next/link";

export default function SignUpSuccess() {
  return (
    <>
      <title>회원가입 완료 - CS-Essence</title>
      <div className="vbox(left) w(450) py(40) mx(auto) gap(20) ~lg:w(~90vw)">
        <p className="label text-large c(--primary)">
          회원가입이 완료되었습니다.
        </p>
        <Link
          href="/sign-in"
          className="paragraph text-medium c(--content-secondary) px(8) hover:underline"
        >
          로그인 화면으로 이동하기
        </Link>
      </div>
    </>
  );
}

SignUpSuccess.displayName = "Sign";

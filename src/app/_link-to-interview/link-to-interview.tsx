"use client";

import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/store";

// 모의 면접 페이지 혹은 로그인 페이지로 연결
export default function LinkToInterview() {
  const router = useRouter();
  const accessTokenValue = useRecoilValue(accessTokenState);

  return (
    <div className="vbox(center) relative w(100%) gap(4)">
      <p className="label text-xl text-center c(--primary) user-select-none">
        모의 면접을 해볼 수 있어요!
      </p>
      <p
        onClick={() => {
          if (accessTokenValue.accessToken) {
            router.push("/interview");
          } else {
            router.push("/sign-in");
          }
        }}
        className="paragraph text-medium c(--primary) pointer hover:c(--accent)"
      >
        ▶️ 여기서 지금 바로 체험해보기
      </p>
    </div>
  );
}

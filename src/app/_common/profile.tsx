import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/store";

// 프로필
export default function Profile() {
  // URL 설정
  const router = useRouter();
  const pathname = usePathname();

  // 액세스 토큰
  const accessTokenData = useRecoilValue(accessTokenState);

  // 디자인
  const [profileHover, setProfileHover] = useState<boolean>(false);

  // 프로필 클릭
  function handleProfileClick() {
    if (accessTokenData.accessToken) {
      // 로그인된 상태면 모달을 보여줍니다.
      console.log(accessTokenData.accessToken);
    } else {
      handleGotoSignIn();
    }
  }

  // 프로필 클릭 - 로그인 화면으로 이동
  function handleGotoSignIn() {
    if (pathname == "/") {
      router.push("/sign-in");
    } else {
      router.push(`/sign-in?redirect=${pathname}`);
    }
  }

  return (
    <button
      className={`user-select-none filter-primary ${
        profileHover ? "filter-accent" : ""
      }`}
      onClick={handleProfileClick}
      onMouseOver={() => setProfileHover(true)}
      onMouseOut={() => setProfileHover(false)}
    >
      <Image
        src={"/images/icons/png/Person.png"}
        alt="Person Icon"
        width={30}
        height={30}
      />
    </button>
  );
}

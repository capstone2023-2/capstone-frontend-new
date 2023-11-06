import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Header = React.memo(() => {
  // 라이트, 다크 모드 전환 (참고 사이트: https://velog.io/@yijaee/다크모드-구현하기)
  const [darkMode, setDarkMode] = React.useState(false);

  // 사용자가 마지막으로 사용했던 테마와 OS 테마를 확인하고,
  // 사용자가 웹에 처음 접근해 localStorage에 아무런 정보가 없다면 OS 테마를 사용하며,
  // 사용자가 기존에 접근해 정보가 남아있다면 사용자가 마지막으로 사용했던 테마를 그대로 사용합니다.

  // 라이트, 다크 모드 초기 상태 설정
  useEffect(() => {
    const isUserColorTheme = localStorage.getItem("data-color-mode");
    const isOsColorTheme = window.matchMedia("(prefers-color-scheme: dark")
      .matches
      ? "dark"
      : "light";

    const getUserTheme = () =>
      isUserColorTheme ? isUserColorTheme : isOsColorTheme;

    if (getUserTheme() === "dark") {
      localStorage.setItem("data-color-mode", "dark");
      document.documentElement.setAttribute("data-color-mode", "dark");
      setDarkMode(true);
    } else {
      localStorage.setItem("data-color-mode", "light");
      document.documentElement.setAttribute("data-color-mode", "light");
      setDarkMode(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 라이트, 다크 모드 전환 및 저장
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);

    if (checked) {
      localStorage.setItem("data-color-mode", "dark");
      document.documentElement.setAttribute("data-color-mode", "dark");
    } else {
      localStorage.setItem("data-color-mode", "light");
      document.documentElement.setAttribute("data-color-mode", "light");
    }
  };

  // 프로필
  // URL 설정
  const router = useRouter();

  // 우측 상단 프로필 색 변화를 위한 State
  const [profileHover, setProfileHover] = useState<boolean>(false);

  // 프로필 클릭 처리 (임시)
  function handleProfileClick() {
    router.push("/sign-in");
  }

  return (
    <header className="hbox items-center h(100) z(99) gap(auto)">
      <nav>
        <Link
          href="/"
          className="group label text-xxl c(--primary) hover:c(--accent) transition(color=.35s)"
        >
          <span>C</span>
          <span className="c(--accent) group-hover:c(--primary) transition(color=.35s)">S</span>
          <span>tation</span>
        </Link>
      </nav>
      <div className="hbox gap(20)">
        <div className="relative pack w(45) h(45) r(100%) z(100)">
          <div className="layer translateX(7.5px) translateY(7.5px)">
            <DarkModeSwitch
              className="mb(2rem) z(101)"
              checked={darkMode}
              onChange={toggleDarkMode}
              size={30}
            />
          </div>
        </div>
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
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;

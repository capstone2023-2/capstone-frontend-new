"use client";

import React, { useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

// 라이트, 다크 모드 전환 (참고 사이트: https://velog.io/@yijaee/다크모드-구현하기)
export default function ModeSwitch() {
  // 상태 관리
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

  return (
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
  );
};

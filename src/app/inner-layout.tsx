import React from "react";
import { Inter } from "next/font/google";
import { Header } from "./_common";
import "adorable-css";
import "./globals.scss";
import "./fonts.scss";

const inter = Inter({ subsets: ["latin"] });

// RecoilRoot 안에 RecoilValue를 쓰기 위해 Layout을 중첩식으로 변경
export default function RootInnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="relative hbox justify-center items-start w(100%) h(100%~) bg(--secondary) transition(background-color=.35s)">
          <div className="vbox relative gap(40)">
            <Header />
            <div className="vbox(center) relative w(828) mx(auto) pb(120) gap(32) ~lg:w(~90vw)">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

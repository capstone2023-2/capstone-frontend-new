import React from "react";
import { Inter } from "next/font/google";
import RecoilLayout from "./recoil-layout";
import { Header } from "./_common";
import "./globals.scss";
import "./fonts.scss";

const inter = Inter({ subsets: ["latin"] });

// SSR인 Next.js와 Client를 사용하는 Recoil을 동시에 사용하기 위해 중첩 Layout 구조로 변경
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <RecoilLayout>
          <div className="relative hbox justify-center items-start w(100%) h(100%~) bg(--secondary) transition(background-color=.35s)">
            <div className="vbox relative gap(40)">
              <Header />
              <div className="vbox(center) relative w(828) mx(auto) pb(120) gap(32) ~lg:w(~90vw)">
                {children}
              </div>
            </div>
          </div>
        </RecoilLayout>
      </body>
    </html>
  );
}

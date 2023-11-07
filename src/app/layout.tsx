"use client";

import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import RootInnerLayout from "./inner-layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <CookiesProvider>
        <RootInnerLayout>{children}</RootInnerLayout>
      </CookiesProvider>
    </RecoilRoot>
  );
}

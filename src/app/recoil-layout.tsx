"use client";

import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import "adorable-css";

export default function RecoilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <CookiesProvider>{children}</CookiesProvider>
    </RecoilRoot>
  );
}

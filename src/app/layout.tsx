"use client";

import { RecoilRoot } from "recoil";
import RootInnerLayout from "./inner-layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <RootInnerLayout>{children}</RootInnerLayout>
    </RecoilRoot>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Kit Lab | 오수민",
  description: "포트폴리오 무드를 직접 조합하고 CSS 변수로 복사하세요.",
};

export default function BrandKitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

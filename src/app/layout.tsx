import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dozy.kr"),
  title: {
    default: "Dozy Coffee",
    template: "%s | Dozy Coffee",
  },
  description: "Dozy Coffee 공식 홈페이지",
  openGraph: {
    siteName: "Dozy Coffee",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

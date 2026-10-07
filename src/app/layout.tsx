import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SameHashScroll } from "@/components/SameHashScroll";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/content/site";
import { resolveAsset } from "@/lib/assets";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

// 파일이 없으면 존재하지 않는 주소를 metadata에 넣지 않는다 (docs/seo.md).
const shareImage = resolveAsset(siteConfig.shareImage);
const favicon = resolveAsset(siteConfig.favicon);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "ko_KR",
    type: "website",
    ...(shareImage && {
      images: [{ url: shareImage, width: 1200, height: 630, alt: SITE_NAME }],
    }),
  },
  twitter: {
    card: shareImage ? "summary_large_image" : "summary",
  },
  ...(favicon && { icons: { icon: favicon } }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" data-scroll-behavior="smooth" className="antialiased">
      <body className="flex min-h-svh flex-col">
        <SiteHeader logoSrc={resolveAsset(siteConfig.logo)} />
        {children}
        <SiteFooter />
        <SameHashScroll />
      </body>
    </html>
  );
}

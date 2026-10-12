import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 기본 75는 큰 광고 이미지에서 뭉개져 보여 90을 추가한다. 쓰는 곳에서 quality로 고른다.
  images: { qualities: [75, 90] },
  // 리다이렉트 목록과 이유는 docs/seo.md가 기준이다.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "dozy.kr" }],
        destination: "https://www.dozy.kr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

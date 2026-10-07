import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

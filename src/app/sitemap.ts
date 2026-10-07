import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// docs/pages/README.md 사이트맵에서 sitemap에 넣기로 한 페이지만 둔다 (docs/seo.md).
const paths = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: new URL(path, SITE_URL).toString() }));
}

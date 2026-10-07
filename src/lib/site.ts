// 사이트 전체에서 쓰는 기준 값. 규칙은 docs/seo.md, docs/configuration.md가 기준이다.

import { siteConfig } from "@/content/site";

export const SITE_NAME = siteConfig.brandName;
export const SITE_TITLE = `${siteConfig.brandName} | ${siteConfig.brandNameKo}`;
export const SITE_URL = "https://www.dozy.kr";
export const SITE_DESCRIPTION =
  "커피 한 잔, 잠깐 느려지는 시간. Dozy Coffee의 메뉴와 매장, 새로운 소식을 만나보세요.";

/** 검색 엔진 색인은 운영 배포에서만 허용한다. 값이 없으면 막는다. */
export const isIndexable = process.env.SITE_ENV === "production";

/** 화면 확인용 예시 데이터. 명시적으로 켰을 때만 쓰고, 운영 배포에서는 항상 끈다. */
export const showDemoData =
  process.env.SITE_ENV !== "production" && process.env.SHOW_DEMO_DATA === "true";

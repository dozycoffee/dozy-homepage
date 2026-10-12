// 매장·소식 데이터를 고른다. 운영은 src/content/, 예시는 src/mocks/ (docs/configuration.md).
// 메뉴의 브라우저 조회는 menu-client.ts가 맡는다.
// 데이터 출처(CMS, API)가 정해지면 이 함수들만 바꾼다.

import { newsItems } from "@/content/news";
import { stores } from "@/content/stores";
import { demoNewsItems } from "@/mocks/news";
import { demoStores } from "@/mocks/stores";
import { showDemoData } from "./site";

export const getStores = () => (showDemoData ? demoStores : stores);

/** 최신순 */
export const getNewsItems = () =>
  [...(showDemoData ? demoNewsItems : newsItems)].sort((a, b) => b.date.localeCompare(a.date));

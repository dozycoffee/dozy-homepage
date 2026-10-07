// 화면에 쓰는 데이터를 고른다. 운영은 src/content/, 예시 데이터를 켜면 src/mocks/ (매장, 소식. docs/configuration.md).
// 데이터 출처(CMS, API)가 정해지면 이 함수들만 바꾼다.

import { menuItems } from "@/content/menu";
import { newsItems } from "@/content/news";
import { stores } from "@/content/stores";
import { demoNewsItems } from "@/mocks/news";
import { demoStores } from "@/mocks/stores";
import { showDemoData } from "./site";

/** 메뉴는 임시 메뉴를 운영 화면에도 보여 준다 (docs/pages/home.md). */
export const getMenuItems = () => menuItems;

export const getStores = () => (showDemoData ? demoStores : stores);

/** 최신순 */
export const getNewsItems = () =>
  [...(showDemoData ? demoNewsItems : newsItems)].sort((a, b) => b.date.localeCompare(a.date));

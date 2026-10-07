// 공개용 소식 데이터. 실제로 게시한 소식만 넣는다.
// 화면 확인용 예시는 src/mocks/news.ts에 있고 운영 화면에는 나오지 않는다 (docs/configuration.md SHOW_DEMO_DATA).

import type { NewsItem } from "./types";

export const newsItems: NewsItem[] = [];

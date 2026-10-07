// 화면 확인용 예시 소식. 실제 소식이 아니다. 운영 화면에는 나오지 않는다 (src/lib/content.ts).

import { imageSlot } from "@/content/image-slot";
import type { NewsItem } from "@/content/types";

export const demoNewsItems: NewsItem[] = [
  {
    id: "demo-news-1",
    category: "신메뉴",
    title: "예시 신메뉴 소식 제목",
    date: "2026-10-01",
    image: imageSlot("news-seasonal.webp", ""),
  },
  {
    id: "demo-news-2",
    category: "이벤트",
    title: "예시 이벤트 소식 제목",
    date: "2026-09-20",
    image: imageSlot("news-event.webp", ""),
  },
  {
    id: "demo-news-3",
    category: "신규 매장",
    title: "예시 신규 매장 소식 제목",
    date: "2026-09-05",
    image: imageSlot("news-store-opening.webp", ""),
  },
  {
    id: "demo-news-4",
    category: "이벤트",
    title: "최신 3개에 들지 않아 보이지 않는 예시",
    date: "2026-08-01",
  },
];

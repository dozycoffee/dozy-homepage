// 화면 확인용 예시 매장. 실제 매장이 아니다. 운영 화면에는 나오지 않는다 (src/lib/content.ts).

import type { Store } from "@/content/types";

export const demoStores: Store[] = [
  {
    id: "demo-store-1",
    name: "예시 매장 1",
    region: "서울",
    address: "서울특별시 예시구 예시로 1",
    hours: "영업시간 예시",
  },
  {
    id: "demo-store-2",
    name: "예시 매장 2",
    region: "서울",
    address: "서울특별시 예시구 예시로 2",
    hours: "영업시간 예시",
    mapUrl: "https://map.example.com/",
  },
  {
    id: "demo-store-3",
    name: "예시 매장 3",
    region: "부산",
    address: "부산광역시 예시구 예시로 3",
    hours: "영업시간 예시",
  },
];

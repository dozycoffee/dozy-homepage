// 메뉴 데이터. 지금은 시안 이미지에 맞춘 임시 메뉴다 (2026-10-07 결정, docs/pages/home.md).
// 판매 메뉴가 확정되면 이 목록을 실제 메뉴명·설명·가격으로 바꾼다. 가격은 확정 전까지 넣지 않는다.

import { imageSlot } from "./image-slot";
import type { MenuItem } from "./types";

export const menuItems: MenuItem[] = [
  {
    id: "iced-americano",
    category: "coffee",
    name: "아이스 아메리카노",
    description: "얼음 위에 에스프레소를 더한 깔끔한 한 잔.",
    image: imageSlot("menu-americano.webp", "얼음이 담긴 아이스 아메리카노"),
  },
  {
    id: "iced-latte",
    category: "coffee",
    name: "아이스 라테",
    description: "에스프레소와 우유가 부드럽게 어우러진 라테.",
    image: imageSlot("menu-cafe-latte.webp", "우유와 에스프레소가 층을 이룬 아이스 라테"),
  },
  {
    id: "cream-latte",
    category: "signature",
    name: "크림 라테",
    description: "고소한 크림을 올려 천천히 즐기는 시그니처 라테.",
    image: imageSlot("menu-signature.webp", "크림을 올린 크림 라테"),
  },
  {
    id: "matcha-latte",
    category: "non-coffee",
    name: "말차 라테",
    description: "말차의 쌉싸름함과 우유의 부드러움을 함께.",
    image: imageSlot("menu-non-coffee.webp", "초록빛 말차와 우유가 담긴 아이스 말차 라테"),
  },
  {
    id: "financier",
    category: "dessert",
    name: "휘낭시에",
    description: "버터 향이 진한 한입 크기의 구움과자.",
    image: imageSlot("menu-dessert.webp", "접시에 놓인 휘낭시에 세 개"),
  },
];

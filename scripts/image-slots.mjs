// 이미지 자리 목록: 공개 파일명과 권장 크기. docs/design-system.md의 "이미지" 표와 같게 유지한다.
// width·height가 있는 자리는 그 크기에 맞춰 줄이고, 없는 자리(벡터, 아이콘)는 그대로 복사한다.

/** @typedef {{ file: string, width?: number, height?: number }} ImageSlot */

/** @type {ImageSlot[]} */
export const imageSlots = [
  { file: "logo-dozy-bean.svg" },
  { file: "favicon.ico" },
  { file: "hero-coffee-desktop.webp", width: 2400, height: 1000 },
  { file: "hero-coffee-mobile.webp", width: 1080, height: 1080 },
  { file: "menu-americano.webp", width: 1000, height: 1000 },
  { file: "menu-cafe-latte.webp", width: 1000, height: 1000 },
  { file: "menu-signature.webp", width: 1000, height: 1000 },
  { file: "menu-non-coffee.webp", width: 1000, height: 1000 },
  { file: "menu-dessert.webp", width: 1000, height: 1000 },
  { file: "dozy-order-coming-soon.webp", width: 1200, height: 1000 },
  { file: "brand-store-interior.webp", width: 2000, height: 1000 },
  { file: "store-default.webp", width: 1200, height: 900 },
  { file: "news-seasonal.webp", width: 1200, height: 900 },
  { file: "news-event.webp", width: 1200, height: 900 },
  { file: "news-store-opening.webp", width: 1200, height: 900 },
  { file: "franchise-storefront.webp", width: 1600, height: 1200 },
  { file: "og-dozy-coffee.jpg", width: 1200, height: 630 },
];

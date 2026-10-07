// 메인 페이지 문구와 이미지 자리. 문구는 docs/pages/home.md가 기준이다.

import { imageSlot as image } from "./image-slot";
import type { MenuCategory } from "./types";

export const hero = {
  eyebrow: "DOZY COFFEE",
  /** 줄마다 끊어서 보여 준다 */
  titleLines: ["커피 한 잔,", "잠깐 느려지는 시간."],
  description: "당신의 일상에 편안한 한 잔을 더합니다.",
  primaryCta: { label: "메뉴 보기", href: "/#menu" },
  secondaryCta: { label: "가까운 매장 찾기", href: "/#stores" },
  /** 화면 전체에 깔 때 왼쪽은 글 자리라 음료가 오른쪽에 오게 맞춘다 */
  desktopImage: image("hero-coffee-desktop.webp", "Dozy Coffee의 커피 한 잔", "72% center"),
  /** 없으면 데스크톱 이미지를 쓴다 */
  mobileImage: image("hero-coffee-mobile.webp", "Dozy Coffee의 커피 한 잔", "center"),
  /** 모바일 이미지가 없어 데스크톱 이미지를 정사각형으로 자를 때의 위치 */
  desktopImageMobilePosition: "75% center",
};

export const menuSection = {
  title: "오늘은 어떤 한 잔이 좋으세요?",
  description: "커피부터 달콤한 디저트까지, Dozy의 메뉴를 만나보세요.",
  categories: [
    { id: "coffee", label: "커피" },
    { id: "signature", label: "시그니처" },
    { id: "non-coffee", label: "논커피" },
    { id: "dessert", label: "디저트" },
  ] satisfies MenuCategory[],
  /** 처음 선택된 카테고리 */
  initialCategory: "coffee",
  tabsLabel: "메뉴 카테고리",
  emptyMessage: "메뉴 정보를 준비하고 있습니다.",
} as const;

export const orderAppSection = {
  status: "COMING SOON",
  serviceName: "Dozy Order",
  title: "Dozy를 만나는 더 간편한 방법.",
  description:
    "모바일 주문 앱, Dozy Order를 준비하고 있습니다. 출시 소식과 이용 방법은 이곳에서 안내해 드릴게요.",
  image: image("dozy-order-coming-soon.webp", "스마트폰과 Dozy Coffee 커피 한 잔"),
};

export const brandSection = {
  eyebrow: "A MOMENT AT DOZY",
  title: "밝고 편안한 공간, 당신의 속도로.",
  description: "따뜻한 커피와 정돈된 공간에서 잠깐의 여유를 만나보세요.",
  image: image(
    "brand-store-interior.webp",
    "크림색 인테리어와 캐러멜색 벤치가 놓인 Dozy Coffee 매장",
  ),
};

export const storesSection = {
  title: "가까운 Dozy를 찾아보세요.",
  searchLabel: "지역 또는 매장명",
  searchButton: "매장 검색",
  /** {count}에 결과 수가 들어간다 */
  resultCount: "매장 {count}곳",
  noResultsMessage: "검색 조건에 맞는 매장이 없습니다.",
  emptyMessage: "매장 정보를 준비하고 있습니다.",
  detailLabel: "매장 상세",
  mapLabel: "지도 보기",
  /** 개별 사진이 없는 매장에 쓰는 이미지. 장식용이라 대체 텍스트를 비운다 */
  defaultImage: image("store-default.webp", ""),
};

export const newsSection = {
  title: "Dozy의 새로운 소식",
  /** 최신순으로 이 개수만 보여 준다 */
  limit: 3,
  emptyMessage: "새로운 소식을 준비하고 있습니다.",
};

export const franchiseSection = {
  title: "Dozy Coffee와 함께할 다음 공간.",
  description: "브랜드와 매장 개설에 관한 안내를 만나보세요.",
  ctaLabel: "가맹 안내 보기",
  /** 가맹 안내 주소(siteConfig.links.franchise)가 없을 때 버튼 대신 보여 준다 */
  pendingLabel: "가맹 안내 준비 중",
  image: image("franchise-storefront.webp", "Dozy Coffee 매장 외관"),
};

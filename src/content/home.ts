// 메인 페이지 문구와 이미지 자리. 문구는 docs/pages/home.md가 기준이다.

import { imageSlot as image } from "./image-slot";

export const hero = {
  eyebrow: "DOZY COFFEE",
  /** 줄마다 끊어서 보여 준다 */
  titleLines: ["커피 한 잔,", "잠깐 느려지는 시간."],
  description: "당신의 일상에 편안한 한 잔을 더합니다.",
  primaryCta: { label: "메뉴 보기", href: "/menu" },
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
  allMenusLink: { label: "전체 메뉴 보기", href: "/menu" },
  /** 시그니처 3종을 한 장에 담은 광고. 문구는 이미지 안에 있다 */
  signaturesImage: image("three-signatures-menu.webp", "Dozy 시그니처 3종. 도지 흑임자 크림커피, 도지 누룽지 크림라떼, 도지 유자말차 에이드. 전체 메뉴 보기."),
  carouselLabel: "Dozy 대표 메뉴 광고",
  carouselRole: "캐러셀",
  slideRole: "슬라이드",
  paginationLabel: "광고 선택",
  goToLabel: "{name} 광고 보기",
  pauseLabel: "일시정지",
  playLabel: "자동 재생",
  motionOffLabel: "자동 전환 꺼짐",
  intervalMs: 8000,
  ads: [
    {
      name: "도지 누룽지 크림라떼",
      alt: "깊은 고소함. 부드러운 여운. 도지 누룽지 크림라떼. 크림과 커피를 크게 보여주는 광고. 전체 메뉴 보기.",
      desktopSrc: "/assets/images/menu-ad-nurungji-desktop-wide.webp",
      mobileSrc: "/assets/images/menu-ad-nurungji-mobile.webp",
    },
    {
      name: "도지 흑임자 크림커피",
      alt: "짙은 풍미. 고소한 여운. 도지 흑임자 크림커피. 흑임자 크림을 위에서 보여주는 광고. 전체 메뉴 보기.",
      desktopSrc: "/assets/images/menu-ad-black-sesame-desktop-wide.webp",
      mobileSrc: "/assets/images/menu-ad-black-sesame-mobile.webp",
    },
    {
      name: "도지 유자말차 에이드",
      alt: "산뜻한 유자. 깊은 말차. 도지 유자말차 에이드. 햇빛 아래 잔과 유자를 보여주는 광고. 전체 메뉴 보기.",
      desktopSrc: "/assets/images/menu-ad-yuja-matcha-desktop-wide.webp",
      mobileSrc: "/assets/images/menu-ad-yuja-matcha-mobile.webp",
    },
  ],
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
  eyebrow: "A SPACE NEAR YOU",
  title: "가까운 Dozy를 찾아보세요.",
  description: "일상 가까이에서 만나는, 밝고 편안한 공간.",
  images: [
    image("store-showcase-city.webp", "큰 창과 원목 공용 테이블이 있는 가상 도심 Dozy 매장 내부"),
    image("store-showcase-neighborhood.webp", "크림색 외벽과 원목 입구, 넓은 유리창이 있는 세련된 가상 동네 Dozy 매장 외관", "60% center"),
    image("store-showcase-campus.webp", "곡선형 커피 바와 창가 좌석이 있는 가상 대학가 Dozy 매장 내부", "center 45%"),
  ],
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

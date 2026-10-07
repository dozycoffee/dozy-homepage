// 화면 데이터의 형태. 필드 규칙은 docs/pages/home.md의 "데이터"가 기준이다.

/** 이미지 자리. `src`는 `/assets/images/` 아래 공개 경로. 파일이 없으면 배경색 자리만 보인다. */
export type ImageSlot = {
  src: string;
  /** 대체 텍스트. 장식 이미지는 빈 문자열. */
  alt: string;
  /** CSS `object-position` 값. 비우면 가운데. */
  position?: string;
};

export type MenuCategoryId = "coffee" | "signature" | "non-coffee" | "dessert";

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
};

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  image?: ImageSlot;
  /** 원 단위. 실제 가격이 있을 때만 넣는다. */
  price?: number;
  /** 메뉴 상세 주소. 있을 때만 카드가 링크가 된다. */
  detailUrl?: string;
};

export type Store = {
  id: string;
  name: string;
  /** 검색에 쓰는 지역명 (예: 서울 강남구) */
  region: string;
  address: string;
  /** 영업시간 표기 (예: 매일 08:00–22:00) */
  hours: string;
  /** 비우면 기본 매장 이미지 */
  image?: ImageSlot;
  detailUrl?: string;
  mapUrl?: string;
};

export type NewsCategory = "신메뉴" | "이벤트" | "신규 매장";

export type NewsItem = {
  id: string;
  category: NewsCategory;
  title: string;
  /** 게시일 YYYY-MM-DD (한국 시간) */
  date: string;
  image?: ImageSlot;
  /** 게시물 상세 주소. 있을 때만 카드가 링크가 된다. */
  url?: string;
};

export type LabeledValue = {
  label: string;
  /** 값이 없으면(null) 화면에서 뺀다. */
  value: string | null;
};

export type SocialLink = {
  label: string;
  url: string;
};

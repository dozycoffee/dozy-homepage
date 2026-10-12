// 화면 데이터의 형태. 매장은 docs/pages/stores.md, 그 밖은 docs/pages/home.md의 데이터 규칙이 기준이다.

/** 이미지 자리. `src`는 `/assets/images/` 아래 공개 경로. 파일이 없으면 배경색 자리만 보인다. */
export type ImageSlot = {
  src: string;
  /** 대체 텍스트. 장식 이미지는 빈 문자열. */
  alt: string;
  /** CSS `object-position` 값. 비우면 가운데. */
  position?: string;
};

export type MenuCategory = {
  name: string;
  children: string[];
};

export type MenuOptionGroup = {
  name: string;
  selectionType: "SINGLE" | "MULTI";
  required: boolean;
  options: { optionKey: string; name: string; price: number }[];
};

export type MenuProduct = {
  name: string;
  category: string;
  basePrice: number;
  tracksInventory: boolean;
  description: string | null;
  imageUrl: string | null;
  tagNames: ("신메뉴" | "베스트" | "시즌한정" | "추천" | "시그니처")[];
  groups: string[];
  optionGroups: string[];
};

export type MenuCatalog = {
  categories: MenuCategory[];
  optionGroups: MenuOptionGroup[];
  productGroups: string[];
  products: MenuProduct[];
};

export type Store = {
  name: string;
  address: {
    roadAddress: string;
    detailAddress: string | null;
    postalCode: string;
    sido: string;
    sigungu: string;
  };
  phone: string;
  openingDate: string;
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

// 헤더 메뉴의 기준 목록. 메인 섹션 ID는 docs/pages/home.md가 기준이다.
// 다른 페이지(404 등)에서도 메인의 해당 섹션으로 가도록 `/#id`로 쓴다.

export type NavItem = {
  href: string;
  label: string;
};

export const homeHref = "/#home";

export const headerNav: NavItem[] = [
  { href: "/#brand", label: "브랜드" },
  { href: "/#menu", label: "메뉴" },
  { href: "/#order-app", label: "오더앱" },
  { href: "/#stores", label: "매장 찾기" },
  { href: "/#news", label: "소식" },
];

/** 헤더의 강조 버튼 */
export const headerCta: NavItem = { href: "/#franchise", label: "가맹 안내" };

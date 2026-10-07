// 사이트 설정: 브랜드명, 회사 정보, 문의처, 외부 링크.
// 실제로 받은 값만 넣는다. 값이 없으면 null(또는 빈 배열)로 두면 화면에서 빠진다 (docs/pages/layout.md).

import type { LabeledValue, SocialLink } from "./types";

export const siteConfig = {
  brandName: "Dozy Coffee",
  brandNameKo: "도지커피",
  logo: "/assets/images/logo-dozy-bean.svg",
  favicon: "/assets/images/favicon.ico",
  shareImage: "/assets/images/og-dozy-coffee.jpg",

  /** 사업자 정보. 푸터에 순서대로 표시 */
  company: [
    { label: "상호", value: null },
    { label: "대표자", value: null },
    { label: "사업자등록번호", value: null },
    { label: "통신판매업 신고번호", value: null },
    { label: "주소", value: null },
  ] satisfies LabeledValue[],

  /** 고객 문의처 */
  contact: [
    { label: "고객센터", value: null },
    { label: "이메일", value: null },
  ] satisfies LabeledValue[],

  links: {
    /** 가맹 안내 페이지. 없으면 가맹 섹션에 "가맹 안내 준비 중"을 표시 */
    franchise: null as string | null,
    terms: null as string | null,
    privacy: null as string | null,
  },

  /** 공식 SNS. 실제 계정 주소만 넣는다 */
  social: [] as SocialLink[],
};

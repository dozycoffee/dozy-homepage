# 공통 레이아웃

모든 페이지에 들어가는 요소입니다. 페이지 문서에서는 다시 쓰지 않습니다.

- 구현 위치(배치): `src/app/layout.tsx`가 모든 페이지에 헤더와 푸터를 넣습니다.

## 헤더

- 구현 위치: `src/components/SiteHeader.tsx`, 메뉴 목록은 `src/lib/navigation.ts`
- 상태: 구현됨

| 항목 | 내용 |
|---|---|
| 로고 | 커피콩 심볼 + `Dozy Coffee` (→ `/#home`, 페이지 맨 위). 심볼 파일이 없으면 글자만 ([design-system.md](../design-system.md#로고)) |
| 메뉴 | 브랜드(`/#brand`) · 메뉴(`/#menu`) · 오더앱(`/#order-app`) · 매장 찾기(`/#stores`) · 소식(`/#news`) |
| 강조 링크 | 가맹 안내(`/#franchise`). 메뉴 오른쪽 짧은 `espresso` 세로 구분선(|) 뒤 굵은 글자 + 바로가기 아이콘 ([design-system.md](../design-system.md#행동-링크-탭-입력-초점)) |
| 고정 | `sticky`로 상단 고정. 메인 히어로는 헤더 뒤까지 올라가 헤더가 그 위에 겹침. 배경 `warm-white` 85% + 배경 흐림으로 살짝 비침(모바일 메뉴 목록은 불투명), 아래 `oat` 1px 선(그림자로 그려 높이에 영향 없음). 앵커 이동 시 `scroll-padding-top`으로 섹션 제목이 가리지 않음 |
| 크기 | 높이 72px, 모바일 64px. 좌우는 정렬선 ([design-system.md](../design-system.md#레이아웃)) |
| 모바일 (`md` 미만) | 로고와 메뉴 열기 버튼(44px)만. 버튼은 `aria-expanded`, `aria-controls`, "메뉴 열기/닫기" 이름을 가짐. 목록은 헤더 바로 아래 전체 폭, 항목 높이 56px·20px 굵은 글자, 맨 아래 구분선 뒤 가맹 안내 링크(바로가기 아이콘) |
| 모바일 메뉴 닫기 | 항목 선택, 같은 버튼(X, "메뉴 닫기"), `Esc`. 닫으면 초점을 메뉴 열기 버튼으로 되돌림 |

- 메뉴는 다른 페이지(404 등)에서도 메인의 해당 섹션으로 가도록 `/#id`로 씁니다. 주소가 이미 같은 해시여도 다시 누르면 그 섹션으로 갑니다(`SameHashScroll`).
- 헤더는 클라이언트 컴포넌트입니다(모바일 메뉴 상태). 로고 파일 확인은 서버(`layout.tsx`)에서 하고 경로를 넘깁니다.

## 푸터

- 구현 위치: `src/components/SiteFooter.tsx`, 값은 `src/content/site.ts`의 `siteConfig`
- 상태: 구현됨 (값은 아직 없음)

| 항목 | 내용 |
|---|---|
| 배경 | 전체 폭 `cream`, 위 `oat` 1px 선 |
| 로고 | 커피콩 심볼 + `Dozy Coffee` |
| 사업자 정보 | 상호, 대표자, 사업자등록번호, 통신판매업 신고번호, 주소 (`siteConfig.company`) |
| 고객 문의처 | 고객센터, 이메일 (`siteConfig.contact`) |
| 정책 링크 | 이용약관 · 개인정보처리방침 (`siteConfig.links.terms`, `privacy`) |
| SNS | 공식 계정 (`siteConfig.social`). 외부 주소는 새 창 |
| 저작권 | `© {올해} Dozy Coffee. All rights reserved.` |

- **값이 없는 항목은 화면에서 뺍니다.** 받지 않은 회사 정보를 지어 넣거나 "준비 중"으로 채우지 않고, `#` 링크를 만들지 않습니다. 지금은 로고와 저작권만 보입니다.
- 통신판매업 신고번호 등 법적 표기가 필요한지 확인해야 합니다.

## 404

- 구현 위치: `src/app/not-found.tsx`
- 상태: 구현됨
- 없는 주소로 들어오면 헤더와 푸터 사이에 보여 줍니다. 응답 코드는 404이고, Next.js가 `noindex`를 자동으로 붙입니다.

| 항목 | 내용 |
|---|---|
| 라벨 | `404` (`type-eyebrow`) |
| 제목 (`h1`) | 페이지를 찾을 수 없어요 |
| 설명 | 주소가 바뀌었거나 없어진 페이지예요. 홈에서 다시 찾아 주세요. |
| 링크 | 홈으로 (→ `/`, `ActionLink`) |
| metadata title | `페이지를 찾을 수 없음` |

## 미정

- 공식 로고 SVG, 사업자 정보, 고객 문의처, 약관·개인정보처리방침 주소, SNS 주소

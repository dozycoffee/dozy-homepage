# 구조

렌더링 전략과 코드 규칙입니다. 실행 방법과 현재 폴더 구조는 루트 [README.md](../README.md)에 있습니다.

## 스택

| 항목 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | Next.js 16, App Router | [ADR-0001](adr/0001-nextjs-app-router.md) |
| 언어 | TypeScript 5.9, `strict` | [ADR-0001](adr/0001-nextjs-app-router.md) |
| 스타일 | Tailwind CSS v4 | [ADR-0002](adr/0002-tailwind-css.md) |
| 패키지 매니저 | pnpm | [ADR-0001](adr/0001-nextjs-app-router.md) |
| lint | ESLint 9 + `eslint-config-next` | [ADR-0004](adr/0004-eslint-9-pin.md) |

- 정확한 버전은 `package.json`이 기준입니다.
- Next.js 16은 이전 버전과 API가 다른 부분이 많습니다. 코드를 쓰기 전에 `node_modules/next/dist/docs/`에서 해당 API를 확인합니다.

## 렌더링

아래 표가 기준입니다. 이렇게 정한 이유는 [ADR-0003](adr/0003-static-first-rendering.md)에 있습니다.

| 방식 | 언제 | 예 |
|---|---|---|
| SSG (기본) | 배포할 때만 바뀌는 내용 | 브랜드 소개, 정적 문구 |
| ISR | 외부 데이터가 배포와 상관없이 바뀔 때 | 상품·원두 목록 |
| 동적 렌더링 | 요청마다 달라야 할 때. 지금은 쓰지 않습니다 | 없음 |

- SSG가 아닌 페이지는 페이지 문서의 "렌더링" 항목에 이유를 씁니다.
- `pnpm build` 결과의 Route 표에서 페이지가 의도한 방식(`○ Static` 등)으로 나오는지 확인합니다.

## 서버·클라이언트 컴포넌트

- 기본은 서버 컴포넌트입니다.
- `"use client"`는 브라우저 상태나 이벤트가 필요한 컴포넌트에만 붙입니다 (예: 모바일 메뉴 토글, 캐러셀).
- 클라이언트 컴포넌트는 가능한 한 작게, 트리의 끝에 둡니다. 페이지 전체를 클라이언트 컴포넌트로 만들지 않습니다.
- 지금 클라이언트 컴포넌트는 `SiteHeader`(모바일 메뉴 상태), `MenuTabs`(선택한 메뉴 카테고리), `StoreFinder`(매장 검색어), `SameHashScroll`(같은 해시 링크 다시 누를 때 스크롤)입니다.
- 파일 시스템을 읽는 코드(`src/lib/assets.ts`)는 서버 컴포넌트에서만 부릅니다. 클라이언트 컴포넌트에는 확인한 결과(이미지 경로 또는 null)를 props로 넘깁니다. 서버에서 클라이언트로 함수를 넘길 수 없으므로 문구는 문자열로 넘깁니다.

## 폴더

| 위치 | 담는 것 |
|---|---|
| `src/app/` | 라우트(`page.tsx`, `layout.tsx`), 라우트 전용 파일, `globals.css` |
| `src/components/` | 여러 페이지가 쓰는 공통 컴포넌트 ([design-system.md](design-system.md#컴포넌트)에 등록) |
| `src/app/{route}/_components/` | 그 라우트에서만 쓰는 컴포넌트 |
| `src/content/` | 공개용 화면 데이터: 문구(`home.ts`), 메뉴·매장·소식, 사이트 설정(`site.ts`), 데이터 형태(`types.ts`). 확정된 실제 정보만 넣음(예외: 임시 메뉴, [pages/home.md](pages/home.md#데이터)) |
| `src/lib/` | 컴포넌트가 아닌 공용 코드 (사이트 기준 값 `site.ts`, 헤더 메뉴 `navigation.ts`, 데이터 선택 `content.ts`, 이미지 파일 확인 `assets.ts`, 링크 검사 `links.ts`) |
| `src/mocks/` | 화면 확인용 예시 데이터. `SHOW_DEMO_DATA=true`일 때만 쓰고 운영 화면에는 나오지 않음 ([configuration.md](configuration.md#환경-변수)) |
| `scripts/` | 개발용 스크립트. `images.mjs`(이미지 변환·검사), `image-slots.mjs`(이미지 자리 파일명과 권장 크기) |
| `assets-src/` | 이미지 원본(PNG, JPG 등). git에서 제외하고 변환 결과만 커밋 |
| `public/` | URL로 직접 접근하는 정적 파일. 이미지·로고·파비콘·공유 이미지는 `public/assets/images/` ([design-system.md](design-system.md#이미지)) |

- 폴더를 추가하거나 역할을 바꾸면 이 표와 루트 README를 같은 변경에서 고칩니다.

## 이름

| 대상 | 규칙 | 예 |
|---|---|---|
| 컴포넌트 파일 | PascalCase | `SiteHeader.tsx` |
| 그 밖의 파일 | kebab-case | `format-price.ts` |
| 라우트 폴더 | URL 그대로, kebab-case | `src/app/brand-story/` |
| 컴포넌트 | 파일 이름과 같게, named export | `export function SiteHeader()` |

- `page.tsx`, `layout.tsx` 같은 Next.js 파일 규칙은 Next.js가 요구하는 대로 default export를 씁니다.

## 코드

- import는 `@/*` 별칭(`src/*`)을 씁니다.
- 색상, 폰트, 간격 값을 컴포넌트에 직접 쓰지 않고 [design-system.md](design-system.md)의 토큰을 씁니다. Tailwind 기본 팔레트(`text-gray-500` 등)도 쓰지 않습니다.
- 이미지는 `next/image`, 내부 링크는 `next/link`를 씁니다.
- 화면 문구는 한국어가 기본이며 `<html lang="ko">`를 유지합니다. 문구, 메뉴, 매장, 소식, 링크는 컴포넌트에 쓰지 않고 `src/content/`에 둡니다.
- 비밀값을 코드에 쓰지 않습니다. 환경 변수 규칙은 [configuration.md](configuration.md)에 있습니다.

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

## 폴더

| 위치 | 담는 것 |
|---|---|
| `src/app/` | 라우트(`page.tsx`, `layout.tsx`), 라우트 전용 파일, `globals.css` |
| `src/components/` | 여러 페이지가 쓰는 공통 컴포넌트 ([design-system.md](design-system.md#컴포넌트)에 등록) |
| `src/app/{route}/_components/` | 그 라우트에서만 쓰는 컴포넌트 |
| `src/lib/` | 컴포넌트가 아닌 공용 코드 (데이터 조회, 유틸) |
| `public/` | URL로 직접 접근하는 정적 파일 (이미지, 파비콘) |

- `src/components/`, `src/lib/`는 처음 필요할 때 만듭니다.
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
- 화면 문구는 한국어가 기본이며 `<html lang="ko">`를 유지합니다.
- 비밀값을 코드에 쓰지 않습니다. 환경 변수 규칙은 [configuration.md](configuration.md)에 있습니다.

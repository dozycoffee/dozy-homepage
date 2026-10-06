# 디자인 시스템

디자인 토큰과 공통 컴포넌트입니다. 페이지 문서와 코드는 여기 있는 이름으로 참조합니다.

- 구현 위치: `src/app/globals.css`의 `:root`와 `@theme inline`
- 상태: 초안. 정식 브랜드 가이드가 없어 [도지커피 기술 블로그](https://dozycoffee.github.io)(`dozycoffee.github.io`의 `src/styles/global.css`)의 색상과 폰트를 기준으로 삼았습니다. 이유는 [ADR-0005](adr/0005-tech-blog-based-design-tokens.md)에 있습니다.

## 토큰을 쓰는 방법

1. 값은 `globals.css`의 `:root`에 CSS 변수로 둡니다.
2. `@theme inline`에서 Tailwind 토큰(`--color-*`, `--font-*`)으로 연결합니다. 그러면 `bg-surface`, `text-accent`처럼 클래스로 씁니다.
3. 토큰을 추가하거나 바꾸면 이 문서의 표를 같은 변경에서 고칩니다.
4. 컴포넌트에 색상 값(`#8b5e34`, `text-[#...]`)이나 Tailwind 기본 팔레트(`text-gray-500`, `bg-amber-700`)를 쓰지 않습니다.

## 색상

| 토큰 | 값 | 클래스 예 | 용도 | 기술 블로그 변수 |
|---|---|---|---|---|
| `background` | `#ffffff` | `bg-background` | 페이지 배경 | (흰색) |
| `foreground` | `#333d4b` | `text-foreground` | 본문 글자 | `--gray-dark` |
| `heading` | `#191f28` | `text-heading` | 제목 | `--black` |
| `muted` | `#6b7684` | `text-muted` | 보조 글자 (설명, 날짜) | `--gray` |
| `surface` | `#f2f4f6` | `bg-surface` | 구분되는 배경 (카드, 섹션) | `--gray-light` |
| `border` | `#e5e8eb` | `border-border` | 테두리, 구분선 | (직접 쓴 값) |
| `accent` | `#8b5e34` | `text-accent`, `bg-accent` | 브랜드 색. 링크, 주요 버튼 | `--accent` |
| `accent-strong` | `#5c3d22` | `bg-accent-strong` | 강조색 hover, 진한 강조 | `--accent-dark` |
| `accent-soft` | `#f5ebe0` | `bg-accent-soft` | 강조색의 연한 배경 | `--accent-light` |

**명도 대비** ([quality.md](quality.md#접근성) 기준: 본문 4.5:1 이상)

| 글자 / 배경 | 대비 | 본문에 사용 |
|---|---|---|
| `foreground` / `background` | 11.0 | 가능 |
| `heading` / `background` | 16.6 | 가능 |
| `muted` / `background` | 4.6 | 가능 |
| `accent` / `background` | 5.6 | 가능 |
| `background` / `accent` (주요 버튼) | 5.6 | 가능 |
| `accent` / `accent-soft` | 4.8 | 가능 |
| `foreground` / `surface` | 10.0 | 가능 |
| `muted` / `surface` | 4.2 | **불가.** 18.66px 이상 굵은 글자나 24px 이상 큰 글자에만 씁니다 |

- 다크 모드는 지원하지 않습니다. 기술 블로그도 라이트 모드만 있습니다. 지원하게 되면 다크 값을 이 표에 추가합니다.
- 성공, 경고, 오류 같은 상태 색상은 필요해질 때 추가합니다. 기술 블로그의 콜아웃 색상(초록 `#3f7d4e`, 주황 `#a8680f`, 빨강 `#c0392b`)을 후보로 봅니다.

## 타이포그래피

| 항목 | 값 |
|---|---|
| 기본 폰트 | Pretendard Variable (`pretendard` npm 패키지, dynamic subset) |
| 대체 폰트 | `-apple-system`, `BlinkMacSystemFont`, `Apple SD Gothic Neo`, `Segoe UI`, `Roboto`, `Noto Sans KR`, `Malgun Gothic`, `sans-serif` |
| 굵기 | 가변 폰트라 Tailwind `font-*` 굵기를 모두 쓸 수 있음 |
| 크기 단계 | 미정 (지금은 Tailwind 기본 `text-*` 사용) |

- 폰트는 `src/app/layout.tsx`에서 패키지의 CSS를 import해 불러옵니다. 사이트가 폰트 파일을 직접 제공하며, 외부 CDN을 쓰지 않습니다.
- dynamic subset이라 페이지에 쓰인 글자가 속한 조각 파일만 내려받습니다.
- 크기 단계를 정할 때 기술 블로그 값(본문 17px / 행간 1.6, 제목 48·36·24·20·18px)을 참고합니다. 블로그 값은 긴 글 읽기에 맞춘 것이라 그대로 쓰지는 않습니다.

## 간격, 레이아웃

| 항목 | 값 |
|---|---|
| 간격 | Tailwind 기본 단계 |
| 콘텐츠 최대 너비 | 미정 |
| 좌우 여백(모바일) | 미정 |

## 브레이크포인트

Tailwind 기본값을 씁니다. 바꾸면 이 표를 고칩니다.

| 이름 | 최소 너비 |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

- 모바일 우선으로 작성합니다. 접두사 없는 클래스가 모바일이고, 넓은 화면을 `md:` 등으로 덮어씁니다.

## 로고

- 원본: `dozycoffee.github.io`의 `src/assets/logo.png`
- 홈페이지에는 아직 넣지 않았습니다. 헤더를 만들 때 가져오며, SVG 원본이 있는지 확인합니다.

## 컴포넌트

`src/components/`의 공통 컴포넌트 목록입니다. 컴포넌트를 추가하면 여기에 등록합니다.

| 컴포넌트 | 용도 | 상태 |
|---|---|---|
| 없음 | | |

## 미정

- 정식 브랜드 가이드 (나오면 이 문서의 기준을 바꾸고 새 ADR을 씁니다)
- 타이포 크기 단계, 콘텐츠 최대 너비
- 상태 색상, 다크 모드
- 어드민 콘솔과 토큰을 공유할지 (어드민 콘솔은 다른 브라운 값을 씁니다)

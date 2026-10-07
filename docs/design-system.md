# 디자인 시스템

디자인 토큰과 공통 컴포넌트입니다. 페이지 문서와 코드는 여기 있는 이름으로 참조합니다.

- 구현 위치: `src/app/globals.css`의 `@theme`, `:root`, `@utility`
- 기준: 메인 홈페이지 작업 명세의 브랜드 기준 ([ADR-0009](adr/0009-brand-guide-2026.md)), 레이아웃 ([ADR-0010](adr/0010-single-page-home-sections.md)), 화면 높이 섹션과 글자형 인터페이스 ([ADR-0012](adr/0012-full-height-sections-and-typographic-ui.md))

## 토큰을 쓰는 방법

1. 고정 값은 `globals.css`의 `@theme`에 둡니다(`--color-*`, `--radius-*`, `--breakpoint-*`, `--container-*`, `--spacing-*`). 그러면 `bg-cream`, `rounded-card`처럼 클래스로 씁니다.
2. 화면 너비에 따라 바뀌는 값(`--gutter`, `--header-height`, `--section-y`)은 `:root`에 두고 미디어 쿼리로 바꿉니다. 여러 값을 묶은 규칙(정렬선, 섹션 여백, 타이포)은 `@utility`로 둡니다.
3. 토큰을 추가하거나 바꾸면 이 문서의 표를 같은 변경에서 고칩니다.
4. 컴포넌트에 색상 값(`#3b251c`, `text-[#...]`)을 쓰지 않습니다. Tailwind 기본 팔레트는 `--color-*: initial`로 지워 두었습니다.

## 색상

| 토큰 | 값 | 클래스 예 | 용도 |
|---|---|---|---|
| `cream` | `#F5EFE3` | `bg-cream` | 브랜드 배경, 강조 섹션(오더앱, 매장 찾기, 푸터), 이미지 자리 |
| `espresso` | `#3B251C` | `text-espresso`, `border-espresso` | 로고, 제목, 본문, 행동 링크·화살표, 선택된 탭 밑줄, 검색창 밑줄, 초점 표시 |
| `warm-white` | `#FCFAF6` | `bg-warm-white` | 페이지 기본 배경, 카드 배경 |
| `caramel` | `#B87A48` | `bg-caramel` | 작은 장식(보조 문구 앞 선, 상태 점, 링크 밑줄 hover) |
| `oat` | `#D8CBB8` | `border-oat` | 구분선, 탭 줄, 보조 링크 밑줄, Cream 섹션 위의 이미지 자리(`bg-oat/50`) |

**명도 대비** ([quality.md](quality.md#접근성) 기준: 본문 4.5:1, UI 요소 3:1 이상)

| 앞 / 배경 | 대비 | 사용 |
|---|---|---|
| `espresso` / `warm-white` | 13.7 | 모든 글자, 화살표·밑줄 같은 UI 선 |
| `espresso` / `cream` | 12.5 | 모든 글자 |
| `caramel` / `warm-white` | 3.4 | **글자에 쓰지 않음.** 장식만 |
| `oat` / `warm-white` | 1.5 | **글자에 쓰지 않음.** 구분선만 |

- 보조 글자(설명, 날짜, 분류)도 `espresso`를 쓰고 크기와 굵기로 위계를 만듭니다. 투명도를 낮춘 글자를 쓰지 않습니다.
- 다크 모드와 상태 색상(오류 등)은 지원하지 않습니다.

## 타이포그래피

Pretendard Variable을 씁니다. `src/app/layout.tsx`에서 `pretendard` 패키지의 dynamic subset CSS를 import합니다. 외부 CDN을 쓰지 않습니다.

| 유틸리티 | 요소 | 모바일 | `md` (768px~) | `lg` (1200px~) |
|---|---|---|---|---|
| `type-display` | 히어로 제목 (`h1`) | 32px / 1.3 | 40px / 1.25 | 52px / 1.2 |
| `type-title` | 섹션 제목 (`h2`) | 26px / 1.35 | 32px / 1.3 | 40px / 1.25 |
| `type-card-title` | 카드 제목 (`h3`) | 17px / 1.4 | 17px | 19px |
| `type-lead` | 섹션 설명 | 17px / 1.6 | 17px | 18px |
| `type-body` | 본문, 버튼 | 16px / 1.6 | 16px | 16px |
| `type-caption` | 날짜, 분류, 회사 정보 | 14px / 1.5 | 14px | 14px |
| `type-eyebrow` | 보조 문구(영문 대문자), 상태 표시 | 13px, 600, 자간 0.14em | | |
| `type-menu` | 헤더 메뉴 | 15px, 500 | | |
| `type-action` | 행동 링크, 탭, 검색 버튼 | 17px, 600 | 17px | 18px |

- 제목은 모두 600(SemiBold)입니다. 자간은 -0.01em까지만 줄입니다.
- 본문 기본값은 `body`의 16px, 행간 1.6입니다.
- 한글 단어가 끊기지 않게 `body`에 `word-break: keep-all`을 둡니다.
- 설명 문단은 `max-w-prose`(576px) 이하로 둡니다.

## 레이아웃

**브레이크포인트** (Tailwind 기본값을 지우고 두 개만 둡니다)

| 이름 | 범위 | 접두사 |
|---|---|---|
| 모바일 | ~767px | 없음 (기본) |
| 태블릿 | 768~1199px | `md:` |
| 데스크톱 | 1200px~ | `lg:` |

**정렬선** (`content-frame` 유틸리티)

| 항목 | 모바일 | 태블릿 | 데스크톱 |
|---|---|---|---|
| 좌우 여백 (`--gutter`) | 20px | 32px | 40px |
| 최대 너비 (`--container-page`) | 1200px | 1200px | 1200px |
| 섹션 위아래 여백 (`--section-y`) | 64px | 80px | 104px |
| 헤더 높이 (`--header-height`, `h-header`) | 64px | 72px | 72px |

- 너비는 `min(100% - 2 × gutter, 1200px)`입니다. 섹션 배경색만 전체 폭이고 내용은 정렬선 안에 둡니다.

**섹션 높이** (`screen-section` 유틸리티)

- 메인의 모든 섹션은 최소 높이가 고정 헤더 아래 보이는 화면(`100svh - --header-height`)이고, 내용은 세로 가운데입니다. 안쪽 위아래 여백은 `--section-y`입니다. 모든 화면 너비에 적용합니다.
- 내용이 화면보다 길면(매장이 많을 때, 모바일 메뉴·소식) 섹션이 늘어납니다. 스크롤 스냅은 쓰지 않습니다.
- 히어로는 헤더 높이만큼 위로 끌어올려(`-mt-header`) 고정 헤더 뒤까지 첫 화면 전체(좌우 끝, `100svh`)를 채웁니다. 헤더는 그 위에 반투명으로 겹칩니다. 글은 헤더 높이만큼 더 내려서 시작합니다. 모서리가 없습니다 ([ADR-0013](adr/0013-full-bleed-hero-translucent-header-temp-menu.md)).
  - `hero-wide` (768px 이상이면서 가로:세로 4:3 이상, `globals.css`의 `@custom-variant`): 이미지를 섹션 전체에 깔고, 글은 정렬선 왼쪽 50% 안에서 세로 가운데입니다.
  - 그 밖(모바일, 세로 태블릿): 글이 위, 남은 높이를 이미지가 좌우 끝까지 채웁니다(최소 288px).
- 브랜드·공간 사진은 `md` 이상에서 높이를 `100svh - 헤더 - 위아래 여백 - 12rem`(320~600px)로 맞춰 사진과 글이 한 화면에 들어오게 합니다.
- 섹션을 추가하면 `screen-section`을 씁니다. 메인 밖 페이지(404)는 `section-space`(위아래 여백만)를 씁니다.
- 헤더는 `sticky`입니다. 앵커 대상이 가리지 않도록 `html`에 `scroll-padding-top: var(--header-height)`를 둡니다.
- 360px 너비에서도 가로 스크롤이 생기지 않아야 합니다.

**섹션 배경 순서** (메인): 히어로 이미지(자리 색 `cream`) → 메뉴 `warm-white` → 오더앱 `cream` → 브랜드 `warm-white` → 매장 찾기 `cream` → 소식·가맹 `warm-white`(가맹 위 `oat` 구분선) → 푸터 `cream`

## 모서리, 선, 그림자

| 토큰 | 값 | 대상 |
|---|---|---|
| `rounded-button` | 8px | 링크·버튼의 초점 표시 외곽선 |
| `rounded-card` | 16px | 메뉴·매장·소식 사진 |
| `rounded-panel` | 24px | 큰 이미지 패널(오더앱, 브랜드, 가맹). 히어로는 화면 전체라 모서리 없음 |

- 카드는 상자(테두리, 배경)가 없습니다. 둥근 사진과 그 아래 글자로만 이룹니다. 그림자를 쓰지 않습니다.
- 헤더 아래 선은 높이에 영향이 없도록 `box-shadow` 1px로 그립니다(히어로를 정확히 헤더 높이만큼 끌어올리기 때문).
- 헤더 배경은 `warm-white` 85%와 `backdrop-blur-md`로 살짝 비칩니다. 85% 위에서도 `espresso` 글자 대비는 8:1 이상입니다. 모바일 메뉴 목록은 불투명입니다.
- 헤더 아래, 푸터 위, 가맹 안내 위, 메뉴 탭 아래에 `oat` 1px 구분선을 둡니다. 빈 상태 안내 위에는 `espresso` 1px 선을 둡니다.

## 행동 링크, 탭, 입력, 초점

채운 버튼, 테두리 상자, 알약 탭처럼 앱 위젯으로 보이는 모양을 쓰지 않고 글자와 선으로 행동을 보여 줍니다 ([ADR-0012](adr/0012-full-height-sections-and-typographic-ui.md)).

**행동 링크** (`ActionLink`)

| 변형 | 모양 | 쓰는 곳 |
|---|---|---|
| `arrow` (기본) | `type-action` 글자 + 48px 화살표 선(`ArrowLine`). hover 시 화살표가 오른쪽으로 6px 이동 | 히어로 "메뉴 보기", 가맹 "가맹 안내 보기", 404 "홈으로" |
| `underline` | `type-action` 글자 + `oat` 2px 밑줄. hover 시 밑줄이 `espresso` | 히어로 "가까운 매장 찾기" |

- 헤더 "가맹 안내"는 메뉴 오른쪽에 글자 높이(16px)의 `espresso` 1px 세로 구분선(|)을 두고 굵은 글자 + 16px 바로가기 아이콘(`ShortcutIcon`, 모바일 메뉴는 20px)으로 강조합니다. 구분선과 아이콘은 장식이라 `aria-hidden`입니다.
- 매장 링크(`매장 상세`, `지도 보기`)는 `underline` 모양입니다.
- 외부 주소는 새 창으로 열고 화면 읽기용 "(새 창)"을 붙입니다.

**탭** (메뉴 카테고리): 전체 폭 `oat` 아래 선 위에 글자만 둡니다. 선택된 탭은 600 굵기와 `espresso` 2px 밑줄, 나머지는 500 굵기입니다. hover 시 `oat` 밑줄.

**검색창** (매장 찾기): 상자 없이 `espresso` 2px 밑줄 하나입니다. 입력 글자 20px, 오른쪽에 글자형 "매장 검색" 버튼 + 화살표. 라벨은 위에 항상 보입니다. 입력창에 초점이 가면 외곽선 대신 밑줄이 4px로 두꺼워집니다. 입력창은 마우스로 클릭해도 `:focus-visible`이 되어 외곽선이 상자처럼 보이기 때문입니다.

- 누를 수 있는 요소는 모두 높이 44px 이상입니다(헤더 메뉴, 탭, 링크 포함).
- 목적지가 없는 항목에는 링크를 만들지 않습니다. 대신 `StatusLabel`로 상태 문구를 씁니다.
- 초점 표시는 전역 `:focus-visible`(espresso 2px 외곽선, 간격 3px)입니다. 컴포넌트에서 지우지 않습니다. 예외는 검색 입력창으로, 같은 역할의 밑줄 표시로 바꿉니다.
- 카드 전체를 누르는 경우(상세 주소가 있는 메뉴·소식) 제목 링크의 `::after`를 카드 크기로 넓히고, hover 시 제목에 밑줄을 긋습니다.

## 움직임

- 색 변화(`transition-colors`), 행동 링크 화살표의 이동, 모바일 메뉴 버튼의 X 회전만 씁니다. 자동 슬라이드, 배경 영상, 스크롤 등장 효과를 쓰지 않습니다.
- 섹션 이동은 부드러운 스크롤입니다. `prefers-reduced-motion: reduce`이면 부드러운 스크롤과 전환 효과를 끕니다.
- `<html data-scroll-behavior="smooth">`로 페이지 이동 때는 Next.js가 즉시 스크롤합니다.

## 이미지

이미지는 `public/assets/images/`(공개 경로 `/assets/images/`)에 아래 파일명으로 둡니다. 파일이 있으면 코드 수정 없이 다시 배포했을 때 표시됩니다 ([ADR-0011](adr/0011-asset-slots-and-demo-data.md)).

| 파일 | 위치 | 비율 (화면) | 맞춤 | 권장 크기 |
|---|---|---|---|---|
| `logo-dozy-bean.svg` | 헤더, 푸터 로고 | 원본 비율, 높이 32px | 원본 | 벡터 |
| `hero-coffee-desktop.webp` | 히어로 (`md` 이상, 모바일 대체) | 화면 전체 배경 (`hero-wide`) 또는 글 아래 남은 영역 | cover, `72% center` | 2400×1000 |
| `hero-coffee-mobile.webp` | 히어로 (모바일) | 글 아래 남은 영역, 좌우 끝까지 | cover, `center` | 1080×1080 |
| `menu-*.webp` | 메뉴 카드 | 1:1 | contain | 1000×1000 |
| `dozy-order-coming-soon.webp` | 오더앱 | 6:5 | cover | 1200×1000 |
| `brand-store-interior.webp` | 브랜드·공간 | 모바일 4:3, `md` 이상 2:1 | cover | 2000×1000 |
| `store-default.webp` | 개별 사진이 없는 매장 카드 | 4:3 | cover | 1200×900 |
| `news-*.webp` | 소식 카드 | 4:3 | cover | 1200×900 |
| `franchise-storefront.webp` | 가맹 안내 | 4:3 | cover | 1600×1200 |
| `og-dozy-coffee.jpg` | 링크 공유 이미지 ([seo.md](seo.md#og-이미지)) | | | 1200×630 |
| `favicon.ico` | 브라우저 아이콘 | | | 멀티사이즈 |

- 파일 형식과 확장자가 같아야 합니다. PNG 파일의 이름만 `.webp`로 바꾸지 않습니다.

**이미지 넣는 방법** (`pnpm images`, `scripts/images.mjs`)

1. 원본(PNG, JPG, WebP, AVIF, TIFF, GIF)을 `assets-src/`에 공개 파일명과 같은 이름, 확장자만 다르게 넣습니다. 예: `assets-src/hero-coffee-desktop.png`
2. `pnpm images`를 실행합니다. 위 표의 권장 크기 안으로 줄이고(키우거나 자르지 않음), WebP(품질 82) 또는 OG 이미지는 JPEG(품질 85)로 저장합니다. 사진 방향 정보는 반영하고 메타데이터는 지웁니다.
3. 새로 바뀐 원본만 변환합니다. 모두 다시 하려면 `pnpm images --force`.
4. 로고 SVG와 파비콘 ICO는 변환하지 않고 같은 형식일 때만 복사합니다.
5. 파일을 쓰면 Next.js 이미지 캐시도 비웁니다. 브라우저는 강력 새로고침합니다.

- 권장 크기보다 작거나 비율이 2% 넘게 다르면 경고합니다. 이미지 자리 목록에 없는 이름은 건너뜁니다.
- `pnpm images:check`는 `public/assets/images/`의 파일을 검사합니다: 확장자와 실제 형식이 다른 파일, 권장보다 작거나 비율이 다른 파일, 600KB가 넘는 파일, 목록에 없는 파일. 문제가 있으면 실패(종료 코드 1)합니다.
- 이미지 자리를 추가·변경하면 위 표, `scripts/image-slots.mjs`, `src/content/`의 경로를 같은 변경에서 고칩니다.
- **파일이 없을 때:** `MediaImage`가 같은 비율의 배경색 상자만 그립니다(`warm-white` 섹션은 `cream`, `cream` 섹션은 `oat` 50%). 깨진 이미지, 파일명 안내, 대체 글자를 보이지 않습니다. 로고 파일이 없으면 `Dozy Coffee` 글자만 보입니다.
- 파일 확인은 서버에서 `src/lib/assets.ts`의 `resolveImage`가 합니다. 정적 생성이라 빌드 시점에 확인합니다. 개발 서버는 새로고침하면 반영됩니다.
- **같은 파일명으로 교체할 때:** Next.js 이미지 최적화 캐시가 이전 이미지를 최대 4시간(`minimumCacheTTL` 기본값) 보여 줄 수 있습니다. 개발 서버는 `.next/dev/cache/images`, 직접 띄운 서버(`next start`)는 `.next/cache/images`를 지우고 새로고침합니다. 브라우저 캐시도 남을 수 있어 강력 새로고침을 함께 합니다.
- 히어로는 `<picture>`로 767px 이하에 모바일 이미지를 씁니다. 모바일 이미지가 없으면 데스크톱 이미지를 자르고(`75% center`), 데스크톱 이미지가 없으면 `md` 이상은 Cream 배경만 보입니다.
- 히어로 이미지가 있고 글을 겹칠 때(`hero-wide`) 글 쪽(왼쪽 60%)에 `cream` 그라데이션을 깔아 제목·링크 가독성을 지킵니다.
- 히어로 이미지는 `fetchPriority="high"`, `loading="eager"`이고 나머지는 지연 로드합니다. 모두 비율을 정한 상자 안에 `fill`로 넣어 레이아웃이 흔들리지 않습니다.
- 이미지 경로, 대체 텍스트, `object-position`은 데이터(`src/content/`)에서 바꿉니다. 정보성 이미지는 장면을 설명하고, 옆 글자와 같은 내용이거나 장식이면 빈 대체 텍스트를 씁니다.
- 제목과 버튼을 이미지 안에 넣지 않습니다.

## 로고

- D가 없는 커피콩 심볼 + `Dozy Coffee` 글자(600)입니다. 심볼은 회전하거나 비율을 바꾸지 않고 높이만 32px로 맞춥니다.
- 심볼은 링크 이름과 겹치므로 빈 대체 텍스트입니다.
- 시바견 캐릭터는 쓰지 않습니다.

## 컴포넌트

`src/components/`의 공통 컴포넌트입니다. 컴포넌트를 추가하면 여기에 등록합니다.

| 컴포넌트 | 용도 |
|---|---|
| `SiteHeader` | 모든 페이지 상단 헤더와 모바일 메뉴 ([layout.md](pages/layout.md#헤더)). 클라이언트 컴포넌트 |
| `SameHashScroll` | 주소의 해시가 이미 같은 링크(예: `/#menu`에서 "메뉴 보기")를 다시 눌러도 그 섹션으로 스크롤되게 함. 레이아웃에 한 번. 클라이언트 컴포넌트 |
| `SiteFooter` | 모든 페이지 하단 푸터 ([layout.md](pages/layout.md#푸터)) |
| `Logo` | 커피콩 심볼 + 브랜드명. 심볼 경로가 null이면 글자만 |
| `ActionLink` | 글자형 행동 링크. `variant`(`arrow`, `underline`). 화살표 선 `ArrowLine`, 바로가기 아이콘 `ShortcutIcon`도 내보냄 |
| `MediaImage` | 이미지 자리. 파일이 없으면 배경색 상자. `fit`(`contain`, `cover`), `tone`(`cream`, `oat`) |
| `Eyebrow` | 제목 위 영문 보조 문구. 앞에 `caramel` 짧은 선 |
| `StatusLabel` | 버튼이 아닌 상태 문구(COMING SOON, 준비 중). 앞에 `caramel` 점 |
| `EmptyState` | 데이터가 없을 때 안내 (위 구분선 + 글자) |

## 미정

- 공식 로고 SVG와 사진 파일 (받으면 [이미지](#이미지) 표의 파일명으로 넣습니다)

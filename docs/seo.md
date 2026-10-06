# SEO

사이트 전체에 적용되는 검색·공유 규칙입니다. 페이지별 title, description 값은 각 [페이지 문서](pages/README.md)에 있습니다.

## 도메인

| 항목 | 값 |
|---|---|
| 기준 URL | `https://www.dozy.kr` |
| `dozy.kr` (www 없음) | `www.dozy.kr`로 영구 리다이렉트 (미구현, [configuration.md](configuration.md#도메인)) |

- canonical URL은 기준 URL을 씁니다. `metadataBase`가 `src/app/layout.tsx`에 있습니다.

## metadata 기본값

`src/app/layout.tsx`에 있습니다. 페이지가 값을 정하지 않으면 이 값이 쓰입니다.

| 항목 | 값 |
|---|---|
| title 기본값 | `Dozy Coffee` |
| title 템플릿 | `%s \| Dozy Coffee` |
| description | `Dozy Coffee 공식 홈페이지` |
| OG `siteName` | `Dozy Coffee` |
| OG `locale` | `ko_KR` |
| OG `type` | `website` |

## 페이지 metadata 규칙

- 모든 페이지는 title과 description을 정합니다. 메인 페이지만 기본값을 그대로 쓸 수 있습니다.
- title은 페이지 이름만 씁니다. `| Dozy Coffee`는 템플릿이 붙입니다.
- description은 그 페이지 내용을 한두 문장으로 씁니다. 페이지끼리 같은 문장을 쓰지 않습니다.
- 값은 페이지 문서의 "metadata" 표가 기준입니다.

## OG 이미지

- 사이트 기본 OG 이미지: 미정 (`src/app/opengraph-image.*`)
- 페이지별 OG 이미지가 필요하면 그 라우트 폴더에 `opengraph-image.*`를 둡니다.

## sitemap, robots

Next.js 파일 규칙(`src/app/sitemap.ts`, `src/app/robots.ts`)으로 만듭니다. 아직 없습니다.

- sitemap에는 [사이트맵](pages/README.md#사이트맵)에서 상태가 `구현됨`인 페이지만 넣습니다.
- robots는 운영 환경에서만 색인을 허용합니다. 미리보기·개발 배포는 색인을 막습니다.

## 구조화 데이터

- 미정. 매장 정보를 보여 주게 되면 `Organization`, `LocalBusiness`(`CafeOrCoffeeShop`) JSON-LD를 검토합니다.

## 리다이렉트

URL을 바꾸거나 없앨 때는 옛 URL을 새 URL로 영구 리다이렉트합니다. `next.config.ts`의 `redirects`에 두고 아래 표에 기록합니다.

| 옛 URL | 새 URL | 이유 |
|---|---|---|
| 없음 | | |

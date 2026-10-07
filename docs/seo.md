# SEO

사이트 전체에 적용되는 검색·공유 규칙입니다. 페이지별 title, description 값은 각 [페이지 문서](pages/README.md)에 있습니다.

## 도메인

| 항목 | 값 |
|---|---|
| 기준 URL | `https://www.dozy.kr` |
| `dozy.kr` (www 없음) | `www.dozy.kr`로 영구 리다이렉트 (308). 경로와 쿼리는 유지 |

- 기준 URL은 `src/lib/site.ts`의 `SITE_URL`에 있고, `src/app/layout.tsx`의 `metadataBase`로 canonical과 공유 URL에 쓰입니다. 운영 도메인이 바뀌면 이 값만 고칩니다.
- 리다이렉트는 `next.config.ts`의 `redirects`에서 요청 host(`dozy.kr`)로 판단합니다. 배포 플랫폼과 상관없이 동작합니다.

## metadata 기본값

`src/app/layout.tsx`에 있습니다. 페이지가 값을 정하지 않으면 이 값이 쓰입니다.

| 항목 | 값 |
|---|---|
| title 기본값 | `Dozy Coffee \| 도지커피` (메인이 그대로 씀) |
| title 템플릿 | `%s \| Dozy Coffee` |
| description | `커피 한 잔, 잠깐 느려지는 시간. Dozy Coffee의 메뉴와 매장, 새로운 소식을 만나보세요.` (메인이 그대로 씀) |
| OG `siteName` | `Dozy Coffee` |
| OG `locale` | `ko_KR` |
| OG `type` | `website` |
| OG `title`, `description` | title 기본값, description과 같음 |
| OG 이미지 | `/assets/images/og-dozy-coffee.jpg`. 파일이 있을 때만 ([OG 이미지](#og-이미지)) |
| Twitter 카드 | OG 이미지가 있으면 `summary_large_image`, 없으면 `summary` |
| 파비콘 | `/assets/images/favicon.ico`. 파일이 있을 때만 |

## 페이지 metadata 규칙

- 모든 페이지는 title과 description을 정합니다. 메인 페이지만 기본값을 그대로 쓸 수 있습니다.
- title은 페이지 이름만 씁니다. `| Dozy Coffee`는 템플릿이 붙입니다.
- description은 그 페이지 내용을 한두 문장으로 씁니다. 페이지끼리 같은 문장을 쓰지 않습니다.
- 값은 페이지 문서의 "metadata" 표가 기준입니다.
- 아직 공개하지 않을 페이지를 임시로 두게 되면 `robots: { index: false }`로 색인을 막고 canonical을 두지 않습니다.
- 색인할 페이지는 `alternates.canonical`에 자기 경로를 씁니다 (예: 메인은 `/`). 레이아웃에 두면 모든 페이지가 같은 canonical을 갖게 되므로 페이지마다 둡니다.

## OG 이미지

- 사이트 공유 이미지: `public/assets/images/og-dozy-coffee.jpg` (1200×630 JPEG). 경로는 `src/content/site.ts`의 `siteConfig.shareImage`입니다.
- `src/app/layout.tsx`가 빌드 때 파일이 있는지 확인하고, **있을 때만** `og:image`를 넣습니다. 없는 이미지 주소를 metadata에 넣지 않습니다.
- 파일 기반 OG 이미지(`opengraph-image.*`)는 metadata보다 우선하므로 `src/app/`에 두지 않습니다.
- 페이지별 공유 이미지가 필요하면 그 페이지 metadata의 `openGraph.images`에 둡니다. 페이지에서 `openGraph`를 정하면 레이아웃 값을 통째로 덮으므로 나머지 항목도 함께 씁니다.

## sitemap, robots

| 파일 | 내용 |
|---|---|
| `src/app/sitemap.ts` → `/sitemap.xml` | [사이트맵](pages/README.md#사이트맵)에서 `sitemap.xml` 열이 `포함`인 페이지 |
| `src/app/robots.ts` → `/robots.txt` | `SITE_ENV=production`이면 모두 허용하고 sitemap 주소를 알림. 그 밖에는 모두 차단 |

- 환경 변수가 없으면 색인을 막습니다. 실수로 미리보기나 개발 배포가 검색에 노출되지 않게 하기 위해서입니다. `SITE_ENV`는 [configuration.md](configuration.md#환경-변수)에 있습니다.
- 페이지를 sitemap에 넣거나 빼면 사이트맵 표와 `sitemap.ts`를 같은 변경에서 고칩니다.

## 구조화 데이터

- 미정. 매장 정보를 보여 주게 되면 `Organization`, `LocalBusiness`(`CafeOrCoffeeShop`) JSON-LD를 검토합니다.

## 리다이렉트

URL을 바꾸거나 없앨 때는 옛 URL을 새 URL로 영구 리다이렉트합니다. `next.config.ts`의 `redirects`에 두고 아래 표에 기록합니다.

| 옛 URL | 새 URL | 이유 |
|---|---|---|
| `dozy.kr/*` (host 기준) | `https://www.dozy.kr/*` | 기준 URL을 하나로 맞춤 ([도메인](#도메인)) |

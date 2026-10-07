# 설정

환경 변수, 배포, 도메인입니다.

## 환경 변수

| 이름 | 공개 | 용도 | 필수 |
|---|---|---|---|
| `SITE_ENV` | 아니오 (서버, 빌드 시) | `production`이면 robots.txt가 색인 허용 ([seo.md](seo.md#sitemap-robots)). 값: `production`, `preview`, `development`. 비우면 색인 차단 | 운영 배포에서만 `production`으로 설정 |
| `SHOW_DEMO_DATA` | 아니오 (서버, 빌드 시) | `true`이면 메인의 매장·소식에 화면 확인용 예시 데이터(`src/mocks/`)를 씀. `SITE_ENV=production`이면 무시하고 항상 공개용 데이터(`src/content/`)만 씀 ([ADR-0011](adr/0011-asset-slots-and-demo-data.md)) | 아니오. 기본은 끔 |

- 변수를 추가할 때 아래 규칙을 따르고 위 표와 `.env.example`에 등록합니다.

- 로컬 값은 `.env.local`에 둡니다. `.env*`는 git에서 제외되어 있습니다.
- 변수를 추가하면 이름과 예시 값을 담은 `.env.example`을 함께 커밋합니다. 실제 비밀값은 넣지 않습니다.
- `NEXT_PUBLIC_`으로 시작하는 변수는 브라우저에 그대로 노출됩니다. 비밀값에 쓰지 않습니다.
- 운영 값은 배포 플랫폼의 환경 변수 설정에 둡니다.

## 배포

| 항목 | 값 |
|---|---|
| 플랫폼 | 미정 (후보: Vercel) |
| 운영 배포 | 미정 |
| 미리보기 배포 | 미정 |
| Node.js | 24 (LTS). `@types/node`도 24에 맞춤 |

## 도메인

| 도메인 | 동작 |
|---|---|
| `www.dozy.kr` | 운영 사이트 |
| `dozy.kr` | `www.dozy.kr`로 영구 리다이렉트 (`next.config.ts`, [seo.md](seo.md#도메인)). 두 도메인이 모두 이 앱으로 연결되어야 동작 |

- DNS 관리 위치: 미정

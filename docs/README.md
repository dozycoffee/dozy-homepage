# dozy-homepage 명세

이 폴더는 dozy-homepage 구현의 **기준 명세**입니다. 코드와 명세가 다르면 명세가 기준입니다.

## 담당 범위

같은 내용은 한 문서에만 씁니다. 다른 문서는 값을 다시 쓰지 않고 링크로 참조합니다.

| 내용 | 담당 문서 |
|---|---|
| 사이트맵, URL, 페이지 문서 양식 | [pages/README.md](pages/README.md) |
| 모든 페이지 공통 요소: 헤더, 내비게이션, 푸터, 404 | [pages/layout.md](pages/layout.md) |
| 페이지 하나의 목적, 섹션, 데이터, 렌더링, 페이지 metadata 값 | `pages/{페이지}.md` |
| 렌더링 전략, 서버·클라이언트 컴포넌트 기준, 폴더·이름·코드 규칙 | [architecture.md](architecture.md) |
| 디자인 토큰(색상, 타이포, 간격, 브레이크포인트), 공통 컴포넌트 목록 | [design-system.md](design-system.md) |
| 사이트 전체 SEO 규칙: metadata 기본값, OG 이미지, sitemap, robots, 구조화 데이터, 리다이렉트 | [seo.md](seo.md) |
| 성능 예산, 접근성 기준, 지원 브라우저와 기기 | [quality.md](quality.md) |
| 환경 변수, 배포, 도메인 | [configuration.md](configuration.md) |
| 결정과 이유 | [adr/](adr/README.md) |
| 실행 방법, 스크립트, 폴더 구조 | 루트 [README.md](../README.md) |

**아직 없는 문서**

필요해지면 만들고 위 표에 추가합니다. 빈 문서를 미리 두지 않습니다.

| 문서 | 만들 시점 |
|---|---|
| `data-sources.md` | catalog-api, CMS 등 외부 데이터를 처음 붙일 때 (가져오는 데이터, 갱신 주기, 실패 시 화면) |
| `testing.md` | 테스트 도구(E2E, 시각 회귀 등)를 정할 때 |

## 참조 방식

- **페이지:** URL과 문서 링크로 참조합니다 (예: [`/`](pages/home.md)).
- **디자인 토큰, 컴포넌트:** 이름으로 참조합니다 (예: `color-primary`, `Button`). 값은 [design-system.md](design-system.md)에만 있습니다.
- **ADR:** `ADR-0003`처럼 번호로 참조합니다. ADR은 결정의 이유로만 링크하고, 현재 규칙은 담당 문서에 씁니다. "ADR을 따른다"처럼 ADR을 규칙의 기준으로 쓰지 않습니다.

## 수정 규칙

1. 동작이나 화면이 바뀌면 **같은 PR에서** 담당 문서를 고칩니다. 명세와 코드가 다른 상태로 `main`에 들어가지 않게 합니다.
2. 담당 문서가 아닌 곳에 값이나 규칙을 다시 쓰지 않습니다. 필요하면 링크합니다.
3. 정하지 않은 내용은 추측해서 채우지 않고 `미정`으로 남깁니다.
4. 이미 정한 결정을 바꾸려면 새 ADR을 쓰고 기존 ADR을 "대체됨"으로 표시합니다. 기존 ADR 본문은 고치지 않습니다.

## 문서 밖의 것

- 로컬 메모(`.context/`, `CLAUDE.local.md`)는 명세가 아닙니다. 결정이 되면 여기로 옮깁니다.
- 서비스 사이의 공통 규약은 `dozy-platform`에 있습니다.

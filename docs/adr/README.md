# ADR

결정과 그 이유입니다. 평소에는 이 목록만 보고, 필요한 결정만 열어봅니다.

- 결정이 바뀌면 기존 파일은 고치지 않고 새 ADR을 추가한 뒤, 기존 파일의 상태를 `대체됨(→ 번호)`으로 바꿉니다.
- ADR은 기록입니다. 현재 규칙의 기준은 담당 명세 문서이고, 결정이 규칙이 되면 그 문서에 씁니다.
- 파일 이름은 `{번호 4자리}-{영문-kebab-case}.md`입니다.
- 서비스 전체에 걸친 결정은 `dozy-platform`의 ADR에 씁니다.

| 번호 | 결정 | 상태 | 요약 |
|---|---|---|---|
| [0001](0001-nextjs-app-router.md) | Next.js App Router, TypeScript, pnpm으로 만든다 | 채택 | 공개 사이트라 서버에서 HTML을 미리 만드는 Next.js. 어드민 콘솔과 같은 React |
| [0002](0002-tailwind-css.md) | 스타일은 Tailwind CSS v4로 하고 토큰은 globals.css에 둔다 | 채택 | 설정 파일 없이 `@theme`으로 토큰 관리 |
| [0003](0003-static-first-rendering.md) | 페이지는 정적 생성을 기본으로 하고 바뀌는 데이터만 ISR을 쓴다 | 채택 | SSG 기본, ISR 예외, 동적 렌더링은 쓰지 않음 |
| [0004](0004-eslint-9-pin.md) | ESLint는 eslint-plugin-react가 10을 지원할 때까지 9에 둔다 | 채택 | ESLint 10에서 `eslint-config-next`가 동작하지 않음 |
| [0005](0005-tech-blog-based-design-tokens.md) | 디자인 토큰은 기술 블로그의 색상과 Pretendard를 기준으로 한다 | 대체됨(→ 0009) | 정식 가이드 전까지 블로그 색상 그대로, Pretendard 자체 제공, 다크 모드 없음 |
| [0006](0006-magazine-layout.md) | 메인 화면은 사진 중심의 매거진 형태로 만든다 | 대체됨(→ 0007) | 큰 사진, 짧은 글, 넓은 여백. 넓은 사진 영역과 좁은 읽기 영역, 직각, 중간 굵기 제목 |
| [0007](0007-full-width-brand-layout.md) | 메인 화면은 전체 폭 비주얼과 공통 정렬선으로 만든다 | 대체됨(→ 0010) | 전체 폭 사진·배경, 6vw 정렬선, 고정 헤더, 사진 60 : 글 40 분할. ADR-0006 대체 |
| [0008](0008-full-screen-sections-with-snap.md) | 메인 섹션은 화면 높이로 채우고 섹션 단위로 스냅한다 | 대체됨(→ 0010) | `md` 이상에서 브랜드 소개·소식을 화면 높이로, `y mandatory` 스냅. 모바일 제외 |
| [0009](0009-brand-guide-2026.md) | 새 브랜드 기준(색상 5개, 커피콩 심볼)으로 디자인 토큰을 다시 정한다 | 채택 (버튼·카드 모양은 0012로 대체) | Cream·Espresso·Warm White·Caramel·Oat, 글자는 Espresso, 모서리 16/24/8px, 시바견 미사용. ADR-0005 대체 |
| [0010](0010-single-page-home-sections.md) | 메인은 7개 섹션을 한 페이지에 두고, 헤더 메뉴는 섹션으로 이동한다 | 채택 (섹션 높이는 0012, 헤더·히어로는 0013으로 대체) | 고정 섹션 ID, `sticky` 불투명 헤더, 1200px 정렬선과 카드·패널, 스냅 없음. ADR-0007·0008 대체 |
| [0011](0011-asset-slots-and-demo-data.md) | 이미지는 정해진 파일명 자리에 두고, 예시 데이터는 운영 데이터와 분리한다 | 채택 (메뉴는 0013으로 대체) | 빌드 시 파일 확인 후 없으면 배경색 자리, `src/content/` 운영 / `src/mocks/` 예시(`SHOW_DEMO_DATA`) |
| [0012](0012-full-height-sections-and-typographic-ui.md) | 메인 섹션은 화면 높이를 채우고, 인터페이스는 상자 대신 글자와 선으로 만든다 | 채택 | 섹션 최소 높이 `100svh - 헤더`(스냅 없음), 글자+화살표 링크, 밑줄 탭·검색창, 테두리 없는 카드. ADR-0009·0010 일부 대체 |
| [0013](0013-full-bleed-hero-translucent-header-temp-menu.md) | 히어로 배경은 화면 전체를 채우고, 헤더는 반투명, 메뉴는 임시 데이터로 공개한다 | 채택 | 히어로 전체 폭·높이 배경(가로 화면은 글 겹침), 헤더 `warm-white` 85% + 흐림, 임시 메뉴 5종 공개. ADR-0010·0011 일부 대체 |

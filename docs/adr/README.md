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
| [0005](0005-tech-blog-based-design-tokens.md) | 디자인 토큰은 기술 블로그의 색상과 Pretendard를 기준으로 한다 | 채택 | 정식 가이드 전까지 블로그 색상 그대로, Pretendard 자체 제공, 다크 모드 없음 |

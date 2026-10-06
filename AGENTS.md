<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Dozy Coffee 메인 홈페이지 저장소입니다. `www.dozy.kr`로 접속하면 가장 먼저 보이는 공개 웹사이트입니다.

- 위 Next.js 안내 블록은 `next dev`가 자동으로 다시 넣습니다. 지우거나 고치지 않습니다.
- 에이전트 공용 지침은 이 파일에 씁니다. `CLAUDE.md`는 이 파일을 불러오기만 합니다.

## 스택

| 항목 | 선택 | 주의 |
|---|---|---|
| 프레임워크 | Next.js 16 (App Router) | 코드를 쓰기 전에 `node_modules/next/dist/docs/`에서 해당 API를 확인 |
| 언어 | TypeScript 5.9 | TS 7은 Next.js 지원을 확인하기 전까지 올리지 않음 |
| 스타일 | Tailwind CSS v4 | 설정 파일 없이 `src/app/globals.css`의 `@theme`에서 토큰 관리 |
| 패키지 매니저 | pnpm | npm, yarn을 쓰지 않음. lockfile은 `pnpm-lock.yaml`만 |
| lint | ESLint 9 | `eslint-plugin-react`가 ESLint 10을 지원할 때까지 9 유지 |

## 명령

| 명령 | 내용 |
|---|---|
| `pnpm dev` | 개발 서버 (http://localhost:3000) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm lint` | ESLint 검사 |

- 작업을 마치면 `pnpm lint`와 `pnpm build`가 통과하는지 확인합니다.

## 코드

- 렌더링, 컴포넌트, 폴더, 이름 규칙은 [`docs/architecture.md`](docs/architecture.md)를 따릅니다.
- 디자인 값은 [`docs/design-system.md`](docs/design-system.md)의 토큰을 쓰고 컴포넌트에 직접 쓰지 않습니다.
- 페이지를 추가하거나 바꾸면 [`docs/seo.md`](docs/seo.md)의 metadata 규칙과 [`docs/quality.md`](docs/quality.md)의 성능·접근성 기준을 지킵니다.
- 비밀값(API 키, 토큰)을 커밋하지 않습니다. 환경 변수 규칙은 [`docs/configuration.md`](docs/configuration.md)에 있습니다.

## 명세

- 명세는 [`docs/`](docs/README.md)에 있고, **코드와 명세가 다르면 명세가 기준입니다.** 명세가 틀렸다고 판단되면 코드를 바꾸기 전에 사람에게 알립니다.
- 작업 전에 [`docs/README.md`](docs/README.md)의 담당 범위 표를 보고 필요한 문서만 읽습니다. 페이지 작업이면 [`docs/pages/README.md`](docs/pages/README.md)의 사이트맵에서 해당 페이지 문서를 찾습니다.
- 이미 정한 결정은 [`docs/adr/README.md`](docs/adr/README.md)를 먼저 확인합니다. ADR과 다른 방향을 제안할 때는 그 ADR을 근거와 함께 언급합니다.
- 동작이나 화면을 바꾸면 **같은 변경에서** 담당 문서를 고칩니다. 값이나 규칙을 담당 문서가 아닌 곳에 다시 쓰지 않습니다.
- 명세에 `미정`인 내용은 추측해서 구현하지 않고 사람에게 묻습니다.
- README는 명세를 요약하지 않고 링크합니다. 실행 방법, 스크립트, 폴더 구조가 바뀌면 [README.md](README.md)를 같은 변경에서 고칩니다.

## git

| 항목 | 규칙 |
|---|---|
| 브랜치 | `main` + 작업 브랜치 `{type}/{설명}` (예: `feat/hero-section`) |
| 병합 | PR, squash merge |
| PR 제목 | `{type}: {설명}` (예: `feat: 메인 히어로 섹션 추가`) |
| type | `feat`, `fix`, `refactor`, `style`, `docs`, `build`, `ci`, `chore` |
| 언어 | type은 영어, 설명은 한국어 |

- 브랜치 안의 커밋 메시지는 자유입니다. `main`에는 PR 제목이 커밋 메시지로 남습니다.
- 사람이 요청하지 않으면 커밋, 푸시, PR 생성을 하지 않습니다.

## 로컬 메모

- `CLAUDE.local.md`, `.context/`, `.claude/settings.local.json`은 개인 로컬 파일이며 git에 올리지 않습니다.
- 로컬 메모는 공용 지침이 아닙니다. 팀이 함께 지킬 규칙이 되면 이 파일로 옮깁니다.

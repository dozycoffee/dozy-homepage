# dozy-homepage

Dozy Coffee 메인 홈페이지. `www.dozy.kr`로 접속하면 가장 먼저 보이는 공개 웹사이트다.

- 스택: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, pnpm
- 명세와 결정: [docs/](docs/README.md)

## 빠른 시작

Node.js 24와 pnpm이 필요하다.

```bash
pnpm install
pnpm dev
```

http://localhost:3000 에서 확인한다. 환경 변수가 필요해지면 [docs/configuration.md](docs/configuration.md)를 따른다.

## 스크립트

| 명령 | 내용 |
|---|---|
| `pnpm dev` | 개발 서버 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 빌드 결과 실행 |
| `pnpm lint` | ESLint 검사 |

PR 전에 `pnpm lint`와 `pnpm build`가 통과해야 한다.

## 디렉토리 구조

```text
dozy-homepage/
├─ AGENTS.md          에이전트 지침 (CLAUDE.md가 불러옴)
├─ docs/              명세와 ADR
│  ├─ pages/          사이트맵과 페이지별 명세
│  └─ adr/            결정과 이유
├─ public/            정적 파일 (이미지, 파비콘 등)
└─ src/
   └─ app/
      ├─ layout.tsx   공통 레이아웃, 기본 메타데이터, 폰트(Pretendard)
      ├─ page.tsx     메인 페이지 (/)
      └─ globals.css  Tailwind와 디자인 토큰
```

폴더별 역할과 규칙은 [docs/architecture.md](docs/architecture.md#폴더)에 있다.

## 문서

| 문서 | 내용 |
|---|---|
| [docs/README.md](docs/README.md) | 문서 안내, 담당 범위, 수정 규칙 |
| [docs/pages/](docs/pages/README.md) | 사이트맵, 페이지별 명세 |
| [docs/architecture.md](docs/architecture.md) | 렌더링 전략, 코드 규칙 |
| [docs/design-system.md](docs/design-system.md) | 디자인 토큰, 공통 컴포넌트 |
| [docs/seo.md](docs/seo.md) | 메타데이터, sitemap, robots |
| [docs/quality.md](docs/quality.md) | 성능, 접근성, 지원 브라우저 |
| [docs/configuration.md](docs/configuration.md) | 환경 변수, 배포, 도메인 |
| [docs/adr/](docs/adr/README.md) | 결정과 이유 |

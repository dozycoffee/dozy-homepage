# 0001. Next.js App Router, TypeScript, pnpm으로 만든다

- 상태: 채택
- 날짜: 2026-10-06

## 맥락

`www.dozy.kr`은 누구나 접속하는 공개 사이트입니다. 검색 노출과 SNS 공유 미리보기가 중요합니다. 관리자 콘솔(`dozy-admin-console`)은 React로 만들었습니다.

## 결정

- Next.js 16, App Router로 만듭니다.
- 언어는 TypeScript(`strict`)입니다. TypeScript 7은 Next.js 지원을 확인하기 전까지 쓰지 않고 5.9에 둡니다.
- 패키지 매니저는 pnpm입니다.

## 검토한 대안

- React + Vite (SPA): 관리자 콘솔과 같지만, 브라우저에서 화면을 그려 검색 엔진과 공유 미리보기에 불리합니다. 로그인 뒤에 쓰는 관리자 콘솔과 달리 공개 사이트에는 맞지 않습니다.
- Astro: 콘텐츠 위주 정적 사이트에는 더 가볍지만, 상품 정보 연동이나 로그인처럼 동적 기능이 늘면 React를 섞게 됩니다. 관리자 콘솔과 스택이 달라집니다.

## 결과

- 관리자 콘솔과 같은 React라서 컴포넌트 작성 방식이 같고, 나중에 디자인 토큰이나 컴포넌트를 공유하기 쉽습니다.
- Next.js 16은 이전 버전과 API가 많이 다릅니다. 설치된 버전의 문서(`node_modules/next/dist/docs/`)를 기준으로 작업합니다.

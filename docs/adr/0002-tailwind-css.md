# 0002. 스타일은 Tailwind CSS v4로 하고 토큰은 globals.css에 둔다

- 상태: 채택
- 날짜: 2026-10-06

## 맥락

디자인 값(색상, 폰트)을 한곳에서 관리해야 브랜드 가이드가 바뀔 때 한 번에 고칠 수 있습니다. 관리자 콘솔은 Tailwind 없이 CSS 파일 하나에 값을 직접 쓰고 있습니다.

## 결정

- Tailwind CSS v4를 씁니다.
- `tailwind.config` 파일을 두지 않고, `src/app/globals.css`의 `:root` CSS 변수와 `@theme inline`으로 토큰을 정의합니다.
- 컴포넌트에는 토큰 클래스만 쓰고 색상 값을 직접 쓰지 않습니다.

## 검토한 대안

- CSS Modules: 컴포넌트마다 CSS 파일이 늘고, 토큰을 쓰지 않은 값이 섞이기 쉽습니다.
- CSS-in-JS(styled-components 등): 서버 컴포넌트와 맞지 않는 부분이 있습니다.

## 결과

- 토큰 목록은 [design-system.md](../design-system.md)가 기준입니다.

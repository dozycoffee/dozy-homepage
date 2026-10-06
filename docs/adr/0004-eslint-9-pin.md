# 0004. ESLint는 eslint-plugin-react가 10을 지원할 때까지 9에 둔다

- 상태: 채택
- 날짜: 2026-10-06

## 맥락

ESLint 9.x는 npm에서 지원 종료(deprecated)로 표시됩니다. ESLint 10.12.0으로 올리면 `pnpm lint`가 실패합니다. `eslint-config-next` 16.3.8이 쓰는 `eslint-plugin-react` 7.37.5가 ESLint 10에서 제거된 `context.getFilename()`을 호출하기 때문입니다. 이 플러그인의 최신 버전도 지원 범위가 ESLint `^9.7`까지입니다.

## 결정

- ESLint는 `^9.39.5`에 둡니다.
- `eslint-plugin-react`(또는 `eslint-config-next`)가 ESLint 10을 지원하는 버전을 내면 올립니다.

## 검토한 대안

- ESLint 10 + 호환 우회(설정으로 React 버전 고정 등): 공식 지원 범위 밖이라 다른 규칙에서 또 깨질 수 있습니다.
- `eslint-config-next` 없이 직접 구성: Next.js 전용 규칙을 잃습니다.

## 결과

- 의존성을 업데이트할 때 `eslint-plugin-react`의 peer 범위를 확인합니다.

"use client";

import { useEffect } from "react";

/**
 * 주소의 해시가 이미 같은 링크(예: 지금 주소가 /#menu인데 "메뉴 보기"를 다시 누름)는
 * 주소가 바뀌지 않아 브라우저가 스크롤하지 않는다. 이때만 해당 섹션으로 직접 스크롤한다.
 * 클릭 이벤트는 막지 않으므로 링크의 다른 동작(모바일 메뉴 닫기 등)은 그대로다.
 */
export function SameHashScroll() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      if (!url.hash || url.hash !== location.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      // 링크 자체의 처리(Next.js 라우터)가 끝난 뒤에 스크롤한다.
      // scroll-behavior(부드러운 스크롤, 동작 줄이기 설정)와 scroll-padding-top을 그대로 따른다.
      if (target) setTimeout(() => target.scrollIntoView(), 0);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * 화면에 보이면 data-reveal을 "shown"으로 바꿔 자식이 차례로 나타나게 한다.
 * JS가 없거나 움직임 줄이기 설정이면 data-reveal을 달지 않아 처음부터 보인다.
 */
export function RevealOnView({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.dataset.reveal = "armed";
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.reveal = "shown";
      observer.disconnect();
    }, { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}

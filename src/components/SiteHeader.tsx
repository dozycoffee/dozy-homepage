"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { headerCta, headerNav, homeHref } from "@/lib/navigation";
import { ShortcutIcon } from "./ActionLink";
import { Logo } from "./Logo";

type SiteHeaderProps = {
  /** 커피콩 심볼 경로. 파일이 없으면 null (서버에서 확인해 넘긴다) */
  logoSrc: string | null;
};

/**
 * 모든 페이지 상단에 고정되는 헤더.
 * md 이상은 가로 메뉴와 가맹 안내 버튼, 모바일은 메뉴 열기 버튼으로 여닫는 목록.
 */
export function SiteHeader({ logoSrc }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // 메뉴를 닫으면 초점을 메뉴 열기 버튼으로 되돌린다.
  const close = () => {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // 살짝 비치는 배경. 아래로 지나가는 내용과 글자가 겹쳐 보이지 않게 흐림을 함께 준다.
  return (
    <header className="sticky top-0 z-30 bg-warm-white/85 shadow-[0_1px_0_var(--color-oat)] backdrop-blur-md">
      <div className="content-frame flex h-header items-center justify-between gap-6">
        <Link href={homeHref} className="-mx-1 flex min-h-11 items-center rounded-button px-1">
          <Logo symbolSrc={logoSrc} />
        </Link>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-5 md:flex lg:gap-8">
          <ul className="flex items-center gap-5 lg:gap-8">
            {headerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center rounded-button type-menu text-espresso underline-offset-6 transition-colors hover:underline hover:decoration-caramel hover:decoration-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* 강조: 상자 대신 글자 높이의 짧은 구분선(|) 뒤 굵은 글자와 바로가기 아이콘 */}
          <span aria-hidden className="h-4 w-px bg-espresso" />
          <Link
            href={headerCta.href}
            className="group flex min-h-11 items-center gap-2 rounded-button type-menu font-semibold text-espresso"
          >
            {headerCta.label}
            <ShortcutIcon />
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => (open ? close() : setOpen(true))}
          className="-mr-2.5 flex size-11 flex-col items-center justify-center gap-1.5 rounded-button md:hidden"
        >
          <span
            aria-hidden
            className={`h-0.5 w-5 bg-espresso transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
          />
          <span
            aria-hidden
            className={`h-0.5 w-5 bg-espresso transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <nav
        id={panelId}
        aria-label="주요 메뉴"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100svh-var(--header-height))] overflow-y-auto border-b border-oat bg-warm-white md:hidden"
      >
        <ul className="content-frame py-3">
          {headerNav.map((item) => (
            <li key={item.href} className="border-b border-oat last:border-b-0">
              <Link
                href={item.href}
                onClick={close}
                className="flex min-h-14 items-center text-xl font-semibold text-espresso"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="content-frame border-t border-oat pt-2 pb-6">
          <Link
            href={headerCta.href}
            onClick={close}
            className="group inline-flex min-h-11 items-center gap-2 rounded-button type-action text-espresso"
          >
            {headerCta.label}
            <ShortcutIcon className="size-5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { menuSection } from "@/content/home";

export type MenuAdSlide = { name: string; alt: string; desktopSrc: string; mobileSrc: string };

const subscribeMotion = (callback: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const subscribeVisibility = (callback: () => void) => {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
};

export function MenuAdCarousel({ slides }: { slides: MenuAdSlide[] }) {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);
  const visible = useSyncExternalStore(subscribeVisibility, () => document.visibilityState === "visible", () => false);
  const playing = !paused && !hovered && !keyboardFocus && inView && visible && !reducedMotion && slides.length > 1;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    if (frame.current) observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setSelected((value) => (value + 1) % slides.length), menuSection.intervalMs);
    return () => window.clearTimeout(timer);
  }, [playing, selected, slides.length]);

  const select = (index: number) => {
    setSelected((index + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;
  return (
    <div
      ref={frame}
      role="region"
      aria-roledescription={menuSection.carouselRole}
      aria-label={menuSection.carouselLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) setKeyboardFocus(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocus(false);
      }}
      className="menu-ad-carousel"
    >
      <div className="menu-ad-stage">
        <div className="menu-ad-track" style={{ transform: `translateX(-${selected * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={slide.name} role="group" aria-roledescription={menuSection.slideRole} aria-label={`${index + 1} / ${slides.length}: ${slide.name}`} aria-hidden={index !== selected} className="menu-ad-slide">
              <Link href={menuSection.allMenusLink.href} tabIndex={index === selected ? 0 : -1} className="absolute inset-0">
                <Image src={slide.desktopSrc} alt={slide.alt} width={3000} height={1000} sizes="100vw" quality={90} loading="lazy" className="menu-ad-desktop-image hidden md:block" />
                <Image src={slide.mobileSrc} alt={slide.alt} fill sizes="100vw" loading="lazy" className="object-contain md:hidden" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div role="group" aria-label={menuSection.paginationLabel} className="menu-ad-pagination">
        {slides.map((slide, index) => (
          <button
            key={slide.name}
            type="button"
            aria-label={menuSection.goToLabel.replace("{name}", slide.name)}
            aria-pressed={index === selected}
            onClick={() => select(index)}
            className="menu-ad-dot-button"
          >
            <span aria-hidden="true" className="menu-ad-dot" />
          </button>
        ))}
      </div>
      <p aria-live={playing ? "off" : "polite"} aria-atomic="true" className="sr-only">{selected + 1} / {slides.length}</p>
      {slides.length > 1 && (
        <button
          type="button"
          disabled={reducedMotion}
          aria-label={reducedMotion ? menuSection.motionOffLabel : paused ? menuSection.playLabel : menuSection.pauseLabel}
          onClick={() => setPaused((value) => !value)}
          className="sr-only focus:not-sr-only focus:absolute focus:bottom-gutter focus:left-gutter focus:z-10 focus:min-h-11 focus:rounded-button focus:bg-cream focus:px-4"
        >
          {reducedMotion ? menuSection.motionOffLabel : paused ? menuSection.playLabel : menuSection.pauseLabel}
        </button>
      )}
    </div>
  );
}

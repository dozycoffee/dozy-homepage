import Image, { getImageProps } from "next/image";
import { ActionLink } from "@/components/ActionLink";
import { Eyebrow } from "@/components/Eyebrow";
import { hero } from "@/content/home";
import { resolveImage, type ResolvedImage } from "@/lib/assets";

// 이미지가 화면 전체 폭을 채운다.
const DESKTOP_SIZES = "100vw";
const MOBILE_SIZES = "100vw";

/** 데스크톱·모바일 이미지 위치를 CSS 변수로 넘겨 브레이크포인트마다 다르게 맞춘다. */
const positionVars = (mobile?: string, desktop?: string) =>
  ({ "--pos-mobile": mobile ?? "center", "--pos-desktop": desktop ?? "center" }) as React.CSSProperties;

const imageClass = "object-cover object-(--pos-mobile) md:object-(--pos-desktop)";

/**
 * 화면 너비에 따라 데스크톱·모바일 이미지를 고른다.
 * 모바일 이미지가 없으면 데스크톱 이미지를 쓰고, 데스크톱 이미지가 없으면 md 이상은 배경색만 보인다.
 */
function HeroImage({ desktop, mobile }: { desktop: ResolvedImage | null; mobile: ResolvedImage | null }) {
  if (desktop && mobile) {
    const common = { fill: true, fetchPriority: "high", loading: "eager" } as const;
    const {
      props: { srcSet: mobileSrcSet },
    } = getImageProps({ ...common, src: mobile.src, alt: mobile.alt, sizes: MOBILE_SIZES });
    const { props } = getImageProps({ ...common, src: desktop.src, alt: desktop.alt, sizes: DESKTOP_SIZES });
    return (
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes={MOBILE_SIZES} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt는 getImageProps가 넣는다 */}
        <img
          {...props}
          className={imageClass}
          style={{ ...props.style, ...positionVars(mobile.position, desktop.position) }}
        />
      </picture>
    );
  }

  const only = desktop ?? mobile;
  if (!only) return null;
  return (
    <div className={desktop ? "contents" : "contents md:hidden"}>
      <Image
        src={only.src}
        alt={only.alt}
        fill
        sizes="100vw"
        fetchPriority="high"
        loading="eager"
        className={imageClass}
        style={positionVars(desktop ? hero.desktopImageMobilePosition : only.position, only.position)}
      />
    </div>
  );
}

export function HeroSection() {
  const desktop = resolveImage(hero.desktopImage);
  const mobile = resolveImage(hero.mobileImage);
  const hasDesktopImage = desktop !== null;

  return (
    // 헤더 높이만큼 위로 끌어올려 고정 헤더 뒤까지 첫 화면 전체(100svh)를 채운다. 헤더는 반투명이라 위에 겹쳐 보인다.
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative -mt-header flex min-h-svh flex-col bg-cream hero-wide:justify-center"
    >
      {/*
        배경 이미지가 헤더 아래 화면 전체를 채운다.
        가로로 넓은 화면(hero-wide): 이미지를 섹션 전체에 깔고 왼쪽에 글을 겹친다.
        그 밖(모바일, 세로 태블릿): 글을 위에 두고 그 아래 남은 화면을 이미지가 좌우 끝까지 채운다. 글이 음료를 가리지 않게 하기 위해서다.
      */}
      <div className="content-frame relative z-10 pt-[calc(var(--header-height)+2.5rem)] pb-8 md:pt-[calc(var(--header-height)+3.5rem)] md:pb-10 hero-wide:pt-[calc(var(--header-height)+4rem)] hero-wide:pb-16">
        <div className="hero-wide:max-w-[50%]">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 id="home-title" className="mt-4 type-display md:mt-5">
            {hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-4 type-lead md:mt-5">{hero.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-2 md:mt-8 hero-wide:mt-10">
            <ActionLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ActionLink>
            <ActionLink href={hero.secondaryCta.href} variant="underline">
              {hero.secondaryCta.label}
            </ActionLink>
          </div>
        </div>
      </div>

      <div className="relative min-h-72 flex-1 hero-wide:absolute hero-wide:inset-0">
        <HeroImage desktop={desktop} mobile={mobile} />
        {/* 이미지 위 글자의 가독성을 지키는 왼쪽 그라데이션 (hero-wide) */}
        {hasDesktopImage && (
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 hidden w-3/5 bg-linear-to-r from-cream via-cream/75 to-transparent hero-wide:block"
          />
        )}
      </div>
    </section>
  );
}

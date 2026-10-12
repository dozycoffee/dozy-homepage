import Image from "next/image";
import Link from "next/link";
import { menuSection } from "@/content/home";
import { resolveImage } from "@/lib/assets";

export function MenuSection() {
  const image = resolveImage(menuSection.signaturesImage);
  return (
    <section id="menu" aria-labelledby="menu-title">
      <h2 id="menu-title" className="sr-only">{menuSection.title}</h2>
      {image && (
        <Link href={menuSection.allMenusLink.href} className="relative block aspect-[1672/941] w-full max-h-[calc(100svh-var(--header-height))] overflow-hidden bg-cream">
          {/* 화면이 이미지보다 넓고 낮으면 이미지를 줄여 상하가 잘리지 않게 하고, 남는 좌우는 같은 이미지를 흐리게 깔아 메운다. */}
          <Image src={image.src} alt="" aria-hidden fill sizes="10vw" quality={75} className="scale-110 object-cover blur-2xl" />
          <Image src={image.src} alt={image.alt} fill sizes="100vw" quality={90} className="object-contain" />
        </Link>
      )}
    </section>
  );
}

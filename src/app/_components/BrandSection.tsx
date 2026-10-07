import { MediaImage } from "@/components/MediaImage";
import { brandSection } from "@/content/home";
import { resolveImage } from "@/lib/assets";
import { SectionHeader } from "./SectionHeader";

/** 매장 공간 사진을 넓게 두고, 글은 사진 위에 겹치지 않고 아래에 둔다. */
export function BrandSection() {
  return (
    <section id="brand" aria-labelledby="brand-title" className="screen-section">
      <div className="content-frame">
        <MediaImage
          image={resolveImage(brandSection.image)}
          fit="cover"
          className="aspect-[4/3] rounded-panel md:aspect-auto md:h-[clamp(20rem,calc(100svh-var(--header-height)-2*var(--section-y)-12rem),37.5rem)]"
          sizes="(min-width: 1200px) 1200px, calc(100vw - 4rem)"
        />
        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 md:items-end md:gap-12">
          <SectionHeader id="brand-title" eyebrow={brandSection.eyebrow} title={brandSection.title} />
          <p className="max-w-prose type-lead">{brandSection.description}</p>
        </div>
      </div>
    </section>
  );
}

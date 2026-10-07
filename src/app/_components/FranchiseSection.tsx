import { ActionLink } from "@/components/ActionLink";
import { MediaImage } from "@/components/MediaImage";
import { StatusLabel } from "@/components/StatusLabel";
import { franchiseSection } from "@/content/home";
import { siteConfig } from "@/content/site";
import { resolveImage } from "@/lib/assets";
import { isUsableUrl } from "@/lib/links";

/**
 * 예비 점주용 안내. 고객용 섹션보다 눈에 덜 띄게: 작은 사진, 보조 버튼.
 * 가맹 안내 주소가 없으면 버튼 대신 "준비 중" 상태 문구를 보여 준다.
 */
export function FranchiseSection() {
  const href = siteConfig.links.franchise;

  return (
    <section id="franchise" aria-labelledby="franchise-title" className="screen-section border-t border-oat">
      <div className="content-frame grid items-center gap-8 md:grid-cols-[5fr_7fr] md:gap-12 lg:gap-16">
        <MediaImage
          image={resolveImage(franchiseSection.image)}
          fit="cover"
          className="aspect-[4/3] rounded-panel"
          sizes="(min-width: 1200px) 460px, (min-width: 768px) 40vw, 100vw"
        />
        <div>
          <h2 id="franchise-title" className="type-title">
            {franchiseSection.title}
          </h2>
          <p className="mt-3 max-w-prose type-lead md:mt-4">{franchiseSection.description}</p>
          <div className="mt-6 md:mt-8">
            {isUsableUrl(href) ? (
              <ActionLink href={href}>{franchiseSection.ctaLabel}</ActionLink>
            ) : (
              <StatusLabel>{franchiseSection.pendingLabel}</StatusLabel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

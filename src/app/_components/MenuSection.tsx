import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { MediaImage } from "@/components/MediaImage";
import { menuSection } from "@/content/home";
import type { MenuItem } from "@/content/types";
import { resolveImage } from "@/lib/assets";
import { getMenuItems } from "@/lib/content";
import { isUsableUrl } from "@/lib/links";
import { MenuTabs } from "./MenuTabs";
import { SectionHeader } from "./SectionHeader";

const priceFormatter = new Intl.NumberFormat("ko-KR");

function MenuCard({ item }: { item: MenuItem }) {
  const hasDetail = isUsableUrl(item.detailUrl);
  return (
    <li className="group relative flex flex-col">
      <MediaImage
        image={resolveImage(item.image)}
        fit="contain"
        className="aspect-square rounded-card"
        sizes="(min-width: 1200px) 280px, (min-width: 768px) 33vw, 50vw"
      />
      <div className="flex flex-1 flex-col gap-1 pt-4 md:pt-5">
        <h3 className="type-card-title">
          {hasDetail ? (
            // 카드 전체를 누를 수 있게 링크 영역을 카드 크기로 넓힌다.
            <Link
              href={item.detailUrl!}
              className="rounded-button underline-offset-4 after:absolute after:inset-0 group-hover:underline"
            >
              {item.name}
            </Link>
          ) : (
            item.name
          )}
        </h3>
        <p className="type-caption md:type-body">{item.description}</p>
        {item.price !== undefined && (
          <p className="mt-auto pt-2 type-body font-semibold">{priceFormatter.format(item.price)}원</p>
        )}
      </div>
    </li>
  );
}

export function MenuSection() {
  const items = getMenuItems();
  const panels = Object.fromEntries(
    menuSection.categories.map((category) => {
      const inCategory = items.filter((item) => item.category === category.id);
      return [
        category.id,
        inCategory.length > 0 ? (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {inCategory.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </ul>
        ) : (
          <EmptyState>{menuSection.emptyMessage}</EmptyState>
        ),
      ];
    }),
  );

  return (
    <section id="menu" aria-labelledby="menu-title" className="screen-section">
      <div className="content-frame">
        <SectionHeader id="menu-title" title={menuSection.title} description={menuSection.description} />
        <div className="mt-8 md:mt-10">
          <MenuTabs
            label={menuSection.tabsLabel}
            categories={[...menuSection.categories]}
            initialCategory={menuSection.initialCategory}
            panels={panels}
          />
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { MediaImage } from "@/components/MediaImage";
import { newsSection } from "@/content/home";
import type { NewsItem } from "@/content/types";
import { resolveImage } from "@/lib/assets";
import { getNewsItems } from "@/lib/content";
import { isExternalUrl, isUsableUrl } from "@/lib/links";
import { SectionHeader } from "./SectionHeader";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "Asia/Seoul",
});

const formatDate = (date: string) => dateFormatter.format(new Date(`${date}T00:00:00+09:00`));

function NewsTitle({ item }: { item: NewsItem }) {
  if (!isUsableUrl(item.url)) return item.title;
  // 카드 전체를 누를 수 있게 링크 영역을 카드 크기로 넓힌다.
  const className = "rounded-button underline-offset-4 after:absolute after:inset-0 group-hover:underline";
  return isExternalUrl(item.url) ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className={className}>
      {item.title}
      <span className="sr-only"> (새 창)</span>
    </a>
  ) : (
    <Link href={item.url} className={className}>
      {item.title}
    </Link>
  );
}

export function NewsSection() {
  const items = getNewsItems().slice(0, newsSection.limit);

  return (
    <section id="news" aria-labelledby="news-title" className="screen-section">
      <div className="content-frame">
        <SectionHeader id="news-title" title={newsSection.title} />
        {items.length === 0 ? (
          <EmptyState className="mt-8 md:mt-10">{newsSection.emptyMessage}</EmptyState>
        ) : (
          <ul className="mt-8 grid gap-10 md:mt-10 md:grid-cols-3 md:gap-6 lg:gap-8">
            {items.map((item) => (
              <li key={item.id} className="group relative flex flex-col">
                <MediaImage
                  image={resolveImage(item.image)}
                  fit="cover"
                  className="aspect-[4/3] rounded-card"
                  sizes="(min-width: 1200px) 380px, (min-width: 768px) 33vw, 100vw"
                />
                <div className="flex flex-1 flex-col pt-5">
                  <p className="type-caption font-semibold">{item.category}</p>
                  <h3 className="mt-2 type-card-title">
                    <NewsTitle item={item} />
                  </h3>
                  <time dateTime={item.date} className="mt-auto pt-3 type-caption tabular-nums">
                    {formatDate(item.date)}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

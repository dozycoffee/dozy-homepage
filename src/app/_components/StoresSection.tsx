import { storesSection } from "@/content/home";
import { resolveImage } from "@/lib/assets";
import { getStores } from "@/lib/content";
import { StoreFinder, type StoreCardData } from "./StoreFinder";

export function StoresSection() {
  const defaultImage = resolveImage(storesSection.defaultImage);
  const stores: StoreCardData[] = getStores().map(({ image, ...store }) => ({
    ...store,
    // 매장 사진이 없거나 파일이 없으면 기본 매장 이미지
    image: resolveImage(image) ?? defaultImage,
  }));
  const { title, searchLabel, searchButton, resultCount, noResultsMessage, emptyMessage, detailLabel, mapLabel } =
    storesSection;
  const copy = { searchLabel, searchButton, resultCount, noResultsMessage, emptyMessage, detailLabel, mapLabel };

  return (
    <section id="stores" aria-labelledby="stores-title" className="screen-section bg-cream">
      <div className="content-frame">
        <StoreFinder
          heading={
            <h2 id="stores-title" className="type-title">
              {title}
            </h2>
          }
          stores={stores}
          copy={copy}
        />
      </div>
    </section>
  );
}

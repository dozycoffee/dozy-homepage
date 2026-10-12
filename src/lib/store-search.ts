import type { Store } from "@/content/types";

export const STORES_PER_PAGE = 12;
const normalize = (value: string) => value.toLocaleLowerCase("ko-KR").replace(/\s+/g, "");

export function filterStores(stores: Store[], query: string, region: string) {
  const keyword = normalize(query);
  const terms = query.trim().split(/\s+/).map(normalize).filter(Boolean);
  return stores.filter((store) => {
    const { address } = store;
    const searchable = normalize([
      store.name, address.sido, address.sigungu, address.roadAddress, address.detailAddress ?? "",
    ].join(" "));
    return (!region || address.sido === region) && (searchable.includes(keyword) || terms.every((term) => searchable.includes(term)));
  });
}

export function storeSearchHref(query: string, region: string, page = 1) {
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query.trim());
  if (region) params.set("sido", region);
  if (page > 1) params.set("page", String(page));
  return `/stores${params.size ? `?${params}` : ""}`;
}

export function getStorePage(rawPage: string | null, totalPages: number) {
  const parsed = rawPage && /^\d+$/.test(rawPage) ? Number(rawPage) : 1;
  return Math.min(Math.max(Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1, 1), totalPages);
}

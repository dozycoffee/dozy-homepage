"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ActionLink } from "@/components/ActionLink";
import { EmptyState } from "@/components/EmptyState";
import { StoreSearchForm } from "@/components/StoreSearchForm";
import { storesUI } from "@/content/stores-ui";
import type { Store } from "@/content/types";
import { filterStores, getStorePage, storeSearchHref, STORES_PER_PAGE } from "@/lib/store-search";

function StoreInformation({ store, demo }: { store: Store; demo: boolean }) {
  const { address } = store;
  const mapUrl = `https://map.naver.com/p/search/${encodeURIComponent(address.roadAddress)}`;
  return (
    <li className="border-t border-oat py-6">
      <p className="mb-2 type-caption">{address.sido} · {address.sigungu}</p>
      <h3 className="type-card-title">{store.name}</h3>
      <dl className="mt-4 space-y-3 type-body">
        <div><dt className="sr-only">{storesUI.addressLabel}</dt><dd>{address.roadAddress}{address.detailAddress && `, ${address.detailAddress}`}</dd></div>
        <div className="flex flex-wrap gap-x-3"><dt>{storesUI.postalCodeLabel}</dt><dd>{address.postalCode}</dd></div>
        <div className="flex flex-wrap gap-x-3"><dt>{storesUI.phoneLabel}</dt><dd>{demo ? store.phone : <a href={`tel:${store.phone}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{store.phone}</a>}</dd></div>
        <div className="flex flex-wrap gap-x-3"><dt>{storesUI.openingDateLabel}</dt><dd><time dateTime={store.openingDate}>{store.openingDate.replaceAll("-", ". ")}</time></dd></div>
      </dl>
      {!demo && <ActionLink href={mapUrl} variant="underline" className="mt-3">{storesUI.mapLabel}<span className="sr-only">: {store.name}</span></ActionLink>}
    </li>
  );
}

export function StoreResults({ stores, demo }: { stores: Store[]; demo: boolean }) {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const requestedRegion = params.get("sido") ?? "";
  const regions = [...new Set(stores.map((store) => store.address.sido))].sort((a, b) => a.localeCompare(b, "ko-KR"));
  const region = regions.includes(requestedRegion) ? requestedRegion : "";
  const results = filterStores(stores, query, region);
  const totalPages = Math.max(1, Math.ceil(results.length / STORES_PER_PAGE));
  const page = getStorePage(params.get("page"), totalPages);
  const visibleStores = results.slice((page - 1) * STORES_PER_PAGE, page * STORES_PER_PAGE);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <div key={`${query}/${region}`}><StoreSearchForm id="stores-search" query={query} region={region} regions={regions} /></div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p role="status" className="type-caption font-semibold">{storesUI.resultCount.replace("{count}", String(results.length))}</p>
        <ActionLink href="/stores" variant="underline">{storesUI.allStores}</ActionLink>
      </div>
      {stores.length === 0 ? <EmptyState>{storesUI.emptyMessage}</EmptyState> : results.length === 0 ? (
        <EmptyState>{storesUI.noResultsMessage}</EmptyState>
      ) : (
        <>
          <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
            {visibleStores.map((store) => <StoreInformation key={store.name} store={store} demo={demo} />)}
          </ul>
          {totalPages > 1 && (
            <nav aria-label={storesUI.paginationLabel} className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-oat pt-6">
              {page > 1 && <Link href={storeSearchHref(query, region, page - 1)} className="inline-flex min-h-11 items-center px-3 type-body">{storesUI.previousLabel}</Link>}
              {pages.map((number) => <Link key={number} href={storeSearchHref(query, region, number)} aria-current={number === page ? "page" : undefined}
                aria-label={storesUI.pageLabel.replace("{page}", String(number))}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center border-b-2 type-body ${number === page ? "border-espresso font-semibold" : "border-transparent hover:border-oat"}`}>{number}</Link>)}
              {page < totalPages && <Link href={storeSearchHref(query, region, page + 1)} className="inline-flex min-h-11 items-center px-3 type-body">{storesUI.nextLabel}</Link>}
            </nav>
          )}
        </>
      )}
    </div>
  );
}

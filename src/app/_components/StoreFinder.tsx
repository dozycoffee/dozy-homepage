"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowLine } from "@/components/ActionLink";
import { MediaImage } from "@/components/MediaImage";
import type { ResolvedImage } from "@/lib/assets";
import { isExternalUrl, isUsableUrl } from "@/lib/links";

/** 화면에 넘기는 매장. 이미지는 서버에서 파일을 확인해 넘긴다. */
export type StoreCardData = {
  id: string;
  name: string;
  region: string;
  address: string;
  hours: string;
  image: ResolvedImage | null;
  detailUrl?: string;
  mapUrl?: string;
};

type StoreFinderProps = {
  heading: React.ReactNode;
  stores: StoreCardData[];
  copy: {
    searchLabel: string;
    searchButton: string;
    resultCount: string;
    noResultsMessage: string;
    emptyMessage: string;
    detailLabel: string;
    mapLabel: string;
  };
};

const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, "");

/** 지역·매장명·주소에 검색어가 들어간 매장만 남긴다. 빈 검색어는 전체. */
function filterStores(stores: StoreCardData[], query: string) {
  const keyword = normalize(query);
  if (!keyword) return stores;
  return stores.filter((store) =>
    [store.region, store.name, store.address].some((field) => normalize(field).includes(keyword)),
  );
}

function StoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "inline-flex min-h-11 items-center rounded-button type-body font-semibold underline decoration-oat decoration-2 underline-offset-6 hover:decoration-espresso";
  if (isExternalUrl(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <span className="sr-only"> (새 창)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function StoreCard({ store, copy }: { store: StoreCardData; copy: StoreFinderProps["copy"] }) {
  const links = [
    { label: copy.detailLabel, href: store.detailUrl },
    { label: copy.mapLabel, href: store.mapUrl },
  ].filter((link): link is { label: string; href: string } => isUsableUrl(link.href));

  return (
    <li className="flex flex-col">
      <MediaImage
        image={store.image}
        fit="cover"
        tone="oat"
        className="aspect-[4/3] rounded-card"
        sizes="(min-width: 1200px) 360px, (min-width: 768px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="type-card-title">{store.name}</h3>
        <dl className="mt-2 flex flex-col gap-1 type-caption md:type-body">
          <div>
            <dt className="sr-only">주소</dt>
            <dd>{store.address}</dd>
          </div>
          <div>
            <dt className="sr-only">영업시간</dt>
            <dd>{store.hours}</dd>
          </div>
        </dl>
        {links.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-x-5 pt-3">
            {links.map((link) => (
              <li key={link.label}>
                <StoreLink href={link.href}>
                  {link.label}
                  <span className="sr-only">: {store.name}</span>
                </StoreLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

/** 매장 검색. 검색 버튼(또는 Enter)을 누르면 결과를 바꾼다. */
export function StoreFinder({ heading, stores, copy }: StoreFinderProps) {
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const inputId = useId();
  const results = filterStores(stores, appliedQuery);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
      <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
        {heading}
        <form
          role="search"
          className="mt-8"
          onSubmit={(event) => {
            event.preventDefault();
            setAppliedQuery(query);
          }}
        >
          <label htmlFor={inputId} className="block type-caption font-semibold">
            {copy.searchLabel}
          </label>
          {/* 상자 대신 밑줄 하나로 입력 영역을 보여 준다 */}
          {/* 입력창은 클릭해도 :focus-visible이 되므로 외곽선 대신 밑줄을 4px로 두껍게 해 초점을 보인다 */}
          <div className="mt-1 flex items-center gap-4 border-b-2 border-espresso transition-shadow has-[input:focus]:shadow-[0_2px_0_var(--color-espresso)]">
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-h-14 min-w-0 flex-1 bg-transparent text-xl text-espresso focus-visible:outline-none"
            />
            <button
              type="submit"
              className="group flex min-h-11 shrink-0 items-center gap-3 rounded-button type-action text-espresso"
            >
              {copy.searchButton}
              <ArrowLine className="w-8" />
            </button>
          </div>
        </form>
      </div>

      <div>
        {/* 검색 뒤 결과를 화면 읽기 프로그램에 알린다. */}
        <p role="status" className="mb-4 type-caption font-semibold empty:hidden">
          {stores.length > 0 && results.length > 0
            ? copy.resultCount.replace("{count}", String(results.length))
            : ""}
        </p>
        {stores.length === 0 ? (
          <p className="border-t border-espresso pt-6 type-lead">{copy.emptyMessage}</p>
        ) : results.length === 0 ? (
          <p className="border-t border-espresso pt-6 type-lead">{copy.noResultsMessage}</p>
        ) : (
          <ul className="grid gap-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8">
            {results.map((store) => (
              <StoreCard key={store.id} store={store} copy={copy} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

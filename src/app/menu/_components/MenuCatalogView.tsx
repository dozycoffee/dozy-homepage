"use client";

import { useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { MediaImage } from "@/components/MediaImage";
import { menuUI as menuSection, menuPage } from "@/content/menu-ui";
import { MenuLoadState } from "@/components/MenuLoadState";
import { useMenuCatalog } from "@/lib/use-menu-catalog";
import type { MenuProduct } from "@/content/types";
import { MenuTabs } from "@/components/MenuTabs";

const priceFormatter = new Intl.NumberFormat("ko-KR");

function MenuCard({ product }: { product: MenuProduct }) {
  return (
    <li className="flex flex-col">
      <MediaImage
        image={product.imageUrl ? { src: product.imageUrl, alt: product.name } : null}
        fit="contain"
        className="aspect-square rounded-card"
        sizes="(min-width: 1200px) 280px, (min-width: 768px) 33vw, 50vw"
      />
      <div className="flex flex-1 flex-col gap-1 pt-4 md:pt-5">
        <h4 className="type-card-title">{product.name}</h4>
        {product.description && <p className="type-caption md:type-body">{product.description}</p>}
        <p className="mt-auto pt-2 type-body font-semibold">{priceFormatter.format(product.basePrice)}원</p>
      </div>
    </li>
  );
}

function ProductList({ products }: { products: MenuProduct[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
      {products.map((product) => <MenuCard key={product.name} product={product} />)}
    </ul>
  );
}

export function MenuCatalogView() {
  const { state, retry } = useMenuCatalog();
  const [query, setQuery] = useState("");
  if (state.status !== "ready") return <MenuLoadState status={state.status} retry={retry} />;

  const { catalog } = state;
  if (catalog.categories.length === 0 || catalog.products.length === 0) {
    return <div role="status"><EmptyState>{menuSection.emptyMessage}</EmptyState></div>;
  }
  const search = query.trim().replace(/\s/g, "").toLocaleLowerCase("ko-KR");
  const matches = catalog.products.filter((product) =>
    `${product.name} ${product.description ?? ""}`.replace(/\s/g, "").toLocaleLowerCase("ko-KR").includes(search),
  );
  const panels = Object.fromEntries(catalog.categories.map((category) => {
    const hasProducts = matches.some((product) => category.children.includes(product.category));
    return [`category-${category.name}`, hasProducts ? (
      <div className="space-y-10">
        {category.children.map((child) => {
          const products = matches.filter((product) => product.category === child);
          if (products.length === 0) return null;
          return (
            <div key={child}>
              <h3 className="mb-6 type-lead font-semibold">{child}</h3>
              <ProductList products={products} />
            </div>
          );
        })}
      </div>
    ) : <EmptyState>{search ? menuPage.noResultsMessage : menuSection.emptyMessage}</EmptyState>];
  }));
  const signatureProducts = matches.filter((product) =>
    product.tagNames.includes(menuSection.signatureTagName),
  );
  const hasSignature = catalog.products.some((product) => product.tagNames.includes(menuSection.signatureTagName));
  panels["tag-signature"] = signatureProducts.length > 0 ? (
    <div>
      <h3 className="mb-6 type-lead font-semibold">{menuSection.signatureTitle}</h3>
      <ProductList products={signatureProducts} />
    </div>
  ) : <EmptyState>{search ? menuPage.noResultsMessage : menuSection.emptyMessage}</EmptyState>;

  panels["all"] = matches.length > 0 ? (
    <div><h3 className="sr-only">{menuPage.allProductsTitle}</h3><ProductList products={matches} /></div>
  ) : <EmptyState>{search ? menuPage.noResultsMessage : menuSection.emptyMessage}</EmptyState>;

  const counts = Object.fromEntries(catalog.categories.map((category) => [
    `category-${category.name}`, matches.filter((product) => category.children.includes(product.category)).length,
  ]));
  counts.all = matches.length;
  counts["tag-signature"] = signatureProducts.length;
  const countedPanels = Object.fromEntries(Object.entries(panels).map(([id, panel]) => [id, (
    <div key={id}>
      <p role="status" className="mb-6 type-caption">{menuPage.resultCount.replace("{count}", String(counts[id]))}</p>
      {panel}
    </div>
  )]));
  return (
    <div>
      <label className="block type-body" htmlFor="menu-search">{menuPage.searchLabel}</label>
      <input id="menu-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={menuPage.searchPlaceholder}
        className="mt-2 mb-6 min-h-12 w-full border-b border-espresso bg-transparent type-lead" />
    <MenuTabs
      label={menuSection.tabsLabel}
      categories={[
        { id: "all", label: menuPage.allLabel },
        ...(hasSignature ? [{ id: "tag-signature", label: menuSection.signatureTabLabel }] : []),
        ...catalog.categories.map((category) => ({ id: `category-${category.name}`, label: category.name })),
      ]}
      initialCategory="all"
      panels={countedPanels}
    />
    </div>
  );
}

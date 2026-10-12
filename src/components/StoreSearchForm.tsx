import Form from "next/form";
import { ArrowLine } from "@/components/ActionLink";
import { storesUI } from "@/content/stores-ui";

type StoreSearchFormProps = {
  id: string;
  query?: string;
  region?: string;
  regions?: string[];
  /** bar: 사진 위에 띄우는 한 줄 검색창(라벨은 화면 읽기용) */
  variant?: "default" | "bar";
};

/** 검색 조건을 URL에 담아 매장 페이지로 이동한다. */
export function StoreSearchForm({ id, query = "", region = "", regions, variant = "default" }: StoreSearchFormProps) {
  if (variant === "bar") {
    return (
      <Form action="/stores" role="search" aria-label={storesUI.searchButton}
        className="flex items-center gap-3 rounded-full bg-warm-white py-2 pl-5 pr-2 shadow-lg sm:pl-6 shadow-espresso/20">
        <label htmlFor={`${id}-query`} className="sr-only">{storesUI.searchLabel}</label>
        <input id={`${id}-query`} name="q" type="search" defaultValue={query} placeholder={storesUI.searchPlaceholder}
          className="min-h-12 min-w-0 flex-1 bg-transparent type-lead text-espresso placeholder:text-espresso/60 focus-visible:outline-none" />
        <button type="submit" className="group flex min-h-12 shrink-0 items-center gap-3 rounded-full bg-espresso px-5 type-action text-warm-white">
          {storesUI.searchButton}<ArrowLine className="hidden w-6 sm:block" />
        </button>
      </Form>
    );
  }
  return (
    <Form action="/stores" role="search" aria-label={storesUI.searchButton} className="flex flex-col gap-5 md:flex-row md:items-end">
      {regions && (
        <div className="md:shrink-0">
          <label htmlFor={`${id}-region`} className="block type-caption font-semibold">{storesUI.regionLabel}</label>
          <select id={`${id}-region`} name="sido" defaultValue={region} className="mt-1 min-h-14 w-full border-b-2 border-espresso bg-transparent pr-8 type-body">
            <option value="">{storesUI.allRegions}</option>
            {regions.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <label htmlFor={`${id}-query`} className="block type-caption font-semibold">{storesUI.searchLabel}</label>
        <div className="store-search-field mt-1 flex items-center gap-3 border-b-2 border-espresso">
          <input id={`${id}-query`} name="q" type="search" defaultValue={query} placeholder={storesUI.searchPlaceholder}
            className="min-h-14 min-w-0 flex-1 bg-transparent type-lead text-espresso placeholder:text-espresso focus-visible:outline-none" />
          <button type="submit" className="group flex min-h-11 shrink-0 items-center gap-3 rounded-button type-action">
            {storesUI.searchButton}<ArrowLine className="w-8" />
          </button>
        </div>
      </div>
    </Form>
  );
}

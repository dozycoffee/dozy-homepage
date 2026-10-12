import type { Metadata } from "next";
import { Suspense } from "react";
import { storesPage, storesUI } from "@/content/stores-ui";
import { getStores } from "@/lib/content";
import { showDemoData } from "@/lib/site";
import { StoreResults } from "./_components/StoreResults";

export const metadata: Metadata = {
  title: storesPage.metadataTitle,
  description: storesPage.metadataDescription,
  alternates: { canonical: "/stores" },
};

export default function StoresPage() {
  return (
    <main className="flex-1 section-space">
      <div className="content-frame">
        <h1 className="type-title">{storesPage.title}</h1>
        <p className="mt-3 max-w-prose type-lead">{storesPage.description}</p>
        {showDemoData && <p className="mt-6 border-l-2 border-espresso pl-4 type-caption">{storesPage.demoNotice}</p>}
        <section aria-labelledby="store-results-title" className="mt-8 md:mt-10">
          <h2 id="store-results-title" className="sr-only">{storesPage.listTitle}</h2>
          <Suspense fallback={<p role="status" className="type-body">{storesUI.loadingMessage}</p>}>
            <StoreResults stores={getStores()} demo={showDemoData} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}

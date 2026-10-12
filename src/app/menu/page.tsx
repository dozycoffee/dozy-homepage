import type { Metadata } from "next";
import { menuPage } from "@/content/menu-ui";
import { MenuCatalogView } from "./_components/MenuCatalogView";

export const metadata: Metadata = {
  title: menuPage.metadataTitle,
  description: menuPage.metadataDescription,
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <main className="flex-1 section-space">
      <div className="content-frame">
        <h1 className="type-title">{menuPage.title}</h1>
        <p className="mt-3 type-lead">{menuPage.description}</p>
        <section aria-labelledby="menu-list-title" className="mt-8 md:mt-10">
          <h2 id="menu-list-title" className="sr-only">{menuPage.listTitle}</h2>
          <MenuCatalogView />
        </section>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { BrandSection } from "./_components/BrandSection";
import { FranchiseSection } from "./_components/FranchiseSection";
import { HeroSection } from "./_components/HeroSection";
import { MenuSection } from "./_components/MenuSection";
import { NewsSection } from "./_components/NewsSection";
import { OrderAppSection } from "./_components/OrderAppSection";
import { StoresSection } from "./_components/StoresSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// 섹션 순서와 ID는 docs/pages/home.md가 기준이다.
export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <MenuSection />
      <OrderAppSection />
      <BrandSection />
      <StoresSection />
      <NewsSection />
      <FranchiseSection />
    </main>
  );
}

import Image from "next/image";
import { siteConfig } from "@/content/site";

type LogoProps = {
  /** 커피콩 심볼 경로. 파일이 없으면 null이고 브랜드명 글자만 보인다. */
  symbolSrc: string | null;
};

/** 커피콩 심볼 + 브랜드명. 심볼은 원래 비율 그대로 높이만 맞춘다. */
export function Logo({ symbolSrc }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2 text-espresso">
      {symbolSrc && (
        <Image src={symbolSrc} alt="" width={32} height={32} unoptimized loading="eager" className="h-8 w-auto" />
      )}
      <span className="text-lg font-semibold tracking-tight">{siteConfig.brandName}</span>
    </span>
  );
}

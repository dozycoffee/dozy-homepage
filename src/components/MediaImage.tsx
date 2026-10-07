import Image from "next/image";
import type { ResolvedImage } from "@/lib/assets";

type MediaImageProps = {
  /** 파일이 없으면 null. 그러면 배경색 자리만 보인다. */
  image: ResolvedImage | null;
  /** 이미지 영역의 비율, 모서리 등. 비율을 꼭 정해 레이아웃이 흔들리지 않게 한다. */
  className: string;
  sizes: string;
  /** contain: 로고·메뉴 제품 / cover: 매장·외관·소식 */
  fit: "contain" | "cover";
  /** 자리 배경색. 놓이는 섹션 배경과 다르게 고른다. */
  tone?: "cream" | "oat";
  /** 첫 화면 이미지만 true. 나머지는 지연 로드한다. */
  priority?: boolean;
};

const tones = { cream: "bg-cream", oat: "bg-oat/50" };

/** 이미지 자리. 파일이 있으면 이미지를, 없으면 같은 크기의 배경색 상자를 그린다. */
export function MediaImage({ image, className, sizes, fit, tone = "cream", priority }: MediaImageProps) {
  return (
    <div className={`relative overflow-hidden ${tones[tone]} ${className}`}>
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? "eager" : "lazy"}
          className={fit === "contain" ? "object-contain" : "object-cover"}
          style={{ objectPosition: image.position }}
        />
      )}
    </div>
  );
}

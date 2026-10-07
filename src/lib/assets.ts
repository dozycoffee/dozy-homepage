// 이미지 자리의 파일이 실제로 있는지 확인한다. 서버(빌드)에서만 쓴다.
// 정적 생성이라 파일을 추가하면 다시 배포했을 때 표시된다. 개발 서버는 새로고침하면 바로 반영된다.

import { existsSync } from "node:fs";
import { join } from "node:path";
import type { ImageSlot } from "@/content/types";

/** 화면에 넘기는 이미지. 파일이 없으면 이 값 대신 null을 넘긴다. */
export type ResolvedImage = {
  src: string;
  alt: string;
  position?: string;
};

const PUBLIC_DIR = join(process.cwd(), "public");

/** `public/` 아래 파일이 있으면 경로를, 없으면 null을 돌려준다. 외부 주소는 아직 지원하지 않는다. */
export function resolveAsset(src: string | null | undefined): string | null {
  if (!src || !src.startsWith("/") || src.includes("..")) return null;
  return existsSync(join(PUBLIC_DIR, src)) ? src : null;
}

export function resolveImage(slot: ImageSlot | null | undefined): ResolvedImage | null {
  const src = resolveAsset(slot?.src);
  return slot && src ? { ...slot, src } : null;
}

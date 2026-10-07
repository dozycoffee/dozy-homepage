import type { ImageSlot } from "./types";

/** 이미지 자리를 만든다. 파일은 `public/assets/images/{file}`에 둔다 (docs/design-system.md 이미지). */
export const imageSlot = (file: string, alt: string, position?: string): ImageSlot => ({
  src: `/assets/images/${file}`,
  alt,
  position,
});

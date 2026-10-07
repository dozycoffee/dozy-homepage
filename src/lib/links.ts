// 링크 주소 검사. 갈 곳이 없는 링크는 만들지 않는다 (docs/pages/home.md).

/** 실제 목적지가 있는 주소인지. 빈 값, `#`, 알 수 없는 형식은 링크로 쓰지 않는다. */
export function isUsableUrl(url: string | null | undefined): url is string {
  if (!url) return false;
  const value = url.trim();
  if (value === "" || value === "#" || value.startsWith("#!")) return false;
  return /^(\/|#[\w-]+|https?:\/\/|mailto:|tel:)/.test(value);
}

export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}

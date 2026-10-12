import type { MenuCatalog } from "@/content/types";

const menuUrl = process.env.NEXT_PUBLIC_MENU_API_URL || "/data/menu.json";
const allowedTags = new Set(["신메뉴", "베스트", "시즌한정", "추천", "시그니처"]);

function check(condition: unknown): asserts condition {
  if (!condition) throw new Error("Invalid menu catalog");
}

function record(value: unknown): Record<string, unknown> {
  check(value !== null && typeof value === "object" && !Array.isArray(value));
  return value as Record<string, unknown>;
}

function array(value: unknown): unknown[] {
  check(Array.isArray(value));
  return value;
}

function name(value: unknown): string {
  check(typeof value === "string" && value.trim().length > 0);
  return value;
}

function names(value: unknown): string[] {
  const result = array(value).map(name);
  check(new Set(result).size === result.length);
  return result;
}

function money(value: unknown) {
  check(typeof value === "number" && Number.isSafeInteger(value) && value >= 0);
  return value;
}

function uniqueName(value: unknown, seen: Set<string>) {
  const result = name(value);
  check(!seen.has(result));
  seen.add(result);
  return result;
}

/** JSON과 API 응답은 같은 계약을 사용한다. 잘못된 참조는 화면에 넘기지 않는다. */
export function parseMenuCatalog(value: unknown): MenuCatalog {
  const data = record(value);
  const categoryNames = new Set<string>();
  const children = new Set<string>();
  const optionNames = new Set<string>();
  const productNames = new Set<string>();
  const categories = array(data.categories).map((entry) => {
    const category = record(entry);
    return {
      name: uniqueName(category.name, categoryNames),
      children: array(category.children).map((child) => uniqueName(child, children)),
    };
  });
  const optionGroups = array(data.optionGroups).map((entry) => {
    const group = record(entry);
    const groupName = uniqueName(group.name, optionNames);
    check(group.selectionType === "SINGLE" || group.selectionType === "MULTI");
    check(typeof group.required === "boolean");
    const keys = new Set<string>();
    const options = array(group.options).map((entry) => {
      const option = record(entry);
      const optionKey = uniqueName(option.optionKey, keys);
      check(/^[A-Z]+(?:_[A-Z]+)*$/.test(optionKey));
      return { optionKey, name: name(option.name), price: money(option.price) };
    });
    check(options.length > 0 && (!group.required || options[0].price === 0));
    return { name: groupName, selectionType: group.selectionType, required: group.required, options };
  });
  const productGroups = names(data.productGroups);
  const products = array(data.products).map((entry) => {
    const product = record(entry);
    const productName = uniqueName(product.name, productNames);
    const category = name(product.category);
    check(children.has(category));
    const basePrice = money(product.basePrice);
    check(basePrice % 100 === 0);
    check(typeof product.tracksInventory === "boolean");
    check(product.description === null || (typeof product.description === "string" && product.description.length <= 60));
    check(product.imageUrl === null || typeof product.imageUrl === "string");
    const tagNames = names(product.tagNames);
    check(tagNames.length <= 2 && tagNames.every((tag) => allowedTags.has(tag)));
    const groups = names(product.groups);
    check(groups.every((group) => productGroups.includes(group)));
    const referencedOptions = names(product.optionGroups);
    check(referencedOptions.every((group) => optionNames.has(group)));
    return {
      name: productName, category, basePrice, tracksInventory: product.tracksInventory,
      description: product.description, imageUrl: product.imageUrl,
      tagNames, groups, optionGroups: referencedOptions,
    };
  });
  // 위에서 필드 타입, 고유 이름, 참조를 모두 검증했다.
  return { categories, optionGroups, productGroups, products } as MenuCatalog;
}

/** API 전환 시 공개 URL을 설정하거나 이 함수에서 응답 형태를 변환한다. */
export async function fetchMenuCatalog(signal?: AbortSignal): Promise<MenuCatalog> {
  const response = await fetch(menuUrl, { signal, cache: "no-store" });
  if (!response.ok) throw new Error(`Menu request failed: ${response.status}`);
  return parseMenuCatalog(await response.json());
}

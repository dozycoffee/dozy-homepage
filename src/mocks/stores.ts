// 가상 매장 100개. 실제 매장이 아니며 운영에서는 사용하지 않는다.
import type { Store } from "@/content/types";
import stores from "./stores.json";

export const demoStores: Store[] = stores;

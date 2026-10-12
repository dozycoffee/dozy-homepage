"use client";

import { useEffect, useState } from "react";
import type { MenuCatalog } from "@/content/types";
import { fetchMenuCatalog } from "@/lib/menu-client";

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; catalog: MenuCatalog };

export function useMenuCatalog() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    let active = true;
    fetchMenuCatalog(controller.signal)
      .then((catalog) => { if (active) setState({ status: "ready", catalog }); })
      .catch(() => { if (active) setState({ status: "error" }); })
      .finally(() => window.clearTimeout(timeout));
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);
  const retry = () => {
    setState({ status: "loading" });
    setAttempt((value) => value + 1);
  };
  return { state, retry };
}

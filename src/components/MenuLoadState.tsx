import { EmptyState } from "@/components/EmptyState";
import { menuUI } from "@/content/menu-ui";

export function MenuLoadState({ status, retry }: { status: "loading" | "error"; retry: () => void }) {
  if (status === "loading") {
    return <div role="status" aria-busy="true"><EmptyState>{menuUI.loadingMessage}</EmptyState></div>;
  }
  return (
    <div>
      <div role="alert"><EmptyState>{menuUI.errorMessage}</EmptyState></div>
      <button type="button" onClick={retry} className="mt-4 min-h-12 rounded-button type-action underline underline-offset-4">
        {menuUI.retryLabel}
      </button>
    </div>
  );
}

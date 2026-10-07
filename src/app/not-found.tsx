import type { Metadata } from "next";
import { ActionLink } from "@/components/ActionLink";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없음",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center section-space">
      <div className="content-frame">
        <p className="type-eyebrow">404</p>
        <h1 className="mt-4 type-title">페이지를 찾을 수 없어요</h1>
        <p className="mt-5 max-w-prose type-lead">
          주소가 바뀌었거나 없어진 페이지예요. 홈에서 다시 찾아 주세요.
        </p>
        <div className="mt-8">
          <ActionLink href="/">홈으로</ActionLink>
        </div>
      </div>
    </main>
  );
}

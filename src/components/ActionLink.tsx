import Link from "next/link";

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  /** arrow: 글자 + 화살표 선 (주요 행동) / underline: 밑줄 글자 (보조 행동) */
  variant?: "arrow" | "underline";
  className?: string;
  onClick?: () => void;
};

/** 화살표 선. hover 시 오른쪽으로 늘어난다. */
export function ArrowLine({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`h-3 w-12 shrink-0 transition-transform group-hover:translate-x-1.5 ${className}`}
    >
      <path d="M0 6h46M41 1l5 5-5 5" />
    </svg>
  );
}

/** 바로가기 아이콘(상자에서 나가는 화살표). hover 시 오른쪽 위로 살짝 움직인다. */
export function ShortcutIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`}
    >
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

/**
 * 글자형 행동 링크. 상자·배경 없이 글자와 선으로만 행동을 보여 준다 (docs/design-system.md 행동 링크).
 * 누르는 영역은 높이 44px 이상이다.
 */
export function ActionLink({ href, children, variant = "arrow", className = "", onClick }: ActionLinkProps) {
  const external = /^https?:\/\//.test(href);
  const content =
    variant === "arrow" ? (
      <>
        <span>{children}</span>
        <ArrowLine />
      </>
    ) : (
      <span className="underline decoration-oat decoration-2 underline-offset-8 transition-colors group-hover:decoration-espresso">
        {children}
      </span>
    );
  const classes = `group inline-flex min-h-11 items-center gap-4 rounded-button type-action text-espresso ${className}`;

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={classes}>
      {content}
      <span className="sr-only"> (새 창)</span>
    </a>
  ) : (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  );
}

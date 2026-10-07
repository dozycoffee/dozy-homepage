type EmptyStateProps = {
  children: React.ReactNode;
  className?: string;
};

/** 보여 줄 데이터가 없을 때의 안내. 상자 없이 위 구분선과 글자만 둔다. */
export function EmptyState({ children, className = "" }: EmptyStateProps) {
  return <p className={`border-t border-espresso pt-6 type-lead ${className}`}>{children}</p>;
}

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

/** 제목 위 보조 문구. 글자는 Espresso, Caramel은 앞의 짧은 선에만 쓴다. */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p lang="en" className={`flex items-center gap-3 type-eyebrow text-espresso ${className}`}>
      <span aria-hidden className="h-px w-6 bg-caramel" />
      {children}
    </p>
  );
}

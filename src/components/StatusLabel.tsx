type StatusLabelProps = {
  children: React.ReactNode;
  lang?: string;
  className?: string;
};

/** 버튼이 아닌 상태 문구 (예: COMING SOON, 준비 중). 누를 수 있어 보이지 않게 테두리·배경을 두지 않는다. */
export function StatusLabel({ children, lang, className = "" }: StatusLabelProps) {
  return (
    <p
      lang={lang}
      className={`inline-flex items-center gap-2 text-espresso ${lang === "en" ? "type-eyebrow" : "type-body font-semibold"} ${className}`}
    >
      <span aria-hidden className="size-2 rounded-full bg-caramel" />
      {children}
    </p>
  );
}

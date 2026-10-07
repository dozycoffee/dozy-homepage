import { Eyebrow } from "@/components/Eyebrow";

type SectionHeaderProps = {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  className?: string;
};

/** 섹션 제목(h2)과 설명. `id`는 섹션의 aria-labelledby가 가리킨다. */
export function SectionHeader({ id, title, eyebrow, description, className = "" }: SectionHeaderProps) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h2 id={id} className="type-title">
        {title}
      </h2>
      {description && <p className="mt-3 max-w-prose type-lead md:mt-4">{description}</p>}
    </div>
  );
}

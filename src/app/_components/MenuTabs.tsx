"use client";

import { useId, useRef, useState } from "react";

type MenuTabsProps = {
  label: string;
  categories: { id: string; label: string }[];
  initialCategory: string;
  /** 카테고리별 카드 목록. 서버에서 그려서 넘긴다. */
  panels: Record<string, React.ReactNode>;
};

/** 메뉴 카테고리 탭. 좌우 화살표, Home, End로 탭을 옮긴다. */
export function MenuTabs({ label, categories, initialCategory, panels }: MenuTabsProps) {
  const [selected, setSelected] = useState(initialCategory);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const select = (index: number) => {
    const next = categories[(index + categories.length) % categories.length];
    setSelected(next.id);
    tabRefs.current[categories.indexOf(next)]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: categories.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key]);
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex gap-6 border-b border-oat md:gap-10">
        {categories.map((category, index) => {
          const isSelected = category.id === selected;
          return (
            <button
              key={category.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${category.id}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${category.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(category.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className="-mb-px min-h-12 border-b-2 border-transparent type-action font-medium text-espresso transition-colors hover:border-oat aria-selected:border-espresso aria-selected:font-semibold"
            >
              {category.label}
            </button>
          );
        })}
      </div>
      {categories.map((category) => (
        <div
          key={category.id}
          role="tabpanel"
          id={`${baseId}-panel-${category.id}`}
          aria-labelledby={`${baseId}-tab-${category.id}`}
          hidden={category.id !== selected}
          className="mt-8 md:mt-10"
        >
          {panels[category.id]}
        </div>
      ))}
    </div>
  );
}

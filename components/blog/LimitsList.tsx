import type { ReactNode } from "react";

export type LimitItem = {
  title: string;
  description: ReactNode;
};

export default function LimitsList({ items }: { items: LimitItem[] }) {
  return (
    <ul className="my-0 list-none p-0">
      {items.map((item) => (
        <li
          key={item.title}
          className="border-t border-border py-3 text-[14.5px] leading-relaxed text-fg first:border-t-0"
        >
          <strong className="text-fg">{item.title}</strong> {item.description}
        </li>
      ))}
    </ul>
  );
}

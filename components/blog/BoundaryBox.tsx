import type { ReactNode } from "react";

type BoundaryBoxProps = {
  lead: string;
  children: ReactNode;
};

export default function BoundaryBox({ lead, children }: BoundaryBoxProps) {
  return (
    <div className="my-7 rounded-md border-l-[3px] border-accent bg-bg-raised px-5 py-4 text-sm leading-relaxed text-fg">
      <strong className="text-accent-ink">{lead}</strong> {children}
    </div>
  );
}

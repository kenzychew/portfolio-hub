import type { ReactNode } from "react";

type WarStoryProps = {
  kicker?: string;
  children: ReactNode;
};

export default function WarStory({
  kicker = "What actually happened",
  children,
}: WarStoryProps) {
  return (
    <div className="my-6 rounded-lg bg-bg-raised px-5 py-5">
      <p className="mb-2.5 font-mono text-[10.5px] uppercase tracking-wider text-fg-muted">
        {kicker}
      </p>
      <div className="text-sm leading-relaxed text-fg">{children}</div>
    </div>
  );
}

import type { ReactNode } from "react";

type DecisionBoxProps = {
  kicker?: string;
  children: ReactNode;
};

export default function DecisionBox({
  kicker = "Key decision",
  children,
}: DecisionBoxProps) {
  return (
    <div className="my-6 rounded-lg border border-accent-ink bg-bg px-5 py-4">
      <p className="mb-2 font-mono text-[10.5px] uppercase tracking-wider text-accent-ink">
        {kicker}
      </p>
      <div className="text-sm leading-relaxed text-fg">{children}</div>
    </div>
  );
}

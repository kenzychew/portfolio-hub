export type PipelineStep = {
  num: string;
  name: string;
  detail: string;
  /** De-emphasized for a stage that's wired in but not active. */
  dormant?: boolean;
};

export default function Pipeline({ steps }: { steps: PipelineStep[] }) {
  return (
    <div className="my-6 flex items-stretch gap-2 overflow-x-auto pb-1.5">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-stretch gap-2">
          <div
            className={`min-w-[108px] flex-1 rounded-lg border border-border bg-bg px-3 py-3 ${
              step.dormant ? "opacity-50" : ""
            }`}
          >
            <div className="font-mono text-[10px] font-semibold text-accent-ink">
              {step.num}
            </div>
            <div className="mt-0.5 font-display text-sm font-semibold text-fg">
              {step.name}
            </div>
            <div
              className={`text-[11.5px] ${step.dormant ? "text-accent-ink" : "text-fg-muted"}`}
            >
              {step.detail}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex shrink-0 items-center text-lg text-border">
              &rarr;
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

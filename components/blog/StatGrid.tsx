export type Stat = {
  value: string;
  label: string;
};

export default function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="my-8 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-border bg-bg px-3.5 py-4"
        >
          <div className="font-display text-2xl font-semibold tabular-nums text-fg">
            {stat.value}
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-fg-muted">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

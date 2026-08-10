import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  id,
  number,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-t border-border px-6 py-16 sm:px-10 sm:py-24 ${className}`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-baseline gap-4 sm:mb-14">
          <span className="font-mono text-sm text-accent">{number}</span>
          <h2 className="font-display text-2xl font-medium tracking-tight text-fg sm:text-3xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

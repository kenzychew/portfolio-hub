export default function StackLine({ items }: { items: string[] }) {
  return (
    <p className="mt-10 border-t border-border pt-4 font-mono text-[12.5px] text-fg-muted">
      {items.join(" · ")}
    </p>
  );
}

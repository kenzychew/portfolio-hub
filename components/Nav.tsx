const links = [
  { label: "About", href: "#how-i-build" },
  { label: "Work", href: "#projects" },
  { label: "Blog", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-10">
        <a
          href="#top"
          className="shrink-0 font-mono text-sm font-medium tracking-tight text-fg"
        >
          portfolio.hub
        </a>
        <ul className="flex min-w-0 items-center gap-4 overflow-x-auto font-mono text-xs uppercase tracking-widest text-fg-muted sm:gap-7">
          {links.map((link) => (
            <li key={link.href} className="shrink-0">
              <a
                href={link.href}
                className="transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

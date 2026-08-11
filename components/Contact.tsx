import Section from "./Section";

const links = [
  { label: "Email", href: "mailto:kenzychew@gmail.com" },
  { label: "GitHub", href: "https://github.com/kenzychew" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kenzychew/" },
];

export default function Contact() {
  return (
    <Section id="contact" number="05" title="Contact" className="border-b">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-md font-body text-lg leading-relaxed text-fg-muted sm:text-xl">
          Open to applied ML/AI roles and collaborations. Reach out through
          any of the links below.
        </p>
        <ul className="flex flex-col gap-3 font-mono text-sm uppercase tracking-widest">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-fg underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

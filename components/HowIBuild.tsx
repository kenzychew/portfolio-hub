import Section from "./Section";

export default function HowIBuild() {
  return (
    <Section id="how-i-build" number="01" title="How I build">
      <p className="max-w-2xl font-body text-lg leading-relaxed text-fg-muted sm:text-xl">
        I start from the failure modes, not the demo: what breaks when the
        input is messy, the latency budget is tight, or the model is wrong
        with confidence. Systems get built in thin, observable slices — one
        pipeline stage, one endpoint, one dashboard at a time — so every
        layer ships with the logging and guardrails it needs to be trusted in
        production, not just in a notebook.
      </p>
    </Section>
  );
}

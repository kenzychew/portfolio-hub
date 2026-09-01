import BoundaryBox from "@/components/blog/BoundaryBox";
import StatGrid from "@/components/blog/StatGrid";
import Pipeline from "@/components/blog/Pipeline";
import DecisionBox from "@/components/blog/DecisionBox";
import ResultsTable from "@/components/blog/ResultsTable";
import WarStory from "@/components/blog/WarStory";
import LimitsList from "@/components/blog/LimitsList";
import StackLine from "@/components/blog/StackLine";

const code = "rounded bg-bg-raised px-1.5 py-0.5 font-mono text-[0.85em]";

export default function DocExtractPost() {
  return (
    <>
      <BoundaryBox lead="Boundary, stated up front:">
        the first version of this finding ran on 35 documents and reported
        the wrong winner. Everything below is the corrected run on the full
        361-document SROIE test split, the same N this project already
        treats as its honest sample size everywhere else it reports numbers.
        Even that isn&apos;t huge: the miss counts behind the precision
        numbers here are 1, 3, and 5 documents per backend, so read the
        precision deltas between backends as directional, not as
        statistically separated from each other.
      </BoundaryBox>

      <StatGrid
        stats={[
          { value: "361", label: "Documents in the real run, not 35" },
          { value: "+2.5", label: "Agentic's real edge, in points, over the actual best single-call backend" },
          { value: "3.2x", label: "Cost per document vs. plain Anthropic" },
          { value: "4/5", label: "Agentic misses from one new failure mode" },
        ]}
      />

      <h2 className="mb-3.5 mt-11 font-display text-2xl font-semibold text-fg">
        The question, and where the tool sits
      </h2>
      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        DocExtract&apos;s existing pipeline has a hard rule that catches
        arithmetic errors, line items or a subtotal that don&apos;t
        reconcile with the stated total, after extraction, and routes the
        document to manual review no matter how confident the model was. The
        question I wanted an answer to: would giving the model a tool to
        check its own arithmetic during extraction let it self-correct and
        auto-accept documents that currently get punted?
      </p>

      <Pipeline
        steps={[
          { num: "00", name: "Extract", detail: "forced tool-use, schema-constrained" },
          {
            num: "01",
            name: "validate_arithmetic",
            detail: "agentic backend only, up to 3 rounds",
          },
          { num: "02", name: "H2 / H3 check", detail: "line items vs. total, existing hard rule" },
          { num: "03", name: "Route", detail: "auto-accept or review" },
        ]}
      />

      <DecisionBox>
        <code className={code}>validate_arithmetic</code> isn&apos;t an LLM
        grading its own math. It&apos;s a client-side recomputation: sum the
        line items in Python, compare against the stated total, hand the
        boolean result back as a tool response. The model gets up to 3
        rounds to call it, see a mismatch, and revise, the same bounded-retry
        pattern the existing backends already use for API calls, so a model
        that can&apos;t converge doesn&apos;t loop forever.
      </DecisionBox>

      <h2 className="mb-3.5 mt-11 font-display text-2xl font-semibold text-fg">
        The numbers, at the scale that actually counts
      </h2>
      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        Three backends, same 361-document split, <code className={code}>gemini-2.5-flash</code> and{" "}
        <code className={code}>claude-haiku-4-5</code>:
      </p>

      <ResultsTable
        columns={["Backend", "Auto-accept", "Critical P (total)", "$/doc", "p50 latency"]}
        rows={[
          { cells: ["gemini", "117/361 (32.4%)", "116/117 (99.1%)", "$0.00090", "8.94s"] },
          { cells: ["anthropic", "79/361 (21.9%)", "76/79 (96.2%)", "$0.00482", "4.09s"] },
          {
            cells: ["anthropic-agentic", "126/361 (34.9%)", "121/126 (96.0%)", "$0.01538", "8.48s"],
            win: true,
          },
        ]}
      />

      <WarStory kicker="What actually happened">
        The 35-document slice had <code className={code}>anthropic</code>{" "}
        (25.7%) auto-accepting more than <code className={code}>gemini</code>{" "}
        (22.9%), and the agentic backend recovering 4 documents that{" "}
        <code className={code}>anthropic</code>&apos;s own extraction had
        hard-failed on, with no precision cost anywhere on that slice. That
        looked like a clean answer: yes, self-correction wins, by 8.6 to 11
        points depending on which single-call backend you compared it to.
        At 361 documents the single-call ranking flips outright:{" "}
        <code className={code}>gemini</code> auto-accepts 32.4% against{" "}
        <code className={code}>anthropic</code>&apos;s 21.9%, a 10.5-point
        gap in the other direction from what the small sample showed. The
        agentic backend is still the highest auto-accept rate of the three,
        but the baseline it should be measured against matters: its edge is
        +13.0 points over <code className={code}>anthropic</code> and only
        +2.5 points over <code className={code}>gemini</code>, the backend
        that turned out to be the actually stronger single-call option.
        Roughly a third of the apparent gain survived the rerun. The
        recovery mechanism itself did generalize, 50 documents auto-accepted
        at 361 where <code className={code}>anthropic</code>&apos;s own
        extraction hard-failed H2 or H3, up from 4 at small scale, so the
        tool is doing real work. It just isn&apos;t free: 4 of the agentic
        backend&apos;s 5 critical misses share the same new shape, the tool
        reconciling a <code className={code}>total</code> that was already
        correct into a self-consistent but wrong number. On{" "}
        <code className={code}>X51006328967</code> (gold total{" "}
        <code className={code}>62.00</code>), the plain backend read{" "}
        <code className={code}>total</code> correctly as 62.00 but flagged it
        for review because its own <code className={code}>subtotal</code> and{" "}
        <code className={code}>tax</code> readings didn&apos;t sum to it.
        Given the tool, the agentic backend didn&apos;t re-read the source
        for the actual misread field, it adjusted{" "}
        <code className={code}>total</code> to 65.51 until the arithmetic
        closed, and auto-accepted a document that was right before it
        touched it. That&apos;s the exact kind of confidently-wrong
        auto-accept this whole project&apos;s precision posture is built to
        catch, produced here by the self-correction mechanism itself.
      </WarStory>

      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        Cost and latency were the one thing that didn&apos;t move between the
        two runs. The agentic backend&apos;s extra self-correction rounds
        cost ~3.2x <code className={code}>anthropic</code>&apos;s
        per-document price ($0.01538 vs $0.00482) and ~2.1x its p50 latency
        (8.48s vs 4.09s), both from the same model so price and speed
        aren&apos;t confounded by a model swap. That&apos;s close to the
        35-document slice&apos;s ~3.07x/~2x figures. Running the full split
        also surfaced a real bug the small slice never hit: the arithmetic
        tool crashed on a document with a null line-item amount, something
        that only ever showed up once there were enough documents to hit it.
        Fixed and re-predicted before any of the numbers above were run.
      </p>

      <h2 className="mb-3.5 mt-11 font-display text-2xl font-semibold text-fg">
        Known limitations
      </h2>
      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        Stated plainly rather than left for someone else to find:
      </p>

      <LimitsList
        items={[
          {
            title: "It isn't strictly monotonic.",
            description:
              "9 documents anthropic had auto-accepted, the agentic backend sent to review instead. 8 of those are true regressions: the plain backend's total was already correct, and self-correction volunteered extra detail that broke a consistency check the shorter answer had passed. The 9th wasn't a regression, anthropic's own total was already wrong against gold and the agentic backend correctly declined to accept it.",
          },
          {
            title: "SROIE only labels total as a critical field.",
            description:
              "This comparison can't speak to precision on tax or invoice_number at all, gold labels for those don't exist in the dataset, so the precision numbers above are total-only by construction, not by choice.",
          },
          {
            title: "n=361 is the full SROIE test split, not a larger benchmark.",
            description:
              "The single-digit miss counts per backend (1, 3, 5) mean a percentage point of critical precision here is worth roughly 3 to 4 documents. Enough to trust the direction of the numbers, not enough to treat the gap between backends as settled.",
          },
          {
            title: "The cost/latency tradeoff is the one number I'd act on today.",
            description:
              "It held steady across a 10x change in sample size while the accept-rate and precision numbers it's traded against didn't. Whether a few points of auto-accept rate is worth 3x the per-document cost, plus a new failure mode, is a product decision this finding doesn't make for you.",
          },
        ]}
      />

      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        The reason this is worth writing up isn&apos;t the tool, it&apos;s
        that a 35-document eval looked completely conclusive and reported
        the wrong winner. A sample size that&apos;s fine for a gut check
        isn&apos;t the same thing as a result, and the only way I actually
        found that out was rerunning at the N I already trust everywhere
        else in this project.
      </p>

      <StackLine
        items={[
          "Python",
          "Anthropic API",
          "Gemini API",
          "Forced tool-use",
          "ICDAR SROIE",
          "pytest",
        ]}
      />
    </>
  );
}

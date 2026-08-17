import BoundaryBox from "@/components/blog/BoundaryBox";
import StatGrid from "@/components/blog/StatGrid";
import Pipeline from "@/components/blog/Pipeline";
import DecisionBox from "@/components/blog/DecisionBox";
import ResultsTable from "@/components/blog/ResultsTable";
import WarStory from "@/components/blog/WarStory";
import LimitsList from "@/components/blog/LimitsList";
import StackLine from "@/components/blog/StackLine";

const code = "rounded bg-bg-raised px-1.5 py-0.5 font-mono text-[0.85em]";

export default function GoFetchPost() {
  return (
    <>
      <BoundaryBox lead="Boundary, stated up front:">
        the retrieval numbers below come from a 14-document, 24-question
        benchmark I built myself. They tell you which architecture choice won
        on that corpus. They don&apos;t tell you how this behaves at 10x the
        scale. And they only ever cover two signals, dense and BM25: the
        knowledge graph is real code, switched on by default, but it only
        activates if a graph file exists on disk, one that&apos;s only
        produced by running ingestion against live credentials I&apos;ve
        never actually done in a deployed environment. So it&apos;s built,
        it&apos;s wired, and it has never once fired.
      </BoundaryBox>

      <StatGrid
        stats={[
          { value: "2", label: "Signals actually fused" },
          { value: "0.917", label: "Hit@1, hybrid + rerank" },
          { value: "14", label: "Documents in corpus" },
          { value: "55", label: "Tests, all passing" },
        ]}
      />

      <h2 className="mb-3.5 mt-11 font-display text-2xl font-semibold text-fg">
        How one query moves through the system
      </h2>
      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        Two retrievers run concurrently (a third, graph retrieval, is wired
        in alongside them but has never actually had data to run against),
        get fused by rank rather than by score, then get cut down to five
        chunks before generation ever starts:
      </p>

      <Pipeline
        steps={[
          { num: "00", name: "Decompose", detail: "off by default", dormant: true },
          { num: "01", name: "Embed query", detail: "local, no API call" },
          {
            num: "02",
            name: "Dense + BM25 (+ Graph, dormant)",
            detail: "parallel, top 20/20",
          },
          { num: "03", name: "RRF fuse", detail: "k=60, top 10" },
          { num: "04", name: "Re-rank", detail: "cross-encoder, top 5" },
          { num: "05", name: "Confidence gate", detail: "refuse or warn" },
          { num: "06", name: "Generate", detail: "Gemini, streamed" },
        ]}
      />

      <DecisionBox>
        BM25 scores are unbounded term-frequency numbers; pgvector cosine
        similarity is bounded 0 to 1. Rather than normalize two incompatible
        scales, fusion works on rank position instead:{" "}
        <code className={code}>1/(k + rank)</code> summed across whichever
        lists a chunk appears in. That&apos;s also why wiring in the
        knowledge graph as a third signal was cheap: fusion doesn&apos;t care
        what produced a ranked list, so the graph slots in without touching
        the math, whenever it actually has data to rank.
      </DecisionBox>

      <h2 className="mb-3.5 mt-11 font-display text-2xl font-semibold text-fg">
        The numbers, and the one that was wrong
      </h2>
      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        The honest version of this story: my headline ablation table quietly
        drifted stale after I changed the chunk size, and kept reporting
        results for a corpus I don&apos;t even build anymore. Here&apos;s
        what&apos;s actually true for what&apos;s shipped today:
      </p>

      <ResultsTable
        columns={["Configuration", "Hit@1", "Hit@3", "Hit@5", "MRR", "KW Recall"]}
        rows={[
          { cells: ["Dense only", "0.875", "1.000", "1.000", "0.938", "0.819"] },
          { cells: ["BM25 only", "0.875", "0.958", "0.958", "0.917", "0.600"] },
          { cells: ["Hybrid (RRF)", "0.875", "1.000", "1.000", "0.938", "0.728"] },
          {
            cells: ["Hybrid + Rerank", "0.917", "1.000", "1.000", "0.958", "0.788"],
            win: true,
          },
        ]}
      />

      <WarStory>
        The results file behind that table was byte-identical to a snapshot
        from an older, larger chunk size. I&apos;d committed it once and
        never regenerated it after changing the chunk-size default. For
        months my README said dense retrieval won outright. It didn&apos;t.
        On the real shipped config, hybrid plus re-ranking wins Hit@1
        cleanly. The fix wasn&apos;t even a re-run: the correct numbers were
        already sitting in my repo under a different filename, I&apos;d just
        never swapped them in. I caught it by re-deriving every number
        straight from the eval output instead of trusting the table that was
        already there.
      </WarStory>

      <h2 className="mb-3.5 mt-11 font-display text-2xl font-semibold text-fg">
        Known limitations
      </h2>
      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        Stated plainly rather than left for someone else to find:
      </p>

      <LimitsList
        items={[
          {
            title: "A real concurrency bug I haven't fixed yet.",
            description:
              "My dense retriever is a shared singleton, and setting the query embedding and reading it back are two separate calls with an await boundary between them. Two overlapping requests can interleave so one silently gets results meant for the other.",
          },
          {
            title: "The knowledge graph has never actually run.",
            description:
              "It's real code, wired into fusion and on by default, but it only activates once a graph file exists on disk, and building that file means running ingestion against live credentials I've never done outside local testing. So it ships switched on and has never once fired.",
          },
          {
            title: "HyDE and query decomposition are real and wired in, just switched off.",
            description:
              "Both fully implemented, both default to disabled in every config I ship, neither one benchmarked yet.",
          },
          {
            title: '"Built from scratch" has one asterisk.',
            description:
              "Chunking still uses LangChain's text splitter. Everything else, retrieval, fusion, reranking, generation, the graph, I wrote myself.",
          },
        ]}
      />

      <StackLine
        items={[
          "Python",
          "FastAPI",
          "PostgreSQL (pgvector)",
          "BM25",
          "cross-encoder",
          "Gemini (Vertex AI)",
          "NetworkX",
          "Gradio",
        ]}
      />
    </>
  );
}

import BoundaryBox from "@/components/blog/BoundaryBox";
import StatGrid from "@/components/blog/StatGrid";
import Pipeline from "@/components/blog/Pipeline";
import DecisionBox from "@/components/blog/DecisionBox";
import ResultsTable from "@/components/blog/ResultsTable";
import WarStory from "@/components/blog/WarStory";
import LimitsList from "@/components/blog/LimitsList";
import StackLine from "@/components/blog/StackLine";

const code = "rounded bg-bg-raised px-1.5 py-0.5 font-mono text-[0.85em]";

export default function RocketMLPost() {
  return (
    <>
      <BoundaryBox lead="Boundary, stated up front:">
        the model here is a TF-IDF and LogisticRegression sentiment
        classifier trained on 5,000 IMDB reviews, and it&apos;s deliberately
        unremarkable: about 0.86 accuracy, an artifact under 1 MB, inference
        fast enough on CPU that latency was never a question worth asking.
        That&apos;s on purpose. RocketML isn&apos;t trying to prove the model
        is good. It&apos;s a self-service platform for getting any small
        model from a training script to a monitored, containerized,
        Kubernetes-deployed API, and the sentiment classifier is just the
        payload that exercises every stage of that pipeline.
      </BoundaryBox>

      <StatGrid
        stats={[
          { value: "561 MB", label: "Serving image, down from 1.23 GB" },
          { value: "0.89", label: "predict_proba, corrected from 0.93" },
          { value: "2", label: "Live demos on the same joblib artifact" },
          { value: "3", label: "ADRs, one per real decision" },
        ]}
      />

      <h2 className="mb-3.5 mt-11 font-display text-2xl font-semibold text-fg">
        How a push becomes a running container
      </h2>
      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        Every push and every pull request runs the same two gates: lint,
        then test. Only a push to <code className={code}>main</code> goes
        further, and it only goes further once the test job passes:
      </p>

      <Pipeline
        steps={[
          { num: "00", name: "Push", detail: "any branch or PR" },
          { num: "01", name: "Lint", detail: "ruff check" },
          { num: "02", name: "Test", detail: "pytest" },
          { num: "03", name: "Train", detail: "main only, ~1-2 min" },
          { num: "04", name: "Build image", detail: "bakes joblib artifact" },
          { num: "05", name: "Push GHCR", detail: ":latest and :sha" },
        ]}
      />

      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        The last three stages exist because the serving image can&apos;t be
        assembled from anything sitting in the repo: the artifact is
        gitignored, so CI has to produce a fresh one before it can bake it
        in. Every image on <code className={code}>main</code> carries a
        model that was just trained, not one checked in months ago.
      </p>

      <DecisionBox>
        MLflow&apos;s registry is real and it stays the source of truth for
        lineage: <code className={code}>train.py</code> logs metrics and
        registers every run. But serving never talks to it. Training also
        writes a plain joblib artifact, the image bakes that in, and a
        config-driven loader reads it straight off disk, lazily and cached,
        which is also why <code className={code}>/health</code> doesn&apos;t
        depend on the model being loaded at all.{" "}
        <code className={code}>docker run</code> the container by itself,
        with no MLflow service anywhere nearby, and it still predicts,
        because there&apos;s nothing left at runtime for it to depend on.
        The tradeoff: promoting a model means re-running training and
        rebuilding the image rather than pointing serving at a new registry
        version. At this scale that&apos;s simpler than adding a live
        registry client to the request path.
      </DecisionBox>

      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        The alternative that was actually running first was heavier than it
        needed to be, and the obvious-looking fix for that turned out not to
        work:
      </p>

      <ResultsTable
        columns={["Approach", "Runtime deps", "Image size", "Outcome"]}
        rows={[
          {
            cells: [
              "Full mlflow client",
              "Flask, SQLAlchemy, pandas, mlflow",
              "1.23 GB",
              "Works, but the registry client is most of the weight",
            ],
          },
          {
            cells: [
              "mlflow-skinny",
              "--",
              "n/a",
              "Rejected: metapackage in MLflow 3.x, ships no importable module",
            ],
          },
          {
            cells: [
              "Joblib, baked in",
              "scikit-learn only",
              "561 MB",
              "Chosen",
            ],
            win: true,
          },
        ]}
      />

      <h2 className="mb-3.5 mt-11 font-display text-2xl font-semibold text-fg">
        Getting it onto Kubernetes
      </h2>
      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        The chart in <code className={code}>deploy/helm/rocketml</code> isn&apos;t{" "}
        <code className={code}>helm create</code> output. Writing it by
        hand, a Deployment and a ClusterIP Service with health probes and
        resource requests and limits, was the point of that phase: this was
        my first real Kubernetes and Helm work, and the fastest way to
        actually understand what each piece of a chart does was to write it
        rather than generate it. In-cluster, RocketML gets scraped through a
        ServiceMonitor instead of a static Prometheus config, so the
        Prometheus Operator that ships with kube-prometheus-stack discovers
        it on its own.
      </p>
      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        None of it worked on the first try. A ServiceMonitor without the{" "}
        <code className={code}>release: monitoring</code> label gets
        silently ignored by the Operator&apos;s Prometheus, no error,
        nothing scraped. A <code className={code}>helm upgrade</code> that
        requests more than it limits gets rejected outright at admission,
        which is a safe failure but not an obvious one the first time it
        happens. And a local image built with{" "}
        <code className={code}>docker build</code> is invisible to a kind
        cluster until it&apos;s explicitly{" "}
        <code className={code}>kind load</code>ed, since kind keeps its own
        image store separate from Docker&apos;s.
      </p>

      <h2 className="mb-3.5 mt-11 font-display text-2xl font-semibold text-fg">
        The number that was wrong
      </h2>
      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        The README&apos;s curl example claimed a score of 0.93,{" "}
        <code className={code}>predict_proba</code>&apos;s confidence for
        one specific negative review, not an accuracy metric. It was wrong.
      </p>

      <WarStory>
        I loaded the two joblib artifacts that are actually live right now,
        the one behind the Hugging Face Space and the one behind the
        Railway demo, and ran that exact input against each independently.
        Both returned 0.8949749706947533, which is 0.89, not 0.93. A fresh
        retrain and a direct call against the live production API both
        confirmed the same number: four independent checks, one consistent
        answer, and none of them agreed with what the README said. The fix
        was a one-line edit in two files, README.md and
        demo-railway/README.md. What&apos;s worth remembering isn&apos;t the
        fix, it&apos;s that a number this easy to check, one curl command
        against a model that&apos;s already running in production, sat
        wrong until someone actually ran it.
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
            title: "MLflow, Prometheus, and Grafana are real, but nothing about them is public.",
            description:
              "They come up through docker compose or a local kind cluster, not anywhere hosted. There's no public dashboard to link to for any of the three, only the local stack this repo can bring up on demand.",
          },
          {
            title: "CI retrains the model on every push to main.",
            description:
              "About 1-2 minutes each time, downloading IMDB and refitting. Deterministic, so it's not wrong, but it's wasteful. A later version would train once, version the artifact, and decouple the build from training.",
          },
          {
            title: "The Helm chart still has rough edges.",
            description:
              "No startupProbe yet, so the readiness probe can flap on a cold start. The Grafana dashboard hardcodes a datasource UID instead of templating it. The ServiceMonitor lives in deploy/k8s/ rather than the chart itself.",
          },
          {
            title: "The model's own accuracy number is intentionally unremarkable.",
            description:
              "About 0.86 accuracy and 0.87 F1 on a 5,000-review IMDB subset. Nobody should be impressed by it. That's not what this project is trying to demonstrate.",
          },
        ]}
      />

      <p className="mb-4 text-[15.5px] leading-relaxed text-fg">
        Building RocketML wasn&apos;t really about the sentiment model. It
        was about everything a model needs around it before someone else
        can depend on it: a container that doesn&apos;t need a live
        connection to a registry to answer a request, CI that won&apos;t
        build an image until the tests pass, and a chart I wrote by hand so
        I&apos;d understand what a rolling deploy actually does instead of
        trusting a template I didn&apos;t write. The roadmap has a few more
        of these left: Terraform for the cluster itself, ArgoCD for
        GitOps-style deploys, drift monitoring on the predictions this
        already logs, and rate limiting on the public endpoint before it
        actually needs it.
      </p>

      <StackLine
        items={[
          "Python",
          "FastAPI",
          "scikit-learn",
          "Docker",
          "GitHub Actions",
          "MLflow",
          "Prometheus",
          "Grafana",
          "Kubernetes",
          "Helm",
        ]}
      />
    </>
  );
}

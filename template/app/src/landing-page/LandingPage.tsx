import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Check,
  CircleCheck,
  FileText,
  Globe,
  Loader2,
  Plus,
  ShieldCheck,
  X,
} from "lucide-react";
import { agents, agentHref, type Agent } from "./agentCatalog";
import {
  BOOKING_URL,
  PRIMARY_CTA_LABEL,
  approvalLine,
  credentials,
  faqs,
  jobGroups,
  serviceSlugs,
  stack,
  steps,
  valueRows,
  type JobGroupId,
} from "./homeContent";
import "./landing.css";

const bySlug = new Map(agents.map((a) => [a.slug, a]));

function PrimaryCta({ tone = "yellow" }: { tone?: "yellow" | "cobalt" }) {
  const colors =
    tone === "yellow"
      ? "bg-[var(--wf-yellow)] text-[var(--wf-ink)] hover:bg-white"
      : "bg-[var(--wf-cobalt)] text-white hover:bg-[var(--wf-ink)]";
  return (
    <a
      href={BOOKING_URL}
      className={`wf-wide inline-flex items-center gap-3 rounded-full px-7 py-4 text-base transition-colors ${colors}`}
    >
      {PRIMARY_CTA_LABEL}
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}

export function LandingPage() {
  return (
    <div className="wf">
      <main>
        <Hero />
        <Story />
        <AgentShowcase />
        <HowItWorks />
        <ValueMath />
        <Founder />
        <Stack />
        <Faq />
        <FinalCta />
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ Hero */

const shift = [
  { agent: "Inbox Manager", task: "Sorted the morning inbox and flagged 3 customer requests", state: "done" },
  { agent: "Calendar Manager", task: "Found two open slots for Thursday's demo", state: "done" },
  { agent: "AI Lead Generation", task: "Researching prospects that match your criteria", state: "working" },
] as const;

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--wf-cobalt)] text-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 pb-20 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-12 lg:pb-28">
        <div>
          <h1 className="wf-display text-[clamp(2.9rem,6.4vw,5.6rem)]">
            Your second workforce starts Monday.
          </h1>
          <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-white/85 md:text-xl">
            AI agents that answer your leads, clear your inbox, book your
            meetings and screen your candidates. They do the work. You approve
            anything that leaves the building.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <PrimaryCta />
            <a
              href="#agents"
              className="wf-wide border-b-2 border-white/60 pb-1 text-white transition-colors hover:border-[var(--wf-yellow)]"
            >
              Meet the 12 agents
            </a>
          </div>
          <p className="mt-10 max-w-md text-sm leading-relaxed text-white/70">
            Built and run by Wesley Swann, 20 years in Microsoft 365, endpoint
            management and security.
          </p>
        </div>
        <ShiftBoard />
      </div>
    </section>
  );
}

function ShiftBoard() {
  const [decision, setDecision] = useState<"pending" | "approved" | "rejected">("pending");
  return (
    <div className="rounded-[28px] bg-[var(--wf-ink)] p-5 shadow-[0_30px_80px_-30px_rgba(5,8,40,.8)] sm:p-7">
      <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
        <h2 className="wf-wide text-lg">Today's shift</h2>
        <span className="text-xs text-white/55">Sample activity, try the buttons</span>
      </div>
      <ul className="mt-2">
        {shift.map((row, i) => (
          <li
            key={row.agent}
            className="wf-row flex items-start gap-4 border-b border-white/10 py-4"
            style={{ animationDelay: `${250 + i * 380}ms` }}
          >
            <span
              className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                row.state === "done" ? "bg-[var(--wf-done)]" : "bg-white/15"
              }`}
            >
              {row.state === "done" ? (
                <Check size={14} aria-hidden="true" />
              ) : (
                <Loader2 size={14} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
              )}
            </span>
            <div>
              <p className="text-sm font-semibold">{row.agent}</p>
              <p className="mt-0.5 text-sm text-white/70">{row.task}</p>
            </div>
            <span className="sr-only">{row.state === "done" ? "Done" : "In progress"}</span>
          </li>
        ))}
      </ul>
      <div
        className="wf-row mt-5 rounded-2xl bg-white p-5 text-[var(--wf-ink)]"
        style={{ animationDelay: "1500ms" }}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">Sales Automation needs your OK</p>
          {decision === "pending" && (
            <span className="wf-pulse h-2.5 w-2.5 rounded-full bg-[var(--wf-yellow)]" aria-hidden="true" />
          )}
        </div>
        <p className="mt-3 text-[15px] leading-relaxed">
          Send a follow-up to Dana Reyes at Northwind Supply about Tuesday's
          quote?
        </p>
        <div className="mt-4" aria-live="polite">
          {decision === "pending" ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setDecision("approved")}
                className="wf-wide rounded-full bg-[var(--wf-cobalt)] px-5 py-2.5 text-sm text-white hover:bg-[var(--wf-ink)]"
              >
                Approve and send
              </button>
              <button
                type="button"
                onClick={() => setDecision("rejected")}
                className="rounded-full border border-[var(--wf-line)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--wf-ink)]"
              >
                Don't send
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-sm font-semibold">
                {decision === "approved" ? (
                  <>
                    <CircleCheck size={18} className="text-[var(--wf-done)]" aria-hidden="true" /> Sent. Logged to your CRM.
                  </>
                ) : (
                  <>
                    <X size={18} aria-hidden="true" /> Held. Nothing was sent.
                  </>
                )}
              </p>
              <button
                type="button"
                onClick={() => setDecision("pending")}
                className="text-sm text-[var(--wf-steel)] underline underline-offset-4"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Story */

function Story() {
  return (
    <section className="wf-paper-section border-b border-[var(--wf-line)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <h2 className="wf-display text-[clamp(2.2rem,4.6vw,4rem)]">
          You didn't start a business to sort email.
        </h2>
        <div className="max-w-[36rem] space-y-5 text-lg leading-relaxed text-[var(--wf-steel)]">
          <p>
            Leads wait hours for a reply. Follow-ups slip. Booking one meeting
            takes six emails. And every new hire means another round of resumes
            on your kitchen table.
          </p>
          <p>
            Each of those jobs is repetitive, rules-based and eating hours you
            should spend on customers. That is exactly the work AI agents do
            well, as long as someone sets them up properly and keeps them on a
            short leash.
          </p>
          <p className="font-semibold text-[var(--wf-ink)]">
            That's the whole idea: real work handed off, with you holding the
            final say.
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Agent showcase */

function AgentShowcase() {
  const [groupId, setGroupId] = useState<JobGroupId>("customers");
  const group = jobGroups.find((g) => g.id === groupId)!;
  const groupAgents = group.slugs.map((s) => bySlug.get(s)).filter(Boolean) as Agent[];

  return (
    <section id="agents" className="wf-paper-section scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="wf-display text-[clamp(2.4rem,5.4vw,4.6rem)]">Meet the crew.</h2>
          <p className="max-w-md text-lg leading-relaxed text-[var(--wf-steel)]">
            Twelve specialists, grouped by the job you need done. Each one does
            real work and checks with you before it acts outside your business.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Agents by job"
          className="mt-12 flex gap-2 overflow-x-auto pb-2"
        >
          {jobGroups.map((g) => {
            const selected = g.id === groupId;
            return (
              <button
                key={g.id}
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={selected}
                aria-controls="agent-panel"
                type="button"
                onClick={() => setGroupId(g.id)}
                className={`wf-wide shrink-0 rounded-full border-2 px-5 py-3 text-sm transition-colors ${
                  selected
                    ? "border-[var(--wf-ink)] bg-[var(--wf-ink)] text-white"
                    : "border-[var(--wf-line)] text-[var(--wf-ink)] hover:border-[var(--wf-ink)]"
                }`}
              >
                {g.label}
                <span className={selected ? "ml-2 text-white/60" : "ml-2 text-[var(--wf-steel)]"}>
                  {g.slugs.length}
                </span>
              </button>
            );
          })}
        </div>

        <div id="agent-panel" role="tabpanel" aria-labelledby={`tab-${groupId}`} className="mt-8">
          <p className="text-lg font-semibold">{group.promise}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {groupAgents.map((a) => (
              <AgentBadge key={a.slug} agent={a} />
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 rounded-[28px] bg-[var(--wf-ink)] p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="wf-wide text-2xl">Start with one agent.</p>
            <p className="mt-2 max-w-xl text-white/75">
              Pick the job that hurts most on your call. Add more agents once the
              first one earns its keep.
            </p>
          </div>
          <PrimaryCta />
        </div>
      </div>
    </section>
  );
}

function AgentBadge({ agent }: { agent: Agent }) {
  const isService = serviceSlugs.has(agent.slug);
  return (
    <article className="wf-badge relative flex flex-col overflow-hidden rounded-[22px] border border-[var(--wf-line)] bg-white">
      <div className="bg-[var(--wf-cobalt)] px-6 pb-5 pt-10 text-white">
        <p className="text-xs text-white/70">{isService ? "Live service" : "AI agent"}</p>
        <h3 className="wf-wide mt-1 text-xl leading-tight">{agent.name}</h3>
      </div>
      <div className="flex flex-1 flex-col px-6 py-6">
        <p className="font-semibold leading-snug">{agent.tagline}</p>
        <p className="mt-5 text-sm font-semibold">On the job</p>
        <ul className="mt-2 space-y-1.5 text-sm text-[var(--wf-steel)]">
          {agent.steps.slice(0, 3).map((s) => (
            <li key={s} className="flex gap-2">
              <Check size={15} className="mt-0.5 shrink-0 text-[var(--wf-cobalt)]" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-xl bg-[var(--wf-paper)] px-4 py-3 text-sm">
          <span className="font-semibold">Checks with you before </span>
          <span className="text-[var(--wf-steel)]">{approvalLine[agent.slug]}</span>
        </div>
        <Link
          to={agentHref(agent.slug)}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[var(--wf-cobalt)] hover:text-[var(--wf-ink)]"
        >
          Full job description
          <ArrowRight size={15} aria-hidden="true" />
          <span className="sr-only"> for {agent.name}</span>
        </Link>
      </div>
    </article>
  );
}

/* ----------------------------------------------------------- How it works */

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <ul className="space-y-2">
        {[
          ["Inbox Manager", true],
          ["Calendar Manager", true],
          ["Sales Automation", false],
        ].map(([name, on]) => (
          <li key={name as string} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm">
            <span>{name as string}</span>
            <span
              aria-hidden="true"
              className={`relative h-5 w-9 rounded-full ${on ? "bg-[var(--wf-cobalt)]" : "bg-[var(--wf-line)]"}`}
            >
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white ${on ? "left-4.5" : "left-0.5"}`} />
            </span>
          </li>
        ))}
      </ul>
    );
  }
  if (index === 1) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm text-[var(--wf-steel)]">
          <Globe size={16} aria-hidden="true" />
          https://yourbusiness.com
        </div>
        <p className="flex items-center gap-2 text-sm font-semibold text-[var(--wf-done)]">
          <CircleCheck size={16} aria-hidden="true" /> Website connected
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {["price-list.pdf", "services.docx", "faq.md", "refund-policy.pdf"].map((f) => (
        <span key={f} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm">
          <FileText size={15} className="text-[var(--wf-cobalt)]" aria-hidden="true" />
          {f}
        </span>
      ))}
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="wf-paper-section border-y border-[var(--wf-line)] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <div className="max-w-3xl">
          <h2 className="wf-display text-[clamp(2.4rem,5.4vw,4.6rem)]">Up and running in three steps.</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--wf-steel)]">
            You make three decisions. We handle the servers, workflows, security
            and upkeep behind them.
          </p>
        </div>
        <ol className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col">
              <span
                className="wf-display text-[5.5rem] leading-none text-[var(--wf-cobalt)]"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="wf-wide mt-4 text-2xl">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--wf-steel)]">{s.body}</p>
              <div className="mt-6 rounded-2xl bg-[var(--wf-paper)] p-4 lg:mt-auto">
                <StepVisual index={i} />
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-col gap-6 border-t border-[var(--wf-line)] pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-lg leading-relaxed">
            <span className="font-semibold">Founding clients do all three with Wesley on a guided setup call,</span>{" "}
            <span className="text-[var(--wf-steel)]">so nothing is left half-configured.</span>
          </p>
          <PrimaryCta tone="cobalt" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Value equation */

function ValueMath() {
  return (
    <section className="wf-paper-section">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <h2 className="wf-display max-w-4xl text-[clamp(2.2rem,4.8vw,4.2rem)]">
          Why this works when DIY AI didn't.
        </h2>
        <div className="mt-14 hidden overflow-hidden rounded-[28px] border border-[var(--wf-line)] bg-white md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Doing it yourself with AI tools compared with AI Workforce</caption>
            <thead>
              <tr className="border-b border-[var(--wf-line)]">
                <th scope="col" className="w-1/4 p-5 text-sm font-semibold text-[var(--wf-steel)] md:p-7">
                  <span className="sr-only">Factor</span>
                </th>
                <th scope="col" className="p-5 text-sm font-semibold text-[var(--wf-steel)] md:p-7">
                  DIY AI tools
                </th>
                <th scope="col" className="bg-[var(--wf-cobalt)] p-5 text-sm font-semibold text-white md:p-7">
                  AI Workforce
                </th>
              </tr>
            </thead>
            <tbody>
              {valueRows.map((r) => (
                <tr key={r.factor} className="border-b border-[var(--wf-line)] last:border-0">
                  <th scope="row" className="wf-wide p-5 align-top text-base md:p-7 md:text-lg">
                    {r.factor}
                  </th>
                  <td className="p-5 align-top text-[var(--wf-steel)] md:p-7">
                                        {r.diy}
                  </td>
                  <td className="bg-[var(--wf-cobalt)]/[.06] p-5 align-top font-semibold md:p-7">
                                        {r.us}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-10 space-y-4 md:hidden">
          {valueRows.map((r) => (
            <li key={r.factor} className="overflow-hidden rounded-2xl border border-[var(--wf-line)] bg-white">
              <p className="wf-wide px-5 pt-5 text-lg">{r.factor}</p>
              <p className="px-5 pb-4 pt-2 text-[var(--wf-steel)]">
                <span className="block text-xs font-semibold">DIY AI tools</span>
                {r.diy}
              </p>
              <p className="bg-[var(--wf-cobalt)] px-5 py-4 font-semibold text-white">
                <span className="block text-xs font-normal text-white/70">AI Workforce</span>
                {r.us}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Founder */

function Founder() {
  return (
    <section className="bg-[var(--wf-ink)] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
        <div>
          <h2 className="wf-display text-[clamp(2.2rem,4.6vw,4rem)]">
            Built by someone who keeps business systems safe for a living.
          </h2>
          <div className="mt-8 max-w-[36rem] space-y-5 text-lg leading-relaxed text-white/80">
            <p>
              I'm Wesley Swann. For 20 years I've run Microsoft 365, Intune and
              security for businesses that can't afford a breach, or a bad email
              going out in their name.
            </p>
            <p>
              When I started putting AI agents to work, I built them the way I
              build everything else: the least access they need, every action
              logged, and a human approval before anything leaves the building.
              AI Workforce gives you that same setup without building it
              yourself.
            </p>
          </div>
        </div>
        <div className="self-end">
          <ShieldCheck size={40} className="text-[var(--wf-yellow)]" aria-hidden="true" />
          <ul className="mt-6 divide-y divide-white/15 border-y border-white/15">
            {credentials.map((c) => (
              <li key={c} className="wf-wide py-4 text-lg">
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/60">Founder of Cloud2Networks, a Microsoft 365 security and endpoint management practice.</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Offer stack */

function Stack() {
  return (
    <section id="founding" className="wf-paper-section scroll-mt-24">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-28">
        <h2 className="wf-display text-[clamp(2.2rem,4.8vw,4.2rem)]">Everything in the founding package.</h2>
        <div className="mt-12 rounded-[28px] border-2 border-[var(--wf-ink)] bg-white">
          <div className="hidden grid-cols-[1.2fr_1fr] gap-6 border-b border-[var(--wf-line)] px-8 py-4 text-sm font-semibold text-[var(--wf-steel)] md:grid">
            <span>You get</span>
            <span>Instead of</span>
          </div>
          <ul>
            {stack.map((s) => (
              <li
                key={s.item}
                className="grid gap-1 border-b border-[var(--wf-line)] px-6 py-5 last:border-0 md:grid-cols-[1.2fr_1fr] md:gap-6 md:px-8"
              >
                <span className="flex gap-3 font-semibold">
                  <Check size={20} className="mt-0.5 shrink-0 text-[var(--wf-cobalt)]" aria-hidden="true" />
                  {s.item}
                </span>
                <span className="pl-8 text-[var(--wf-steel)] line-through decoration-[var(--wf-steel)]/40 md:pl-0">
                  {s.replaces}
                </span>
              </li>
            ))}
          </ul>
          <div className="rounded-b-[26px] bg-[var(--wf-yellow)] px-6 py-7 md:px-8">
            <p className="wf-wide text-xl">Why founding spots are limited</p>
            <p className="mt-2 max-w-3xl leading-relaxed">
              Every founding client is set up personally by Wesley, not handed to
              a support team. That takes real calendar time, so the founding
              cohort closes when the calendar is full. Founding pricing is set on
              your call, based on the agents you start with.
            </p>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <PrimaryCta tone="cobalt" />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- FAQ */

function Faq() {
  return (
    <section className="wf-paper-section wf-faq border-t border-[var(--wf-line)] bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <h2 className="wf-display text-[clamp(2.2rem,4.4vw,3.6rem)]">Straight answers.</h2>
        <div className="divide-y divide-[var(--wf-line)] border-y border-[var(--wf-line)]">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-semibold">
                {f.q}
                <Plus size={22} className="wf-faq-icon shrink-0 transition-transform" aria-hidden="true" />
              </summary>
              <p className="max-w-[40rem] pb-6 leading-relaxed text-[var(--wf-steel)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Final CTA */

function FinalCta() {
  return (
    <section className="bg-[var(--wf-cobalt)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <h2 className="wf-display max-w-5xl text-[clamp(2.6rem,6.4vw,5.6rem)]">
          Your second workforce is ready when you are.
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
          Book your setup call, pick your first agent, and hand off the work
          you're tired of doing. You stay in charge of everything it sends.
        </p>
        <div className="mt-10">
          <PrimaryCta />
        </div>
      </div>
    </section>
  );
}

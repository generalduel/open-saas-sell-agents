import { Link } from "react-router";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { agentHref, type Agent } from "./agentCatalog";
import { AgentAvatar } from "./agentPeople";
import { PrimaryCta, agentBySlug } from "./funnelUi";
import { approvalLine, featuredSlugs, frontOfficeSlugs } from "./homeContent";
import { usePageTitle } from "../client/hooks/usePageTitle";
import "./landing.css";

// Front Office Bundle: the three lead products plus the supporting agents.
// DRAFT copy for owner approval. No prices, metrics or guarantees.

const supportSlugs = frontOfficeSlugs.filter((s) => !featuredSlugs.includes(s));

const flow = [
  "A lead fills in your website form",
  "Speed-to-Lead drafts a reply from your price list",
  "You approve it on your phone",
  "The reply goes out and the lead lands in your CRM",
  "Calendar offers times and books the call",
  "Invoices and paperwork that follow are pulled into your systems",
];

function toAgents(slugs: string[]) {
  return slugs.map((s) => agentBySlug.get(s)).filter(Boolean) as Agent[];
}

export function FrontOfficePage() {
  usePageTitle("Front Office Bundle");
  const core = toAgents(featuredSlugs);
  const support = toAgents(supportSlugs);

  return (
    <div className="wf">
      <main>
        <section className="bg-[var(--wf-cobalt)] text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div>
              <p className="wf-wide text-sm text-white/75">Front Office Bundle</p>
              <h1 className="wf-display mt-4 text-[clamp(2.6rem,6vw,5rem)]">
                Your front office, handled.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
                New leads answered in minutes, the inbox sorted with replies
                drafted, and invoices pulled into your systems. Lead generation,
                follow-ups, your CRM and your calendar run alongside. You approve
                anything that leaves the building.
              </p>
              <div className="mt-10">
                <PrimaryCta />
              </div>
            </div>
            <figure className="rounded-[28px] bg-[var(--wf-ink)] p-6 sm:p-8">
              <figcaption className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
                <span className="wf-wide text-lg">One lead, start to finish</span>
                <span className="text-xs text-white/55">Example workflow</span>
              </figcaption>
              <ol className="mt-2">
                {flow.map((step, i) => (
                  <li key={step} className="flex items-center gap-4 border-b border-white/10 py-3.5 last:border-0">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                        i === 2 ? "bg-[var(--wf-yellow)] text-[var(--wf-ink)]" : "bg-white/10"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
            </figure>
          </div>
        </section>

        <section className="wf-paper-section">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
            <h2 className="wf-display text-[clamp(2rem,4.4vw,3.6rem)]">The core three</h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {core.map((a) => (
                <AgentCard key={a.slug} agent={a} />
              ))}
            </div>
          </div>
        </section>

        <section className="wf-paper-section border-y border-[var(--wf-line)] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
            <h2 className="wf-display text-[clamp(2rem,4.4vw,3.6rem)]">Running alongside</h2>
            <p className="mt-4 max-w-2xl text-lg text-[var(--wf-steel)]">
              Add the agents that keep your pipeline and your calendar moving.
              Start with the core three and switch these on when you are ready.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {support.map((a) => (
                <AgentCard key={a.slug} agent={a} compact />
              ))}
            </div>
          </div>
        </section>

        <section className="wf-paper-section">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
            <div className="flex flex-col gap-6 rounded-[28px] bg-[var(--wf-yellow)] p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <p className="flex max-w-3xl items-start gap-3 text-lg">
                <ShieldCheck size={26} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="font-semibold">How it is priced: </span>
                  the bundle starts as a fixed-price pilot with a written scope, so
                  you know the price before you commit. Your AI provider bills you
                  directly for usage.
                </span>
              </p>
              <PrimaryCta tone="cobalt" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function AgentCard({ agent, compact = false }: { agent: Agent; compact?: boolean }) {
  return (
    <article className="flex flex-col rounded-[22px] border border-[var(--wf-line)] bg-white p-6">
      <AgentAvatar slug={agent.slug} size={compact ? 44 : 56} decorative />
      <h3 className={`wf-wide mt-5 leading-tight ${compact ? "text-lg" : "text-2xl"}`}>{agent.name}</h3>
      <p className="mt-2 font-semibold leading-snug">{agent.tagline}</p>
      {!compact && (
        <ul className="mt-5 space-y-1.5 text-sm text-[var(--wf-steel)]">
          {agent.steps.slice(0, 4).map((s) => (
            <li key={s} className="flex gap-2">
              <Check size={15} className="mt-0.5 shrink-0 text-[var(--wf-cobalt)]" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-5 text-sm text-[var(--wf-steel)]">
        <span className="font-semibold text-[var(--wf-ink)]">Replaces: </span>
        {agent.replaces}
      </p>
      <p className="mt-3 text-sm text-[var(--wf-steel)]">
        <span className="font-semibold text-[var(--wf-ink)]">Checks with you before </span>
        {approvalLine[agent.slug]}
      </p>
      <Link
        to={agentHref(agent.slug)}
        className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[var(--wf-cobalt)] hover:text-[var(--wf-ink)]"
      >
        Full job description
        <ArrowRight size={15} aria-hidden="true" />
        <span className="sr-only"> for {agent.name}</span>
      </Link>
    </article>
  );
}

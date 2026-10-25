import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft, Check, GraduationCap, Plus, ShieldCheck } from "lucide-react";
import { agents, type Agent } from "./agentCatalog";
import { AgentAvatar, personas } from "./agentPeople";
import { PrimaryCta, StaffCard, UseCaseCard } from "./funnelUi";
import { approvalLine, serviceSlugs } from "./homeContent";
import { crmApi, crmListed, specialties, type Specialty } from "./agentSpecialties";
import { useCases } from "./useCases";
import { usePageTitle } from "../client/hooks/usePageTitle";
import "./landing.css";

export function AgentDetailPage() {
  const { slug } = useParams();
  const agent = agents.find((a) => a.slug === slug);
  usePageTitle(agent ? agent.name : "Agent not found");

  if (slug === "crm-sales-automation") return <Navigate to="/agents/crm-manager" replace />;
  if (!agent) {
    return (
      <div className="wf">
        <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
          <h1 className="wf-display text-5xl">Agent not found</h1>
          <Link to="/#agents" className="mt-6 inline-block font-semibold text-[var(--wf-cobalt)] underline">
            Meet all 12 agents
          </Link>
        </main>
      </div>
    );
  }
  return <AgentPage agent={agent} />;
}

function AgentPage({ agent }: { agent: Agent }) {
  const spec = specialties[agent.slug as Specialty] as (typeof specialties)[Specialty] | undefined;
  const isService = serviceSlugs.has(agent.slug);
  const persona = personas[agent.slug];
  const related = agents.filter((a) => a.slug !== agent.slug && a.category === agent.category).slice(0, 3);
  const relatedUseCases = useCases.filter((u) => u.agents.includes(agent.slug)).slice(0, 3);
  const approvalStep = agent.steps.findIndex((s) => /\b(approval|approve|review|validate)\b/i.test(s));

  return (
    <div className="wf">
      <main>
        {/* Hero */}
        <section className="bg-[var(--wf-cobalt)] text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 md:pb-24 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div>
              <Link to="/#agents" className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white">
                <ArrowLeft size={16} aria-hidden="true" /> All agents
              </Link>
              <div className="mt-8 flex items-center gap-4">
                {isService ? (
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-white/15">
                    <GraduationCap size={30} aria-hidden="true" />
                  </span>
                ) : (
                  <AgentAvatar slug={agent.slug} size={64} decorative />
                )}
                <p className="leading-tight">
                  <span className="wf-wide block text-lg">{isService ? "Live workshop" : persona?.name}</span>
                  <span className="text-sm text-white/75">{agent.name}</span>
                </p>
              </div>
              <h1 className="wf-display mt-8 text-[clamp(2.4rem,5.4vw,4.6rem)]">{spec?.headline ?? agent.tagline}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">{spec?.lead ?? agent.solution}</p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                <PrimaryCta />
                <a href="#how-it-works" className="wf-wide border-b-2 border-white/60 pb-1 hover:border-[var(--wf-yellow)]">
                  See how it works
                </a>
              </div>
            </div>
            <figure className="rounded-[28px] bg-[var(--wf-ink)] p-6 sm:p-8">
              <figcaption className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
                <span className="wf-wide text-lg">{isService ? "Workshop agenda" : "A typical shift"}</span>
                <span className="text-xs text-white/55">Example workflow</span>
              </figcaption>
              <ol className="mt-2">
                {agent.steps.map((step, i) => (
                  <li key={step} className="flex items-center gap-4 border-b border-white/10 py-3.5 last:border-0">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                        i === approvalStep ? "bg-[var(--wf-yellow)] text-[var(--wf-ink)]" : "bg-white/10"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-snug">
                      {step}
                      {i === approvalStep && <span className="mt-0.5 block text-xs text-[var(--wf-yellow)]">Waits for your approval</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </figure>
          </div>
        </section>

        {/* Problem */}
        <section className="wf-paper-section">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:gap-20">
            <h2 className="wf-display text-[clamp(2rem,4.2vw,3.4rem)]">{agent.hook}</h2>
            <div>
              <p className="text-xl leading-relaxed text-[var(--wf-steel)]">{agent.problem}</p>
              {spec && (
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {spec.wins.map((w) => (
                    <li key={w} className="flex gap-3 rounded-2xl border border-[var(--wf-line)] bg-white p-4">
                      <Check size={20} className="mt-0.5 shrink-0 text-[var(--wf-cobalt)]" aria-hidden="true" />
                      <span className="font-semibold leading-snug">{w}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="wf-paper-section scroll-mt-24 border-y border-[var(--wf-line)] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
            <h2 className="wf-display max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)]">How {isService ? "the workshop" : persona?.name ?? "this agent"} works for you</h2>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { t: "Connect your tools", c: agent.integrations },
                { t: "Set your rules", c: agent.approval },
                { t: "See the results", c: agent.metric },
              ].map((s, i) => (
                <li key={s.t} className="rounded-2xl bg-[var(--wf-paper)] p-6">
                  <span className="wf-display text-5xl text-[var(--wf-cobalt)]" aria-hidden="true">{i + 1}</span>
                  <h3 className="wf-wide mt-3 text-xl">{s.t}</h3>
                  <p className="mt-2 leading-relaxed text-[var(--wf-steel)]">{s.c}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-[var(--wf-yellow)] p-6 md:flex-row md:items-center md:justify-between">
              <p className="flex items-start gap-3 text-lg">
                <ShieldCheck size={24} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="font-semibold">Checks with you before </span>
                  {approvalLine[agent.slug]}.
                </span>
              </p>
              <PrimaryCta tone="cobalt" />
            </div>
          </div>
        </section>

        {/* CRM directory */}
        {agent.slug === "crm-manager" && (
          <section className="wf-paper-section">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
              <h2 className="wf-display text-[clamp(2rem,4.2vw,3.4rem)]">Find your CRM</h2>
              <p className="mt-4 max-w-3xl text-lg text-[var(--wf-steel)]">
                CRMs we plan to connect to. Each connection is checked for API access and supported actions during onboarding before your agent uses it.
              </p>
              {[
                { h: "Common CRMs", list: crmListed },
                { h: "Connected through their API", list: crmApi },
              ].map((g) => (
                <div key={g.h} className="mt-10">
                  <h3 className="wf-wide text-xl">{g.h}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.list.map((n) => (
                      <li key={n} className="rounded-full border border-[var(--wf-line)] bg-white px-4 py-2 text-sm">
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {spec && spec.questions.length > 0 && (
          <section className="wf-paper-section wf-faq border-t border-[var(--wf-line)] bg-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
              <h2 className="wf-display text-[clamp(2rem,4vw,3.2rem)]">Questions owners ask</h2>
              <div className="divide-y divide-[var(--wf-line)] border-y border-[var(--wf-line)]">
                {spec.questions.map(([q, a]) => (
                  <details key={q}>
                    <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-semibold">
                      {q}
                      <Plus size={22} className="wf-faq-icon shrink-0 transition-transform" aria-hidden="true" />
                    </summary>
                    <p className="max-w-[40rem] pb-6 leading-relaxed text-[var(--wf-steel)]">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related */}
        {(related.length > 0 || relatedUseCases.length > 0) && (
          <section className="wf-paper-section border-t border-[var(--wf-line)]">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
              {related.length > 0 && (
                <>
                  <h2 className="wf-display text-[clamp(1.8rem,3.4vw,2.8rem)]">Works well with</h2>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((a) => (
                      <StaffCard key={a.slug} slug={a.slug} />
                    ))}
                  </div>
                </>
              )}
              {relatedUseCases.length > 0 && (
                <>
                  <h2 className="wf-display mt-16 text-[clamp(1.8rem,3.4vw,2.8rem)]">Jobs {persona?.name ?? "this agent"} helps with</h2>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedUseCases.map((u) => (
                      <UseCaseCard key={u.slug} useCase={u} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        <section className="bg-[var(--wf-cobalt)] text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between md:py-20">
            <h2 className="wf-display max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)]">
              {spec?.outcome ?? `Put ${isService ? "the workshop" : persona?.name ?? "this agent"} to work.`}
            </h2>
            <PrimaryCta />
          </div>
        </section>
      </main>
    </div>
  );
}


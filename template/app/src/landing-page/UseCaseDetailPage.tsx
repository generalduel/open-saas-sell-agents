import { Link, useParams } from "react-router";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { AgentAvatar, personas } from "./agentPeople";
import { PrimaryCta, StaffCard, UseCaseCard, agentBySlug } from "./funnelUi";
import { steps } from "./homeContent";
import { useCases, useCasesBySlug } from "./useCases";
import "./landing.css";
import { usePageTitle } from "../client/hooks/usePageTitle";

const sentenceCase = (s: string) =>
  /^[A-Z]{2}/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1);

export function UseCaseDetailPage() {
  const { slug } = useParams();
  const useCase = slug ? useCasesBySlug.get(slug) : undefined;
  usePageTitle(useCase?.title ?? "Use case not found");

  if (!useCase) {
    return (
      <div className="wf">
        <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
          <h1 className="wf-display text-5xl">Use case not found</h1>
          <Link to="/use-cases" className="mt-6 inline-block font-semibold text-[var(--wf-cobalt)] underline">
            See all use cases
          </Link>
        </main>
      </div>
    );
  }

  const lead = useCase.agents[0];
  const leadPersona = personas[lead];
  const leadAgent = agentBySlug.get(lead);
  const related = useCases
    .filter((u) => u.category === useCase.category && u.slug !== useCase.slug)
    .slice(0, 3);

  return (
    <div className="wf">
      <main>
        <section className="bg-[var(--wf-cobalt)] text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 md:pb-24 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div>
              <Link to="/use-cases" className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white">
                <ArrowLeft size={16} aria-hidden="true" /> All use cases
              </Link>
              <h1 className="wf-display mt-8 text-[clamp(2.5rem,5.6vw,4.8rem)]">{useCase.title}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">{useCase.summary}</p>
              <div className="mt-10">
                <PrimaryCta />
              </div>
            </div>
            <figure className="rounded-[28px] bg-[var(--wf-ink)] p-6 sm:p-8">
              <figcaption className="text-sm text-white/60">Your team for this job</figcaption>
              <div className="mt-6 flex items-center gap-5">
                <AgentAvatar slug={lead} size={104} decorative />
                <div>
                  <p className="wf-wide text-2xl">{leadPersona?.name}</p>
                  <p className="text-white/70">{leadAgent?.name}, team lead</p>
                </div>
              </div>
              <ul className="mt-6 flex flex-wrap gap-4 border-t border-white/15 pt-6">
                {useCase.agents.slice(1).map((s) => (
                  <li key={s} className="flex items-center gap-3">
                    <AgentAvatar slug={s} size={48} decorative />
                    <span className="text-sm">
                      <span className="block font-semibold">{personas[s]?.name}</span>
                      <span className="text-white/60">{agentBySlug.get(s)?.name}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm">
                <ShieldCheck size={18} className="text-[var(--wf-yellow)]" aria-hidden="true" />
                Hired, trained and managed by AI Workforce
              </p>
            </figure>
          </div>
        </section>

        <section className="wf-paper-section">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="wf-display text-[clamp(2rem,4vw,3.2rem)]">The problem</h2>
              <p className="mt-6 max-w-[36rem] text-xl leading-relaxed text-[var(--wf-steel)]">{useCase.pain}</p>
            </div>
            <div>
              <h2 className="wf-display text-[clamp(2rem,4vw,3.2rem)]">What your team does</h2>
              <ul className="mt-6 space-y-4">
                {useCase.tasks.map((t) => (
                  <li key={t} className="flex gap-3 text-lg">
                    <Check size={22} className="mt-1 shrink-0 text-[var(--wf-cobalt)]" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl bg-[var(--wf-yellow)] p-5">
                <p className="font-semibold">You approve</p>
                <p className="mt-1">{useCase.approve}</p>
              </div>
              {useCase.note && (
                <p className="mt-4 rounded-2xl border border-[var(--wf-line)] bg-white p-5 text-[var(--wf-steel)]">
                  {useCase.note}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="wf-paper-section border-y border-[var(--wf-line)] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
            <h2 className="wf-display text-[clamp(2rem,4vw,3.2rem)]">Meet the team</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {useCase.agents.map((s) => (
                <StaffCard key={s} slug={s} />
              ))}
            </div>
            <h2 className="wf-display mt-20 text-[clamp(2rem,4vw,3.2rem)]">Their first week</h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="rounded-2xl bg-[var(--wf-paper)] p-6">
                  <span className="wf-display text-5xl text-[var(--wf-cobalt)]" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="wf-wide mt-3 text-xl">{s.title}</h3>
                  <p className="mt-2 text-[var(--wf-steel)]">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {related.length > 0 && (
          <section className="wf-paper-section">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
              <h2 className="wf-display text-[clamp(1.8rem,3.4vw,2.8rem)]">Related use cases</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((u) => (
                  <UseCaseCard key={u.slug} useCase={u} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-[var(--wf-cobalt)] text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between md:py-20">
            <h2 className="wf-display max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)]">
              Put {leadPersona?.name ?? "your team"} to work on {sentenceCase(useCase.name)}.
            </h2>
            <PrimaryCta />
          </div>
        </section>
      </main>
    </div>
  );
}

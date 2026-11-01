import { Link } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import { agentHref, type Agent } from "./agentCatalog";
import { AgentAvatar } from "./agentPeople";
import { PrimaryCta, agentBySlug } from "./funnelUi";
import { approvalLine, servicePageSlugs } from "./homeContent";
import { usePageTitle } from "../client/hooks/usePageTitle";
import "./landing.css";

// Services: people-led work (custom builds and workshops), kept apart from the
// agent catalog. DRAFT copy for owner approval. No prices or guarantees.

export function ServicesPage() {
  usePageTitle("Services");
  const services = servicePageSlugs.map((s) => agentBySlug.get(s)).filter(Boolean) as Agent[];

  return (
    <div className="wf">
      <main>
        <section className="bg-[var(--wf-cobalt)] text-white">
          <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-20">
            <p className="wf-wide text-sm text-white/75">Services</p>
            <h1 className="wf-display mt-4 max-w-4xl text-[clamp(2.6rem,6vw,5rem)]">
              When the job needs a custom build or a trained team.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              Some work does not fit a ready-made agent. These services are led
              by Wesley and scoped in writing before anything starts.
            </p>
          </div>
        </section>

        <section className="wf-paper-section">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
            {services.map((a) => (
              <article key={a.slug} className="flex flex-col rounded-[22px] border border-[var(--wf-line)] bg-white p-6 md:p-8">
                <AgentAvatar slug={a.slug} size={56} decorative />
                <h2 className="wf-wide mt-5 text-2xl leading-tight">{a.name}</h2>
                <p className="mt-2 font-semibold leading-snug">{a.tagline}</p>
                <p className="mt-4 leading-relaxed text-[var(--wf-steel)]">{a.solution}</p>
                <ul className="mt-5 space-y-1.5 text-sm text-[var(--wf-steel)]">
                  {a.steps.map((s) => (
                    <li key={s} className="flex gap-2">
                      <Check size={15} className="mt-0.5 shrink-0 text-[var(--wf-cobalt)]" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-[var(--wf-steel)]">
                  <span className="font-semibold text-[var(--wf-ink)]">Replaces: </span>
                  {a.replaces}
                </p>
                <p className="mt-3 text-sm text-[var(--wf-steel)]">
                  <span className="font-semibold text-[var(--wf-ink)]">Signed off by you: </span>
                  {approvalLine[a.slug]}
                </p>
                <Link
                  to={agentHref(a.slug)}
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[var(--wf-cobalt)] hover:text-[var(--wf-ink)]"
                >
                  Learn more
                  <ArrowRight size={15} aria-hidden="true" />
                  <span className="sr-only"> about {a.name}</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[var(--wf-ink)] text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between md:py-20">
            <h2 className="wf-display max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)]">Tell us the job on your setup call.</h2>
            <PrimaryCta />
          </div>
        </section>
      </main>
    </div>
  );
}

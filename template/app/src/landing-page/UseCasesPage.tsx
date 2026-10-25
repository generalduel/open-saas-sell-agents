import { AgentAvatar, personas } from "./agentPeople";
import { PrimaryCta, UseCaseCard } from "./funnelUi";
import { useCaseCategories, useCases } from "./useCases";
import "./landing.css";

export function UseCasesPage() {
  return (
    <div className="wf">
      <main>
        <section className="bg-[var(--wf-cobalt)] text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 md:pb-20 md:pt-20 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
            <div>
            <h1 className="wf-display max-w-4xl text-[clamp(2.6rem,6vw,5rem)]">
              Pick the job. We'll staff it.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              {useCases.length} ways businesses put an AI workforce to work. Each
              one comes with a ready team of agents, set up and managed by us,
              with you approving anything that leaves your business.
            </p>
            <nav aria-label="Use case categories" className="mt-10 flex flex-wrap gap-2">
              {useCaseCategories.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="wf-wide rounded-full border-2 border-white/40 px-5 py-2.5 text-sm transition-colors hover:border-[var(--wf-yellow)]"
                >
                  {c.label}
                </a>
              ))}
            </nav>
            </div>
            <ul aria-hidden="true" className="hidden grid-cols-4 gap-3 lg:grid">
              {Object.keys(personas)
                .filter((s) => s !== "ai-workshops")
                .map((s, i) => (
                  <li key={s} className={i % 2 ? "translate-y-5" : ""}>
                    <AgentAvatar slug={s} size={92} decorative />
                  </li>
                ))}
              <li className="grid h-[92px] w-[92px] translate-y-5 place-items-center rounded-full border-2 border-dashed border-white/50 text-center text-xs font-semibold leading-tight">
                Open
                <br />
                seat
              </li>
            </ul>
          </div>
        </section>

        {useCaseCategories.map((c) => {
          const items = useCases.filter((u) => u.category === c.id);
          return (
            <section key={c.id} id={c.id} className="wf-paper-section scroll-mt-24 border-b border-[var(--wf-line)]">
              <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="wf-display text-[clamp(2rem,4vw,3.2rem)]">{c.label}</h2>
                  <span className="text-sm text-[var(--wf-steel)]">{items.length} use cases</span>
                </div>
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((u) => (
                    <UseCaseCard key={u.slug} useCase={u} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="bg-[var(--wf-ink)] text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between md:py-20">
            <div>
              <h2 className="wf-display text-[clamp(2rem,4vw,3.2rem)]">Don't see your job here?</h2>
              <p className="mt-4 max-w-xl text-lg text-white/75">
                We build custom agents around the way you already work. Tell us
                the job on your setup call.
              </p>
            </div>
            <PrimaryCta />
          </div>
        </section>
      </main>
    </div>
  );
}

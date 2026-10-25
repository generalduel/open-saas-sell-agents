import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { agents, agentHref } from "./agentCatalog";
import { AgentAvatar, personas } from "./agentPeople";
import { BOOKING_URL, PRIMARY_CTA_LABEL } from "./homeContent";
import type { UseCase } from "./useCases";
import { useCaseHref } from "./useCases";

export const agentBySlug = new Map(agents.map((a) => [a.slug, a]));

export function PrimaryCta({
  tone = "yellow",
  label = PRIMARY_CTA_LABEL,
}: {
  tone?: "yellow" | "cobalt";
  label?: string;
}) {
  const colors =
    tone === "yellow"
      ? "bg-[var(--wf-yellow)] text-[var(--wf-ink)] hover:bg-white"
      : "bg-[var(--wf-cobalt)] text-white hover:bg-[var(--wf-ink)]";
  return (
    <a
      href={BOOKING_URL}
      className={`wf-wide inline-flex items-center gap-3 rounded-full px-7 py-4 text-base transition-colors ${colors}`}
    >
      {label}
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}

/** Overlapping row of worker portraits, like a team photo strip. */
export function TeamStack({
  slugs,
  size = 44,
  ring = "var(--wf-paper)",
}: {
  slugs: string[];
  size?: number;
  ring?: string;
}) {
  return (
    <div className="flex items-center">
      {slugs.map((s, i) => (
        <span
          key={s}
          className="rounded-full"
          style={{ marginLeft: i === 0 ? 0 : -size / 4, boxShadow: `0 0 0 3px ${ring}` }}
        >
          <AgentAvatar slug={s} size={size} decorative />
        </span>
      ))}
    </div>
  );
}

/** Small "staff card" for an agent: portrait, persona name, role, link. */
export function StaffCard({ slug, dark = false }: { slug: string; dark?: boolean }) {
  const agent = agentBySlug.get(slug);
  const p = personas[slug];
  if (!agent || !p) return null;
  return (
    <Link
      to={agentHref(slug)}
      className={`group flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
        dark
          ? "border-white/15 bg-white/5 hover:border-white/50"
          : "border-[var(--wf-line)] bg-white hover:border-[var(--wf-ink)]"
      }`}
    >
      <AgentAvatar slug={slug} size={60} decorative />
      <span className="min-w-0">
        <span className="wf-wide block text-lg leading-tight">{p.name}</span>
        <span className={`block text-sm ${dark ? "text-white/70" : "text-[var(--wf-steel)]"}`}>
          {agent.name}
        </span>
      </span>
    </Link>
  );
}

export function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <Link
      to={useCaseHref(useCase.slug)}
      className="group flex h-full flex-col rounded-[22px] border border-[var(--wf-line)] bg-white p-6 transition-colors hover:border-[var(--wf-ink)]"
    >
      <TeamStack slugs={useCase.agents} size={40} ring="#ffffff" />
      <h3 className="wf-wide mt-5 text-xl leading-tight">{useCase.name}</h3>
      <p className="mt-2 flex-1 text-[var(--wf-steel)]">{useCase.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--wf-cobalt)] group-hover:text-[var(--wf-ink)]">
        See the team for this job
        <ArrowRight size={15} aria-hidden="true" />
      </span>
    </Link>
  );
}

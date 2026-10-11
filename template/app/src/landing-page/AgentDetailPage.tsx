import { useParams, Link } from "react-router";
import { agents } from "./agentCatalog";
export function AgentDetailPage() {
  const { slug } = useParams();
  const agent = agents.find(([key]) => key === slug);
  if (!agent) return <main className="mx-auto max-w-4xl px-6 py-24"><h1 className="text-4xl font-bold">Agent not found</h1><Link className="mt-8 inline-block underline" to="/agents">Return to agents</Link></main>;
  const [, name, description] = agent;
  return <main className="mx-auto max-w-5xl px-6 py-20">
    <Link to="/agents" className="text-sm text-muted-foreground hover:underline">← All agents</Link>
    <p className="mt-14 text-sm font-semibold uppercase tracking-widest text-primary">Managed AI Agent · Draft</p>
    <h1 className="mt-4 text-5xl font-bold tracking-tight">{name}</h1>
    <p className="mt-6 max-w-2xl text-xl text-muted-foreground">{description}</p>
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      {[
        ["The problem", "Specific industry pain points: [TBD]"],
        ["What it does", description + " Final scope: [TBD]"],
        ["Systems it connects to", "Approved integrations and supported APIs: [TBD]"],
        ["Approval points", "Human review and authorization requirements: [TBD]"],
        ["Success metric", "Baseline, measurement method and target: [TBD]"],
        ["Pricing", "Q4 pricing decision: [TBD]"]
      ].map(([title, copy]) => <section key={title} className="rounded-2xl border border-border bg-card p-7">
        <h2 className="text-xl font-semibold">{title}</h2><p className="mt-3 text-muted-foreground">{copy}</p>
      </section>)}
    </div>
    <p className="mt-12 text-sm text-muted-foreground">Draft service description only. No live agent or integration is activated on this page.</p>
  </main>;
}

import { useState } from "react";
import { Link } from "react-router";
import { Footer } from "./components/Footer";
import { footerNavigation } from "./contentSections";
import { agents, agentHref } from "./agentCatalog";

const proof = ["Verified customer quote [TBD]","Customer testimonial [TBD]","Approved customer story [TBD]"];
const overview = [
  ["Your API keys", "Keep model billing and API-key ownership within your approved environment. Implementation controls: [TBD]."],
  ["Your business knowledge", "Connect agents to the knowledge and workflows your business approves."],
  ["Security & governance", "Human approval points, access controls and audit expectations are defined per deployment."],
  ["Managed infrastructure", "We handle the operational infrastructure and support scope agreed for each agent."]
];
export function LandingPage() {
 const [selected,setSelected] = useState(0);
 const [demoStarted,setDemoStarted] = useState(false);
 const selectedAgent = agents[selected];
 return <div className="bg-background text-foreground">
  <main>
   <section className="relative overflow-hidden border-b border-border px-6 py-24 md:py-32">
    <div className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
    <div className="relative mx-auto max-w-6xl">
     <p className="mb-6 inline-flex rounded-full border border-primary/30 px-4 py-2 text-sm font-medium text-primary">Managed AI workforce · Concept draft</p>
     <h1 className="max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">Put AI agents to work. <span className="text-primary">Keep control of your business.</span></h1>
     <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground">Managed AI agents that run on your API keys and business knowledge; we handle security, governance, infrastructure.</p>
     <div className="mt-10 flex flex-wrap gap-4"><a href="#agents" className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground">Explore agents →</a><a href="#platform" className="rounded-full border border-border px-7 py-3 font-semibold">How the platform works</a></div>
     <p className="mt-9 text-sm text-muted-foreground">Trust indicators: certifications, client logos and verified performance [TBD] · Primary CTA [TBD]</p>
    </div>
   </section>
   <section className="border-b border-border px-6 py-16" aria-label="Customer proof">
    <div className="mx-auto max-w-6xl"><p className="mb-6 text-xs font-semibold uppercase tracking-[.25em] text-muted-foreground">Client proof — placeholders, not testimonials</p>
     <div className="overflow-hidden"><div className="flex flex-wrap gap-4">{proof.map(p=><div key={p} className="rounded-xl border border-dashed border-border bg-card px-7 py-8 text-muted-foreground">{p}</div>)}</div></div>
    </div>
   </section>
   <section id="agents" className="mx-auto max-w-6xl px-6 py-24">
    <p className="text-sm font-semibold uppercase tracking-widest text-primary">Meet the workforce</p>
    <h2 className="mt-4 text-4xl font-bold md:text-5xl">Nine agents. Built around your operations.</h2>
    <p className="mt-5 text-muted-foreground">Explore each service. Final integrations, approval points and pricing are pending decisions.</p>
    <div className="mt-10 grid gap-4 md:grid-cols-3">{agents.map(([slug,name,description],i)=><Link key={slug} to={agentHref(slug)} className="group rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary"><span className="text-xs text-primary">AGENT {String(i+1).padStart(2,"0")}</span><h3 className="mt-5 text-xl font-semibold group-hover:text-primary">{name}</h3><p className="mt-3 text-muted-foreground">{description}</p><span className="mt-8 block font-semibold">Explore →</span></Link>)}</div>
   </section>
   <section id="demos" className="border-y border-border bg-muted/30 px-6 py-24">
    <div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-widest text-primary">Interactive agent demos</p><h2 className="mt-4 text-4xl font-bold">See the workflow before deployment.</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.4fr]"><div className="space-y-2">{agents.map(([slug,name],i)=><button key={slug} type="button" onClick={()=>{setSelected(i);setDemoStarted(false)}} className={`block w-full rounded-xl border p-4 text-left transition-colors ${selected===i?"border-primary bg-primary/10":"border-border bg-card hover:border-primary/60"}`}>{name}</button>)}</div>
      <div className="flex min-h-80 flex-col justify-between rounded-3xl border border-border bg-card p-8"><div><p className="text-xs uppercase tracking-widest text-primary">Simulated demo · Not connected to live systems</p><h3 className="mt-6 text-3xl font-bold">{selectedAgent[1]}</h3><p className="mt-4 text-muted-foreground">{selectedAgent[2]}</p><div className="mt-8 rounded-xl border border-dashed border-border p-6">{demoStarted ? "Step 1: Review input → Step 2: Human approval [TBD] → Step 3: Agent action [TBD] → Step 4: Measure outcome [TBD]" : "Select Run walkthrough to preview the proposed process. This simulation does not access your data or execute an agent."}</div></div><button onClick={()=>setDemoStarted(v=>!v)} className="mt-10 self-start rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">{demoStarted?"Reset walkthrough":"Run walkthrough →"}</button></div></div>
      <p className="mt-5 text-sm text-muted-foreground">Priority agents for real demos [TBD].</p>
    </div>
   </section>
   <section id="platform" className="mx-auto max-w-6xl px-6 py-24"><p className="text-sm font-semibold uppercase tracking-widest text-primary">Your keys. Your knowledge. Managed delivery.</p><h2 className="mt-4 max-w-4xl text-4xl font-bold">AI operations designed around control and accountability.</h2><div className="mt-12 grid gap-5 md:grid-cols-2">{overview.map(([t,d])=><article key={t} className="rounded-2xl border border-border p-8"><h3 className="text-2xl font-semibold">{t}</h3><p className="mt-4 text-muted-foreground">{d}</p></article>)}</div></section>
   <section id="results" className="border-y border-border bg-muted/20 px-6 py-24"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-widest text-primary">Results / case studies</p><h2 className="mt-4 text-4xl font-bold">Proof before promises.</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{["Customer result [TBD]","Approved case study [TBD]","Verified success metric [TBD]"].map(x=><div key={x} className="rounded-2xl border border-dashed border-border bg-card p-8"><h3 className="text-xl font-semibold">{x}</h3><p className="mt-3 text-muted-foreground">Pending source, customer authorization and measurable evidence.</p></div>)}</div></div></section>
   <section className="mx-auto max-w-6xl px-6 py-20"><div className="grid gap-8 md:grid-cols-3"><div id="solutions"><h2 className="text-xl font-bold">Solutions</h2><p className="mt-3 text-muted-foreground">Business Growth · Additional submenu items [TBD]</p></div><div id="ai-partner"><h2 className="text-xl font-bold">AI Partner</h2><p className="mt-3 text-muted-foreground">Page purpose and content [TBD]</p></div><div id="contact"><h2 className="text-xl font-bold">Contact & Resources</h2><p className="mt-3 text-muted-foreground">Process, FAQ, contact details and approved calls to action [TBD]</p></div></div></section>
  </main><Footer footerNavigation={footerNavigation}/>
 </div>;
}

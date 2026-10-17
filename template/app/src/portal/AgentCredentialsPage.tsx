import { useState } from "react";
import { Link } from "react-router";
import { useQuery,getAgentCredentialWorkspace,provisionAgentCredential } from "wasp/client/operations";
import { ArrowLeft,ArrowRight,ShieldCheck,CheckCircle2,PlugZap,Eye,EyeOff,LockKeyhole } from "lucide-react";

const serviceDescriptions:Record<string,string>={
 openai:"Power your worker with OpenAI models.",
 claude:"Bring Claude reasoning into your workflows.",
 omni:"Connect your Omni-powered services.",
 activecampaign:"Sync campaigns, contacts, and follow-up.",
 amqp:"Connect secure business messaging."
};
const readable=(slug:string)=>slug.split("-").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ");
export function AgentCredentialsPage(){
 const {data,refetch,isLoading,error}=useQuery(getAgentCredentialWorkspace);
 const [entitlement,setEntitlement]=useState("");
 const [service,setService]=useState("");
 const [values,setValues]=useState<Record<string,string>>({});
 const [visible,setVisible]=useState(false);
 const [busy,setBusy]=useState(false);
 const [notice,setNotice]=useState("");
 const selectedEntitlement=entitlement||data?.entitlements?.[0]?.id||"";
 const chosen=data?.services.find((s:any)=>s.id===service);
 const linked=data?.links.filter((x:any)=>x.entitlementId===selectedEntitlement)??[];
 const selectService=(id:string)=>{setService(id);setValues({});setVisible(false);setNotice("");};
 async function save(){if(!chosen||!selectedEntitlement)return;setBusy(true);setNotice("");try{await provisionAgentCredential({entitlementId:selectedEntitlement,service,data:values});setValues({});setNotice("Your connection has been saved to your agent workspace.");await refetch();}catch{setNotice("Connection could not be saved. Please check the details or contact support.");}finally{setBusy(false);}}
 return <main className="min-h-screen bg-[#08131d] px-5 py-12 text-slate-50">
 <div className="mx-auto max-w-6xl">
 <Link to="/portal" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-200"><ArrowLeft size={16}/> My workspace</Link>
 <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
  <div><p className="text-sm font-semibold text-cyan-300">AI WORKFORCE / MY CONNECTIONS</p><h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-tight tracking-tight">Give your AI worker the tools it needs.</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">Connect the services your agent uses, all from your private workspace. We take care of the secure backend setup.</p></div>
  <div className="rounded-2xl border border-cyan-300/20 bg-[#112e3b] p-6"><ShieldCheck className="text-cyan-300" size={30}/><h2 className="mt-4 font-semibold">Your connections stay yours.</h2><p className="mt-2 text-sm leading-relaxed text-slate-300">Only your assigned worker can use the service connections provisioned for your account.</p></div>
 </div>
 {isLoading?<p className="mt-14">Loading your workspace…</p>:error?<p role="alert" className="mt-14 text-red-300">Your connections could not be loaded.</p>:!data?<p className="mt-14">No account data found.</p>:data.entitlements.length===0?<section className="mt-14 rounded-2xl border border-white/15 bg-[#112734] p-8"><h2 className="text-2xl font-semibold">Your worker is not assigned yet</h2><p className="mt-4 max-w-2xl text-slate-300">After your purchase is verified and your worker is assigned, you can connect its tools here. Contact support if you have already purchased an agent.</p><Link className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-300 hover:text-white" to="/pricing">Explore plans <ArrowRight size={17}/></Link></section>:<>
 <section className="mt-14 border-t border-white/20 pt-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-medium text-cyan-300">01 / YOUR WORKER</p><h2 className="mt-3 text-3xl font-semibold">Which worker are we connecting?</h2></div><span className="text-sm text-slate-400">{data.entitlements.length} assigned worker{data.entitlements.length===1?"":"s"}</span></div>
 <div className="mt-7 grid gap-3 md:grid-cols-3">{data.entitlements.map((a:any)=><button key={a.id} type="button" aria-pressed={selectedEntitlement===a.id} onClick={()=>{setEntitlement(a.id);selectService("");}} className={`min-h-32 rounded-xl border p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-cyan-300 ${selectedEntitlement===a.id?"border-cyan-300 bg-[#164350]":"border-white/15 bg-[#102630] hover:border-white/50"}`}><div className="flex items-center justify-between"><PlugZap className="text-cyan-300" size={24}/>{selectedEntitlement===a.id&&<CheckCircle2 size={20} className="text-cyan-300"/>}</div><p className="mt-5 text-lg font-semibold">{readable(a.agentSlug)}</p><p className="mt-1 text-sm text-slate-400">Assigned to your account</p></button>)}</div></section>
 <section className="mt-16 border-t border-white/20 pt-8"><p className="text-sm font-medium text-cyan-300">02 / CONNECT A SERVICE</p><h2 className="mt-3 text-3xl font-semibold">What should your worker connect to?</h2><p className="mt-3 text-slate-300">Choose a service below. You'll only need to enter the details required for that connection.</p>
 <div className="mt-8 max-w-2xl rounded-2xl border border-white/20 bg-[#102630] p-6">
 <label htmlFor="service-select" className="mb-3 block text-sm font-semibold text-slate-200">Service or application</label>
 <select id="service-select" value={service} onChange={e=>selectService(e.target.value)} className="w-full rounded-xl border border-cyan-300/40 bg-[#081b26] px-4 py-4 text-white outline-none focus:border-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-300">
 <option value="">Choose a service to connect…</option>
 {data.services.map((s:any)=><option key={s.id} value={s.id}>{s.label}{linked.some((x:any)=>x.service===s.id&&x.status==="provisioned")?" (Connected)":""}</option>)}
 </select>
 {chosen&&<div className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-[#081b26] p-4">
 <PlugZap size={21} className="mt-0.5 shrink-0 text-cyan-300"/><div><p className="font-semibold">{chosen.label}</p><p className="mt-1 text-sm text-slate-300">{serviceDescriptions[chosen.id]??"Extend your worker with this service."}</p></div>
 </div>}
 <p className="mt-4 text-xs text-slate-400">Choose a provider to see the required connection details below.</p>
 </div></section>
 {chosen&&<section className="mt-14 rounded-[1.75rem] border border-cyan-300/30 bg-[#102b38] p-6 sm:p-10"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-sm font-semibold text-cyan-300">03 / SECURE CONNECTION</p><h2 className="mt-3 text-3xl font-semibold">Connect {chosen.label}</h2><p className="mt-3 max-w-xl text-slate-300">Enter the details for your account. Your saved secret values won't be shown again.</p></div><LockKeyhole size={32} className="text-cyan-300"/></div>
 <div className="mt-9 grid gap-6 md:grid-cols-2">{chosen.fields.map((f:any)=><label key={f.key} className="block"><span className="mb-2 block text-sm font-medium text-white">{f.label}</span><span className="flex items-center gap-2"><input autoComplete="off" spellCheck={false} type={f.secret&&!visible?"password":"text"} value={values[f.key]??""} onChange={e=>setValues(v=>({...v,[f.key]:e.target.value}))} className="min-w-0 w-full rounded-xl border border-white/25 bg-[#071b26] p-3.5 text-white outline-none focus:border-cyan-300" placeholder={f.secret?"Enter securely":f.label}/>{f.secret&&<button type="button" aria-label={visible?"Hide key":"Show key"} onClick={()=>setVisible(v=>!v)} className="rounded-xl border border-white/20 p-3.5 hover:bg-white/10">{visible?<EyeOff size={18}/>:<Eye size={18}/>}</button>}</span></label>)}</div>
 <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-white/15 pt-7"><button type="button" onClick={save} disabled={busy||chosen.fields.some((f:any)=>!values[f.key]?.trim())} className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-7 py-3.5 font-semibold text-[#061b25] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">{busy?"Connecting…":"Save connection"} <ArrowRight size={17}/></button><p className="max-w-md text-xs leading-relaxed text-slate-400">The connection is configured through our secure server. Your account never receives backend administrator credentials.</p></div></section>}
 <section className="mt-16 border-t border-white/20 pt-8"><p className="text-sm font-medium text-cyan-300">YOUR SETUP</p><h2 className="mt-3 text-3xl font-semibold">Connected services</h2><div className="mt-7 grid gap-3 md:grid-cols-2">{linked.length?linked.map((v:any)=><div key={v.service} className="flex items-center justify-between gap-4 rounded-xl border border-white/15 bg-[#102630] p-5"><div><p className="font-semibold">{data.services.find((s:any)=>s.id===v.service)?.label??v.service}</p><p className="mt-1 text-sm text-slate-400">For your selected worker</p></div><span className="text-sm text-cyan-300">{v.status==="provisioned"?"Connected":v.status}</span></div>):<div className="rounded-xl border border-dashed border-white/25 px-6 py-8 text-slate-300">No services connected yet. Select one above to get started.</div>}</div></section>
 {notice&&<p role="status" className="mt-6 rounded-xl border border-white/25 bg-[#102630] p-5 text-slate-100">{notice}</p>}
 </>}
 </div></main>;
}

import { LoginForm, googleSignInUrl } from "wasp/client/auth";
import { Link as WaspRouterLink, routes } from "wasp/client/router";
import { ArrowLeft, ArrowRight, Database, ShieldCheck, Workflow } from "lucide-react";
import { useRedirectIfLoggedIn } from "./hooks/useRedirectIfLoggedIn";

export function LoginPage() {
  useRedirectIfLoggedIn();
  return (
    <main className="min-h-[calc(100vh-6rem)] bg-[#08131d] text-white">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl lg:grid-cols-2">
        <section className="relative flex flex-col justify-center overflow-hidden px-6 py-16 sm:px-12 lg:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="relative max-w-lg">
            <WaspRouterLink to={routes.LandingPageRoute.to} className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
              <ArrowLeft size={16}/> Back to AI Workforce
            </WaspRouterLink>
            <p className="mt-20 text-sm font-semibold text-cyan-300">Your workspace, securely connected</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">Welcome back to your AI workforce.</h1>
            <p className="mt-7 text-lg leading-relaxed text-slate-300">Sign in to manage your account and access the tools available to your organization. Your agents and integrations are configured according to your approved services.</p>
            <div className="mt-14 space-y-7 border-t border-white/15 pt-9">
              <div className="flex items-start gap-4"><Database className="mt-1 shrink-0 text-cyan-300" size={23}/><div><h2 className="font-semibold">Your business knowledge</h2><p className="mt-1 text-sm text-slate-400">Connect approved data sources and workflows.</p></div></div>
              <div className="flex items-start gap-4"><ShieldCheck className="mt-1 shrink-0 text-cyan-300" size={23}/><div><h2 className="font-semibold">Governance by design</h2><p className="mt-1 text-sm text-slate-400">Define permissions and human review for sensitive actions.</p></div></div>
              <div className="flex items-start gap-4"><Workflow className="mt-1 shrink-0 text-cyan-300" size={23}/><div><h2 className="font-semibold">Managed workflows</h2><p className="mt-1 text-sm text-slate-400">Work with the integrations enabled for your account.</p></div></div>
            </div>
          </div>
        </section>
        <section className="flex items-center justify-center border-t border-white/10 bg-[#102630] px-6 py-16 sm:px-12 lg:border-l lg:border-t-0" aria-labelledby="signin-title">
          <div className="w-full max-w-md">
            <p className="text-sm font-semibold text-cyan-300">Account access</p>
            <h2 id="signin-title" className="mt-3 text-4xl font-semibold tracking-tight">Sign in</h2>
            <p className="mt-3 text-slate-300">Enter your account credentials to continue.</p>
            <div className="mt-9 rounded-2xl bg-white p-7 text-gray-900 shadow-2xl shadow-black/20 sm:p-9">
              <LoginForm />
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4 text-xs text-slate-400"><span className="h-px flex-1 bg-white/20"/><span>OR CONTINUE WITH</span><span className="h-px flex-1 bg-white/20"/></div>
              <a href={googleSignInUrl} className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/30 bg-white px-5 py-3 font-semibold text-[#102630] hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
                <span className="font-bold text-[#4285F4]" aria-hidden="true">G</span> Continue with Google
              </a>
              <div className="rounded-xl border border-white/15 bg-white/5 px-5 py-4">
                <span className="font-semibold text-slate-200">Continue with Amazon</span>
                <p className="mt-1 text-xs text-slate-400">Coming soon — requires a separately configured Login with Amazon identity provider.</p>
              </div>
            </div>
            <div className="mt-7 space-y-4 text-sm">
              <p className="text-slate-300">New to AI Workforce?{" "}
                <WaspRouterLink to={routes.SignupRoute.to} className="inline-flex items-center gap-1 font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">Create an account <ArrowRight size={14}/></WaspRouterLink>
              </p>
              <p className="text-slate-300">Forgot your password?{" "}
                <WaspRouterLink to={routes.RequestPasswordResetRoute.to} className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">Reset password</WaspRouterLink>
              </p>
            </div>
            <p className="mt-10 text-xs leading-relaxed text-slate-400">Authentication is provided by the existing Wasp email sign-in flow. This design does not change credentials, authentication rules, or user permissions.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

import { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import "../landing-page/landing.css";
import { TeamStack } from "../landing-page/funnelUi";

/** Shared layout for sign-in, sign-up, password reset and email verification. */
export function AuthPageLayout({
  children,
  title = "Your AI workforce, one sign-in away.",
  intro = "Manage your agents, connect your tools and review anything waiting for your approval.",
  formTitle,
}: {
  children: ReactNode;
  title?: string;
  intro?: string;
  formTitle?: string;
}) {
  return (
    <div className="wf">
      <main className="grid min-h-[calc(100vh-6rem)] lg:grid-cols-2">
        <section className="bg-[var(--wf-cobalt)] px-4 py-14 text-white sm:px-10 lg:flex lg:flex-col lg:justify-center lg:px-16">
          <div className="max-w-lg">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
              <ArrowLeft size={16} aria-hidden="true" /> Back to AI Workforce
            </Link>
            <h1 className="wf-display mt-10 text-[clamp(2.2rem,4.6vw,3.8rem)] lg:mt-16">{title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85">{intro}</p>
            <div className="mt-10 hidden items-center gap-4 lg:flex">
              <TeamStack slugs={["inbox-manager", "calendar-manager", "ai-lead-generation", "crm-manager"]} size={44} ring="#1f35e8" />
              <p className="text-sm text-white/80">Your agents check with you before anything leaves your business.</p>
            </div>
            <p className="mt-10 hidden items-center gap-2 text-sm text-white/70 lg:flex">
              <ShieldCheck size={18} className="text-[var(--wf-yellow)]" aria-hidden="true" />
              Saved credentials are encrypted and never shown back in the browser.
            </p>
          </div>
        </section>
        <section className="wf-paper-section flex items-center justify-center px-4 py-14 sm:px-10">
          <div className="w-full max-w-md">
            {formTitle && <h2 className="wf-wide mb-6 text-3xl">{formTitle}</h2>}
            <div className="rounded-[24px] border border-[var(--wf-line)] bg-white p-6 text-gray-900 sm:p-8">
              <div className="-mt-6">{children}</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

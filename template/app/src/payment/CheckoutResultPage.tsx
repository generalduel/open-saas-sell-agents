import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Link } from "wasp/client/router";

const REDIRECT_DELAY_MS = 4000;
export enum CheckoutResult { Success = "success", Canceled = "canceled" }
export function CheckoutResultPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const status = params.get("status");
  const valid = status === CheckoutResult.Success || status === CheckoutResult.Canceled;
  useEffect(() => {
    if (!valid) return;
    const timer = setTimeout(() => navigate("/portal"), REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [navigate, valid]);

  if (!valid) return <main className="min-h-[60vh] bg-[#08131d] px-6 py-20 text-white"><h1 className="text-3xl font-semibold">Checkout status unavailable</h1><p className="mt-4 text-slate-300">We cannot confirm a checkout result from this link. Check your billing status in the customer portal.</p><Link to="/portal" className="mt-7 inline-block text-cyan-300 underline">Return to your workspace</Link></main>;
  return <main className="min-h-[60vh] bg-[#08131d] px-6 py-20 text-white"><div className="mx-auto max-w-xl rounded-2xl border border-white/15 bg-[#102630] p-9">
    <p className="text-sm font-semibold text-cyan-300">AI WORKFORCE · BILLING</p>
    <h1 className="mt-5 text-3xl font-semibold">{status === CheckoutResult.Success ? "Checkout returned — confirmation pending" : "Checkout was canceled"}</h1>
    <p className="mt-5 text-slate-300">{status === CheckoutResult.Success ? "The payment processor must confirm your purchase before account or agent access is updated. A checkout redirect alone is not payment confirmation." : "No purchase was confirmed by this checkout. You can return to your workspace or choose a plan when ready."}</p>
    <p className="mt-5 text-sm text-slate-400">Returning to your workspace in {REDIRECT_DELAY_MS / 1000} seconds…</p>
    <Link to="/portal" className="mt-7 inline-block rounded-full bg-cyan-300 px-6 py-3 font-semibold text-[#08131d]">Go to my workspace</Link>
  </div></main>;
}

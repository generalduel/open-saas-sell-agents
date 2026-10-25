import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import "../../landing-page/landing.css";
import { usePageTitle } from "../hooks/usePageTitle";

export function NotFoundPage() {
  usePageTitle("Page not found");

  return (
    <div className="wf">
      <main className="bg-[var(--wf-cobalt)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
          <p className="wf-display text-[clamp(5rem,14vw,10rem)] text-[var(--wf-yellow)]">404</p>
          <h1 className="wf-display mt-6 max-w-3xl text-[clamp(2.2rem,5vw,4rem)]">
            This page isn't on the roster.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            The link may be old or mistyped. Try the home page, or see what our
            agents can take on.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Link
              to="/"
              className="wf-wide inline-flex items-center gap-3 rounded-full bg-[var(--wf-yellow)] px-7 py-4 text-[var(--wf-ink)] transition-colors hover:bg-white"
            >
              Go to the home page <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to="/use-cases"
              className="wf-wide border-b-2 border-white/60 pb-1 transition-colors hover:border-[var(--wf-yellow)]"
            >
              Browse use cases
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

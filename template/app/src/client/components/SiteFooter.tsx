import "../../landing-page/landing.css";
import { Link } from "react-router";
import { agents, agentHref } from "../../landing-page/agentCatalog";
import { BOOKING_URL } from "../../landing-page/homeContent";
import { useCaseHref, useCases } from "../../landing-page/useCases";
import { photoCredits } from "../../landing-page/agentPeople";

// Site-wide footer, rendered by App.tsx on every non-admin page.
// Self-contained colors so it reads the same in light and dark mode.
// TODO(owner): add Privacy and Terms links once those pages exist.

const featured = [
  "inbox-manager",
  "calendar-manager",
  "ai-lead-generation",
  "sales-automation",
  "crm-manager",
  "custom-ai-agents",
];

const linkClass =
  "text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd23f]";

export function SiteFooter() {
  const featuredAgents = featured
    .map((slug) => agents.find((a) => a.slug === slug))
    .filter((a): a is (typeof agents)[number] => Boolean(a));

  return (
    <footer
      aria-labelledby="site-footer-heading"
      className="bg-[#0b1033] text-white"
      style={{ fontFamily: '"Archivo", ui-sans-serif, system-ui, sans-serif' }}
    >
      <h2 id="site-footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_2fr_.9fr_.9fr] lg:py-20">
        <div>
          <p className="text-2xl font-extrabold" style={{ fontStretch: "118%" }}>
            AI Workforce
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
            Managed AI agents that do real work for your business and check
            with you before anything leaves the building.
          </p>
          <a
            href={BOOKING_URL}
            className="mt-6 inline-flex rounded-full bg-[#ffd23f] px-5 py-2.5 text-sm font-bold text-[#0b1033] transition-colors hover:bg-white"
          >
            Book a setup call
          </a>
        </div>

        <nav aria-label="Agents">
          <h3 className="text-sm font-semibold">Agents</h3>
          <ul className="mt-4 space-y-3">
            {featuredAgents.map((a) => (
              <li key={a.slug}>
                <Link to={agentHref(a.slug)} className={linkClass}>
                  {a.name.replace(/ Agent$/, "")}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/agents" className={`${linkClass} font-semibold text-white`}>
                All 12 agents
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Use cases">
          <h3 className="text-sm font-semibold">Use cases</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
            {useCases.map((u) => (
              <li key={u.slug}>
                <Link to={useCaseHref(u.slug)} className={linkClass}>
                  {u.name}
                </Link>
              </li>
            ))}
            <li className="col-span-2">
              <Link to="/use-cases" className={`${linkClass} font-semibold text-white`}>
                View all use cases
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Your account">
          <h3 className="text-sm font-semibold">Your account</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <Link to="/portal" className={linkClass}>
                Client portal
              </Link>
            </li>
            <li>
              <Link to="/login" className={linkClass}>
                Log in
              </Link>
            </li>
            <li>
              <Link to="/signup" className={linkClass}>
                Create an account
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <Link to="/#how-it-works" className={linkClass}>
                How it works
              </Link>
            </li>
            <li>
              <Link to="/#founding" className={linkClass}>
                Founding package
              </Link>
            </li>
            <li>
              <a
                href="https://cloud2networks.com"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Cloud2Networks
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-white/55 sm:px-6">
          <p>&copy; {new Date().getFullYear()} AI Workforce, my2ndworkforce.com</p>
          <p>Every outbound agent action waits for your approval by default.</p>
        </div>
        <p className="mx-auto max-w-7xl px-4 pb-6 text-xs leading-relaxed text-white/45 sm:px-6">
          Agent portraits are stock photos of models from{" "}
          <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
            Unsplash
          </a>{" "}
          that represent AI agents. They are not employees or customers. Photos by{" "}
          {photoCredits.map((c, i) => (
            <span key={c.name}>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                {c.name}
              </a>
              {i < photoCredits.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}

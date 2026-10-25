import { GraduationCap } from "lucide-react";

// "Agents as people": each catalog agent has a persona name and a stock
// professional headshot. The headshots are Unsplash photos of models, used under the
// Unsplash License, and they represent AI agents. They are NOT employees or
// customers: every portrait carries an "AI" badge and the site footer says so.
// Persona names are a DRAFT brand choice for owner approval.

export type Persona = {
  name: string;
  /** Unsplash photo id (the part after "photo-" in images.unsplash.com URLs). */
  photo?: string;
  photographer?: string;
  photographerUrl?: string;
};

export const personas: Record<string, Persona> = {
  "inbox-manager": {
    name: "Iris",
    photo: "1573496527892-904f897eb744",
    photographer: "Christina @ wocintechchat.com",
    photographerUrl: "https://unsplash.com/@wocintechchat",
  },
  "calendar-manager": {
    name: "Cleo",
    photo: "1573496799515-eebbb63814f2",
    photographer: "Christina @ wocintechchat.com",
    photographerUrl: "https://unsplash.com/@wocintechchat",
  },
  "ai-lead-generation": {
    name: "Leo",
    photo: "1718392372850-84ccd5d36e7a",
    photographer: "Jonathan Wilson",
    photographerUrl: "https://unsplash.com/@jonwilsonmft",
  },
  "sales-automation": {
    name: "Sam",
    photo: "1576533247967-79124db83e48",
    photographer: "Peter F. Wolf",
    photographerUrl: "https://unsplash.com/@peterfwolf",
  },
  "full-sales-teams": {
    name: "Sasha",
    photo: "1608875848903-06eec0bd71e2",
    photographer: "AR MILON",
    photographerUrl: "https://unsplash.com/@armilon9444727",
  },
  "crm-manager": {
    name: "Cora",
    photo: "1699899657680-421c2c2d5064",
    photographer: "Giorgio Trovato",
    photographerUrl: "https://unsplash.com/@giorgiotrovato",
  },
  "hr-services": {
    name: "Hana",
    photo: "1573497019236-17f8177b81e8",
    photographer: "Christina @ wocintechchat.com",
    photographerUrl: "https://unsplash.com/@wocintechchat",
  },
  "ai-recruitment-ecosystem": {
    name: "Reese",
    photo: "1509112552557-8eb3dab85cfc",
    photographer: "Royal Anwar",
    photographerUrl: "https://unsplash.com/@royalanwar",
  },
  "ai-resume-screening": {
    name: "Remy",
    photo: "1644268756851-3f69ffb9553f",
    photographer: "Scott Goodwill",
    photographerUrl: "https://unsplash.com/@scottagoodwill",
  },
  "reputation-management-threat-intelligence": {
    name: "Rory",
    photo: "1721625720175-14df9cbc2b42",
    photographer: "Andy Sartori",
    photographerUrl: "https://unsplash.com/@andysartori",
  },
  "custom-ai-agents": {
    name: "Max",
    photo: "1718392372853-fa38c8ff37c8",
    photographer: "Jonathan Wilson",
    photographerUrl: "https://unsplash.com/@jonwilsonmft",
  },
  // A live service run by Wesley, so no agent persona photo.
  "ai-workshops": { name: "Workshops" },
};

/** Unique photographers, for the credits line. */
export const photoCredits = Array.from(
  new Map(
    Object.values(personas)
      .filter((p) => p.photographer && p.photographerUrl)
      .map((p) => [p.photographer!, p.photographerUrl!]),
  ),
).map(([name, url]) => ({ name, url }));

function photoUrl(id: string, px: number) {
  return `https://images.unsplash.com/photo-${id}?w=${px}&h=${px}&fit=crop&crop=faces&auto=format&q=75`;
}

/**
 * Circular agent portrait with an "AI" badge. Renders the stock photo when the
 * persona has one, otherwise an initial on a brand-colored circle.
 */
export function AgentAvatar({
  slug,
  size = 96,
  className = "",
  decorative = false,
  badge = true,
}: {
  slug: string;
  size?: number;
  className?: string;
  decorative?: boolean;
  badge?: boolean;
}) {
  const p = personas[slug] ?? { name: "AI" };
  const px = size <= 64 ? 128 : size <= 128 ? 256 : 400;
  const badgeSize = Math.max(14, Math.round(size * 0.24));
  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {p.photo ? (
        <img
          src={photoUrl(p.photo, px)}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          alt={decorative ? "" : `${p.name}, AI agent (stock photo)`}
          className="h-full w-full rounded-full bg-[#dfe5ff] object-cover"
        />
      ) : slug === "ai-workshops" ? (
        <span
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : "AI Workshops, live service"}
          aria-hidden={decorative ? true : undefined}
          className="grid h-full w-full place-items-center rounded-full bg-[#1f35e8] text-white"
        >
          <GraduationCap size={Math.round(size * 0.45)} aria-hidden="true" />
        </span>
      ) : (
        <span
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : p.name}
          aria-hidden={decorative ? true : undefined}
          className="grid h-full w-full place-items-center rounded-full bg-[#1f35e8] font-extrabold text-white"
          style={{ fontSize: size * 0.4 }}
        >
          {p.name.charAt(0)}
        </span>
      )}
      {badge && size >= 36 && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 grid place-items-center rounded-full border-2 border-white bg-[#ffd23f] font-extrabold leading-none text-[#1f35e8]"
          style={{ width: badgeSize, height: badgeSize, fontSize: badgeSize * 0.42 }}
        >
          AI
        </span>
      )}
    </span>
  );
}

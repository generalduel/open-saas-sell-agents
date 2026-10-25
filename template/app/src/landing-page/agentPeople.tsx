// "Agents as people": each catalog agent has a persona name and a stock
// portrait. The portraits are Unsplash photos of models, used under the
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
    photo: "1581322929625-f4aab333778a",
    photographer: "Jose G. Ortega Castro",
    photographerUrl: "https://unsplash.com/@j0rt",
  },
  "calendar-manager": {
    name: "Cleo",
    photo: "1753120879121-678c3d42542e",
    photographer: "Marcos Vinícius",
    photographerUrl: "https://unsplash.com/@marcosvini",
  },
  "ai-lead-generation": {
    name: "Leo",
    photo: "1757744705465-ea08b0ddc38a",
    photographer: "Josias Garibay",
    photographerUrl: "https://unsplash.com/@josiasegl",
  },
  "sales-automation": {
    name: "Sam",
    photo: "1531750026848-8ada78f641c2",
    photographer: "Jackson Schaal",
    photographerUrl: "https://unsplash.com/@jackson_schaal",
  },
  "full-sales-teams": {
    name: "Sasha",
    photo: "1607990283143-e81e7a2c9349",
    photographer: "Compagnons",
    photographerUrl: "https://unsplash.com/@sigmund",
  },
  "crm-manager": {
    name: "Cora",
    photo: "1713947506170-f9c01bcf7be7",
    photographer: "Vitaly Gariev",
    photographerUrl: "https://unsplash.com/@silverkblack",
  },
  "hr-services": {
    name: "Hana",
    photo: "1758691737605-69a0e78bd193",
    photographer: "Vitaly Gariev",
    photographerUrl: "https://unsplash.com/@silverkblack",
  },
  "ai-recruitment-ecosystem": {
    name: "Reese",
    photo: "1648146394230-9f0076ee1056",
    photographer: "Terrillo Walls",
    photographerUrl: "https://unsplash.com/@terrillo",
  },
  "ai-resume-screening": {
    name: "Remy",
    photo: "1787724779241-cb5c250ed70b",
    photographer: "Vitaly Gariev",
    photographerUrl: "https://unsplash.com/@silverkblack",
  },
  "reputation-management-threat-intelligence": {
    name: "Rory",
    photo: "1758518727984-17b37f2f0562",
    photographer: "Vitaly Gariev",
    photographerUrl: "https://unsplash.com/@silverkblack",
  },
  "custom-ai-agents": {
    name: "Maya",
    photo: "1713946598551-4b7b910cf4c4",
    photographer: "Vitaly Gariev",
    photographerUrl: "https://unsplash.com/@silverkblack",
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

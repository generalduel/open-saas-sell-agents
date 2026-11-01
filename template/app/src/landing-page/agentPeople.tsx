import type { LucideIcon } from "lucide-react";
import {
  Bot,
  CalendarDays,
  Database,
  FileInput,
  GraduationCap,
  Inbox,
  Search,
  Star,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

// Agents are shown as job icons, not people. Earlier drafts used stock-photo
// personas; those were removed because they read as fake staff. `name` is the
// short role label used in tight spaces (menus, rosters, chips).

export type Persona = {
  name: string;
  icon: LucideIcon;
};

export const personas: Record<string, Persona> = {
  "speed-to-lead": { name: "Speed-to-Lead", icon: Zap },
  "inbox-manager": { name: "Inbox Triage", icon: Inbox },
  "document-intake": { name: "Document Intake", icon: FileInput },
  "ai-lead-generation": { name: "Lead Generation", icon: Search },
  "sales-automation": { name: "Sales Automation", icon: Workflow },
  "full-sales-teams": { name: "Sales Team", icon: Users },
  "crm-manager": { name: "CRM Manager", icon: Database },
  "calendar-manager": { name: "Calendar", icon: CalendarDays },
  "review-requests": { name: "Reviews", icon: Star },
  "custom-ai-agents": { name: "Custom Agent", icon: Bot },
  "ai-workshops": { name: "Workshops", icon: GraduationCap },
};

/** Kept for compatibility: no third-party photos are used any more. */
export const photoCredits: { name: string; url: string }[] = [];

/**
 * Round job icon for an agent. `badge` adds a small "AI" marker for places
 * where it helps to say the worker is software.
 */
export function AgentAvatar({
  slug,
  size = 96,
  className = "",
  decorative = false,
  badge = false,
}: {
  slug: string;
  size?: number;
  className?: string;
  decorative?: boolean;
  badge?: boolean;
}) {
  const p = personas[slug] ?? { name: "AI agent", icon: Bot };
  const Icon = p.icon;
  const badgeSize = Math.max(14, Math.round(size * 0.24));
  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : `${p.name} agent`}
        aria-hidden={decorative ? true : undefined}
        className="grid h-full w-full place-items-center rounded-full bg-[#1f35e8] text-white"
      >
        <Icon size={Math.round(size * 0.46)} strokeWidth={1.8} aria-hidden="true" />
      </span>
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

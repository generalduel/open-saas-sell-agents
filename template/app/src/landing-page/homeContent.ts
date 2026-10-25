// Home page funnel content. Copy is a DRAFT for owner approval before deploy.
// Nothing here may claim metrics, customers, testimonials, prices or guarantees
// that do not exist (see DESIGN.md and the brand guardrails).

/**
 * Primary call to action used everywhere on the home page.
 * TODO(owner): replace BOOKING_URL with the real booking link (Moxie scheduler
 * or similar) before deploy. "/signup" is a temporary stand-in only: after
 * signup the app currently redirects to the template demo app.
 */
export const BOOKING_URL = "/signup";
export const PRIMARY_CTA_LABEL = "Book my setup call";

export type JobGroupId = "customers" | "office" | "hiring" | "protect";

export const jobGroups: {
  id: JobGroupId;
  label: string;
  promise: string;
  slugs: string[];
}[] = [
  {
    id: "customers",
    label: "Win customers",
    promise: "Find leads, follow up fast and keep your pipeline moving.",
    slugs: [
      "ai-lead-generation",
      "sales-automation",
      "full-sales-teams",
      "crm-manager",
    ],
  },
  {
    id: "office",
    label: "Run the office",
    promise: "Take the inbox, the calendar and the HR admin off your plate.",
    slugs: ["inbox-manager", "calendar-manager", "hr-services"],
  },
  {
    id: "hiring",
    label: "Hire people",
    promise: "Run a cleaner hiring process without losing the human call.",
    slugs: ["ai-recruitment-ecosystem", "ai-resume-screening"],
  },
  {
    id: "protect",
    label: "Protect and build",
    promise: "Watch your reputation, build custom agents and train your team.",
    slugs: [
      "reputation-management-threat-intelligence",
      "custom-ai-agents",
      "ai-workshops",
    ],
  },
];

/** Short "what still needs your OK" line per catalog item, derived from each agent's approval policy. */
export const approvalLine: Record<string, string> = {
  "ai-lead-generation": "any outreach is sent",
  "sales-automation": "outbound messages, pricing or bulk record changes",
  "full-sales-teams": "pricing, proposals or messages go out",
  "crm-manager": "bulk edits and outbound actions",
  "inbox-manager": "anything is sent, deleted, archived or forwarded",
  "calendar-manager": "events are created, moved or cancelled",
  "hr-services": "anything that touches an employee-sensitive decision",
  "ai-recruitment-ecosystem": "candidate selections and candidate-facing decisions",
  "ai-resume-screening": "every outcome. It never rejects a candidate on its own",
  "reputation-management-threat-intelligence": "public replies and remediation",
  "custom-ai-agents": "tool permissions, data access and production actions",
  "ai-workshops": "pilot scope, signed off by your leadership",
};

/** Catalog items that are services rather than software agents. */
export const serviceSlugs = new Set(["ai-workshops"]);

export const steps = [
  {
    title: "Manage your agents",
    body: "Turn on the agents you want, tell each one how your business works, and decide what needs your approval. One dashboard for every agent.",
  },
  {
    title: "Connect your website",
    body: "Add your website so your agents know your services and pages, and can pick up the inquiries that come in through it.",
  },
  {
    title: "Add your knowledge files",
    body: "Upload what you already have: price lists, FAQs, policies, service menus. Your agents answer from your facts instead of guessing.",
  },
];

export const valueRows = [
  {
    factor: "What you get",
    diy: "A chatbot you still have to babysit",
    us: "Agents doing defined jobs inside your business",
  },
  {
    factor: "Odds it works",
    diy: "Depends on your prompts and your spare evenings",
    us: "Set up by a 20-year Microsoft security operator, with approval gates from day one",
  },
  {
    factor: "Time to results",
    diy: "Weeks of tinkering before anything runs",
    us: "Three setup steps, done with you on one call",
  },
  {
    factor: "Your effort",
    diy: "You build, host, patch and monitor it",
    us: "You approve the work. We build, host and monitor.",
  },
];

export const stack = [
  {
    item: "Your first agents, configured to your rules",
    replaces: "Weeks of prompt and workflow building",
  },
  { item: "Your website connected", replaces: "A ticket for your web developer" },
  {
    item: "Your knowledge files loaded and organized",
    replaces: "Copy-pasting your FAQ into a chatbot",
  },
  {
    item: "Approval rules on every outbound action",
    replaces: "Hoping the AI gets it right",
  },
  {
    item: "Hosting, workflows and monitoring run for you",
    replaces: "Servers, updates and 2 a.m. failures",
  },
  {
    item: "Runs on your own AI account, billed to you directly",
    replaces: "Marked-up usage fees",
  },
  {
    item: "Direct access to Wesley during onboarding",
    replaces: "A support ticket queue",
  },
];

export const credentials = [
  "3x Microsoft Cloud Architect",
  "Cybersecurity Architect",
  "Ethical Hacker",
  "AI Automation Architect",
];

export const faqs = [
  {
    q: "What is an AI agent, exactly?",
    a: "Software that does one defined job, like sorting email or qualifying leads, using an AI model plus your business information. Think of it as a role on your team, not a chat window.",
  },
  {
    q: "Will an agent send something without my permission?",
    a: "Not by default. Anything that leaves your business, like an email, a message or a calendar invite to someone outside, waits for your approval. Agents start by drafting, and you loosen the rules only when you trust the work.",
  },
  {
    q: "Do I need my own AI account?",
    a: "Yes. Your agents run on your own AI provider account, such as OpenAI or Anthropic, so usage is billed to you directly and stays under your control. We help you set it up on your call.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. If you can upload a file and type your website address, you can do your part. We handle the workflows, hosting and upkeep.",
  },
  {
    q: "What happens to my files and connections?",
    a: "They are scoped to your account and used only by your agents. Saved credentials are encrypted and never shown back to you in the browser.",
  },
  {
    q: "What does it cost?",
    a: "Founding pricing depends on which agents you start with, and we set it on your setup call. Your AI provider bills you directly for usage.",
  },
];

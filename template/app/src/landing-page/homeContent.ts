// Home page funnel content. Copy is a DRAFT for owner approval before deploy.
// Nothing here may claim metrics, customers, testimonials, prices or guarantees
// that do not exist (see DESIGN.md and the brand guardrails).

/**
 * Primary call to action: account creation. Do not label this link as a
 * booking flow until a real scheduler is connected and tested.
 */
export const BOOKING_URL = "/signup";
export const PRIMARY_CTA_LABEL = "Create your account";

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

/** Hero checklist (capability bullets). */
export const capabilities = [
  "Build a team of AI agents for the jobs you never get to",
  "Hand off follow-ups, scheduling, sorting and admin",
  "Connect your website, inbox, calendar and CRM",
  "Train every agent on your own files: price lists, FAQs, policies",
];

/** Tools agents are built to connect with. Intended integration targets; each is validated per client. */
export const connectTargets = [
  "Gmail",
  "Outlook",
  "Google Calendar",
  "Microsoft 365",
  "Your website",
  "Moxie CRM",
  "Google Drive",
  "SharePoint",
];

export const steps = [
  {
    metaphor: "Hire your team",
    title: "Manage your agents",
    body: "Turn on the agents you want, tell each one how your business works, and decide what needs your approval. One dashboard for every agent.",
  },
  {
    metaphor: "Give them a desk",
    title: "Connect your website",
    body: "Add your website so your agents know your services and pages, and can pick up the inquiries that come in through it.",
  },
  {
    metaphor: "Hand them the handbook",
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
    us: "Security-led setup with approval policies defined during onboarding",
  },
  {
    factor: "Time to results",
    diy: "Weeks of tinkering before anything runs",
    us: "A guided setup plan, scoped to your tools and workflows",
  },
  {
    factor: "Your effort",
    diy: "You build, host, patch and monitor it",
    us: "Define the approval rules and support model during onboarding.",
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
    item: "Configurable approval policies for outbound actions",
    replaces: "Hoping the AI gets it right",
  },
  {
    item: "Managed hosting and monitoring options reviewed during setup",
    replaces: "Servers, updates and 2 a.m. failures",
  },
  {
    item: "Runs on your own AI account, billed to you directly",
    replaces: "Marked-up usage fees",
  },
  {
    item: "Guided onboarding and an agreed support contact",
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
    a: "Approval requirements depend on your selected agent and configured workflow. Outbound messages, calendar changes and sensitive actions should remain in review mode until your permissions and policies are tested.",
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
    a: "We configure least-privilege access and account-specific connections during onboarding. Do not enter production API secrets until your secure credential vault and connection permissions are confirmed active.",
  },
  {
    q: "What does it cost?",
    a: "The managed AI agent offer is advertised at $17.99/month on AIWorkerAgency.com. Custom multi-agent deployments and additional services may have separate pricing, confirmed in writing before purchase. Third-party AI usage may be billed separately.",
  },
];

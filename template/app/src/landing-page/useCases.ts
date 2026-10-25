// Use cases, mirroring the 18-topic structure common to AI agent sites.
// Each one maps to agents that exist in agentCatalog.ts. Where the catalog has
// no dedicated agent, the work is delivered as a Custom AI Agent and the page
// says so. DRAFT copy for owner approval: no metrics, customers or guarantees.

export type UseCaseCategory = "revenue" | "customers" | "operations" | "industry";

export type UseCase = {
  slug: string;
  name: string; // short label for menus and cards
  title: string; // page headline
  category: UseCaseCategory;
  summary: string; // one line for cards
  pain: string;
  tasks: string[];
  agents: string[]; // agent catalog slugs, lead agent first
  approve: string;
  note?: string; // extra scoping note, used for regulated industries
};

export const useCaseCategories: { id: UseCaseCategory; label: string }[] = [
  { id: "revenue", label: "Grow revenue" },
  { id: "customers", label: "Keep customers" },
  { id: "operations", label: "Run operations" },
  { id: "industry", label: "By industry" },
];

const regulated =
  "We scope data handling and your compliance requirements before anything connects. Agents assist your staff; they do not make regulated decisions.";

export const useCases: UseCase[] = [
  {
    slug: "ai-agents-for-lead-generation",
    name: "Lead generation",
    title: "AI agents for lead generation",
    category: "revenue",
    summary: "Fill your pipeline with researched, qualified prospects every week.",
    pain: "Building lists, checking fit and writing first emails eats the hours your team should spend on sales calls.",
    tasks: [
      "Research prospects from approved sources that match your ideal customer",
      "Score each lead against your qualification rules",
      "Draft a personal first message for every qualified lead",
      "Log every lead and reply to your CRM",
    ],
    agents: ["ai-lead-generation", "sales-automation", "crm-manager"],
    approve: "Every outreach message before it is sent, with opt-outs honored automatically.",
  },
  {
    slug: "ai-agents-for-customer-service",
    name: "Customer service",
    title: "AI agents for customer service",
    category: "customers",
    summary: "Answer common questions fast and route the rest to the right person.",
    pain: "Customers wait while your team answers the same questions by hand, and urgent requests get buried.",
    tasks: [
      "Sort incoming requests by urgency and topic",
      "Draft answers from your knowledge files and past replies",
      "Escalate unusual or sensitive requests to a person",
      "Track open requests until they are resolved",
    ],
    agents: ["inbox-manager", "custom-ai-agents", "crm-manager"],
    approve: "Replies to customers until you decide which answer types can go out on their own.",
  },
  {
    slug: "ai-agents-for-customer-retention",
    name: "Customer retention",
    title: "AI agents for customer retention",
    category: "customers",
    summary: "Spot quiet customers early and give your team a reason to reach out.",
    pain: "Customers drift away without warning because nobody has time to watch for the signs.",
    tasks: [
      "Flag customers who have gone quiet or reduced activity",
      "Prepare a check-in message with context from their history",
      "Remind owners about renewals and follow-ups",
      "Record outcomes so you can see what keeps customers",
    ],
    agents: ["crm-manager", "sales-automation", "inbox-manager"],
    approve: "Every check-in message and any offer or discount.",
  },
  {
    slug: "ai-agents-for-marketing-automation",
    name: "Marketing automation",
    title: "AI agents for marketing automation",
    category: "revenue",
    summary: "Turn campaign busywork into drafts, segments and follow-ups ready for review.",
    pain: "Campaigns stall between ideas, copy, lists and follow-up because each step needs a person.",
    tasks: [
      "Draft campaign emails and posts in your voice",
      "Build send lists from your CRM segments",
      "Follow up with people who engaged",
      "Summarize what each campaign produced",
    ],
    agents: ["custom-ai-agents", "crm-manager", "sales-automation"],
    approve: "Every campaign and message before it publishes or sends.",
  },
  {
    slug: "ai-agents-for-data-analytics",
    name: "Data analytics",
    title: "AI agents for data analytics",
    category: "operations",
    summary: "Get a plain-English summary of your numbers without building reports.",
    pain: "Your data sits in different tools, and pulling a weekly picture together takes an afternoon.",
    tasks: [
      "Pull figures from the systems you approve",
      "Write a weekly summary of what changed and why it matters",
      "Flag numbers that move outside your normal range",
      "Answer follow-up questions with the source shown",
    ],
    agents: ["custom-ai-agents", "crm-manager"],
    approve: "Which systems the agent can read. It reports; it does not change your data.",
  },
  {
    slug: "ai-agents-for-sales-forecasting",
    name: "Sales forecasting",
    title: "AI agents for sales forecasting",
    category: "revenue",
    summary: "See where the quarter is heading from a pipeline that stays up to date.",
    pain: "Forecasts are guesses when deal stages and next steps are out of date.",
    tasks: [
      "Keep deal stages and next steps current",
      "Flag stalled deals and missing information",
      "Prepare a weekly pipeline summary for the owner",
      "Remind reps about the follow-ups that move deals",
    ],
    agents: ["crm-manager", "full-sales-teams", "custom-ai-agents"],
    approve: "Bulk record changes and any message to a prospect.",
  },
  {
    slug: "ai-agents-for-e-commerce",
    name: "E-commerce",
    title: "AI agents for e-commerce",
    category: "industry",
    summary: "Handle order questions, reviews and store chores around the clock.",
    pain: "Order questions, returns and reviews pile up faster than a small team can answer them.",
    tasks: [
      "Draft replies to order, shipping and return questions",
      "Watch new reviews and suggest responses",
      "Flag product issues that keep coming up",
      "Route refunds and exceptions to a person",
    ],
    agents: ["inbox-manager", "reputation-management-threat-intelligence", "custom-ai-agents"],
    approve: "Public review replies, refunds and any exception to your policy.",
  },
  {
    slug: "ai-agents-for-healthcare",
    name: "Healthcare",
    title: "AI agents for healthcare practices",
    category: "industry",
    summary: "Cut front-desk admin like scheduling, reminders and intake paperwork.",
    pain: "Front-desk staff spend their day on phone tag, reminders and forms instead of patients.",
    tasks: [
      "Coordinate appointment requests and reminders",
      "Sort the practice inbox and flag urgent messages",
      "Prepare intake checklists for staff",
      "Escalate anything clinical straight to a person",
    ],
    agents: ["calendar-manager", "inbox-manager", "custom-ai-agents"],
    approve: "Anything sent to a patient. Agents never give medical advice.",
    note: regulated,
  },
  {
    slug: "ai-agents-for-finance",
    name: "Finance",
    title: "AI agents for finance teams",
    category: "industry",
    summary: "Take document chasing and inbox sorting off your finance team.",
    pain: "Finance teams lose hours chasing documents, sorting requests and preparing routine summaries.",
    tasks: [
      "Sort finance inbox requests by type and deadline",
      "Chase missing documents with polite reminders",
      "Prepare routine summaries for review",
      "Keep client records complete in your CRM",
    ],
    agents: ["inbox-manager", "custom-ai-agents", "crm-manager"],
    approve: "Every client-facing message. Agents never move money or approve transactions.",
    note: regulated,
  },
  {
    slug: "ai-agents-for-hr-recruitment",
    name: "HR and recruitment",
    title: "AI agents for HR and recruitment",
    category: "operations",
    summary: "Run hiring and onboarding admin without losing the human decision.",
    pain: "Job intake, scheduling interviews, reading resumes and onboarding paperwork swamp small teams.",
    tasks: [
      "Organize job intake and candidate status",
      "Summarize resumes against your published role requirements",
      "Schedule interviews and collect feedback",
      "Prepare onboarding checklists for new hires",
    ],
    agents: ["ai-recruitment-ecosystem", "ai-resume-screening", "hr-services"],
    approve: "Every hiring decision. Agents never reject a candidate on their own.",
  },
  {
    slug: "ai-agents-for-content-personalization",
    name: "Content personalization",
    title: "AI agents for content personalization",
    category: "customers",
    summary: "Send messages that fit each customer instead of one blast for everyone.",
    pain: "Personal messages convert better, but writing them one by one is impossible at any volume.",
    tasks: [
      "Group contacts by what they bought or asked about",
      "Draft message versions for each group in your voice",
      "Pull the right details from your knowledge files",
      "Track which versions get replies",
    ],
    agents: ["custom-ai-agents", "crm-manager"],
    approve: "Every message version before it goes out.",
  },
  {
    slug: "ai-agents-for-fraud-detection",
    name: "Fraud detection",
    title: "AI agents for fraud and threat monitoring",
    category: "operations",
    summary: "Watch for suspicious signals and hand your team a clear triage queue.",
    pain: "Warning signs are spread across alerts, mentions and logs that nobody has time to correlate.",
    tasks: [
      "Collect signals from sources you authorize",
      "Group duplicate alerts and rank them by urgency",
      "Write analyst-friendly summaries of what happened",
      "Escalate the items that need action",
    ],
    agents: ["reputation-management-threat-intelligence", "custom-ai-agents"],
    approve: "Every finding before anyone acts on it, and all remediation.",
    note: regulated,
  },
  {
    slug: "ai-agents-for-supply-chain-management",
    name: "Supply chain",
    title: "AI agents for supply chain management",
    category: "operations",
    summary: "Keep supplier emails, deliveries and reorders from slipping.",
    pain: "Supplier updates, delivery dates and reorder reminders live in inboxes and get missed.",
    tasks: [
      "Track supplier emails and delivery updates",
      "Flag late or changed deliveries",
      "Prepare reorder reminders for review",
      "Schedule supplier calls and follow-ups",
    ],
    agents: ["custom-ai-agents", "inbox-manager", "calendar-manager"],
    approve: "Every purchase order and supplier commitment.",
  },
  {
    slug: "ai-agents-for-social-media-scheduling",
    name: "Social media",
    title: "AI agents for social media",
    category: "customers",
    summary: "Keep a steady posting schedule and never miss a comment that matters.",
    pain: "Posting consistently and watching comments is a daily job most owners don't have time for.",
    tasks: [
      "Draft posts from your updates and knowledge files",
      "Prepare a weekly posting schedule",
      "Watch comments and mentions for anything urgent",
      "Suggest replies in your voice",
    ],
    agents: ["custom-ai-agents", "reputation-management-threat-intelligence"],
    approve: "Every post and public reply before it publishes.",
  },
  {
    slug: "ai-agents-for-market-research",
    name: "Market research",
    title: "AI agents for market research",
    category: "revenue",
    summary: "Get a regular read on competitors, prospects and your market.",
    pain: "You know you should watch competitors and the market, but research never makes the to-do list.",
    tasks: [
      "Track competitor updates from public sources",
      "Research target accounts before sales calls",
      "Summarize trends worth acting on",
      "Deliver a short weekly briefing",
    ],
    agents: ["ai-lead-generation", "reputation-management-threat-intelligence", "custom-ai-agents"],
    approve: "Which sources the agents use. They research and report; they do not contact anyone.",
  },
  {
    slug: "ai-agents-for-seo-analysis",
    name: "SEO analysis",
    title: "AI agents for SEO analysis",
    category: "customers",
    summary: "Find what's holding your pages back and get fixes ready to review.",
    pain: "SEO advice is everywhere, but nobody has time to check your own pages and act on it.",
    tasks: [
      "Review your pages against your knowledge files and services",
      "Flag missing or outdated content",
      "Draft page updates and answers to common questions",
      "Report changes week over week",
    ],
    agents: ["custom-ai-agents", "reputation-management-threat-intelligence"],
    approve: "Every content change before it goes live on your site.",
  },
  {
    slug: "ai-agents-for-real-estate",
    name: "Real estate",
    title: "AI agents for real estate",
    category: "industry",
    summary: "Answer every inquiry quickly and keep showings and follow-ups on track.",
    pain: "Inquiries come in at all hours, and a slow reply hands the lead to another agent.",
    tasks: [
      "Pick up website and email inquiries as they arrive",
      "Qualify buyers and sellers with your questions",
      "Coordinate showings on your calendar",
      "Follow up after every showing",
    ],
    agents: ["ai-lead-generation", "calendar-manager", "crm-manager"],
    approve: "Messages to clients and every booking on your calendar.",
  },
  {
    slug: "ai-agents-for-customer-segmentation",
    name: "Customer segmentation",
    title: "AI agents for customer segmentation",
    category: "revenue",
    summary: "Turn a messy contact list into clear groups you can actually market to.",
    pain: "Your contact list is one big pile, so every message goes to everyone.",
    tasks: [
      "Clean and deduplicate contact records",
      "Group customers by behavior, purchases and fit",
      "Keep groups current as new data arrives",
      "Hand segments to your campaigns and sales follow-ups",
    ],
    agents: ["crm-manager", "custom-ai-agents"],
    approve: "Bulk record changes before they are applied.",
  },
];

export const useCaseHref = (slug: string) => `/use-cases/${slug}`;
export const useCasesBySlug = new Map(useCases.map((u) => [u.slug, u]));

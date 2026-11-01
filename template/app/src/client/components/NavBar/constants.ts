import { routes } from "wasp/client/router";
import { BlogUrl, DocsUrl } from "../../../shared/common";
import { agentHref, agents } from "../../../landing-page/agentCatalog";
import { BOOKING_URL, jobGroups } from "../../../landing-page/homeContent";
import { listedUseCases as useCases, useCaseCategories, useCaseHref } from "../../../landing-page/useCases";
import type { NavigationItem } from "./NavBar";

const agentName = (slug: string) =>
  (agents.find((a) => a.slug === slug)?.name ?? slug).replace(/ Agent$/, "");

export const marketingNavigationItems: NavigationItem[] = [
  {
    name: "Agents",
    to: "/#agents",
    mega: true,
    groups: jobGroups.map((g) => ({
      heading: g.label,
      links: g.slugs.map((slug) => ({ name: agentName(slug), to: agentHref(slug), avatar: slug })),
    })),
    footer: { name: "See all agents", to: "/#agents" },
  },
  {
    name: "Use Cases",
    to: "/use-cases",
    mega: true,
    groups: useCaseCategories
      .map((c) => ({
        heading: c.label,
        links: useCases
          .filter((u) => u.category === c.id)
          .map((u) => ({ name: u.name, to: useCaseHref(u.slug) })),
      }))
      .filter((g) => g.links.length > 0),
    footer: { name: "View all use cases", to: "/use-cases" },
  },
  {
    name: "Client Portal",
    to: "/portal",
    groups: [
      {
        links: [
          { name: "Control center", to: "/portal", description: "Manage agents, approvals and billing" },
          { name: "My connections", to: "/portal/credentials", description: "Connect the tools your agents use" },
          { name: "Log in", to: "/login" },
          { name: "Create an account", to: "/signup" },
        ],
      },
    ],
  },
  {
    name: "Solutions",
    to: "/#how-it-works",
    groups: [
      {
        links: [
          { name: "Front Office Bundle", to: "/front-office", description: "Leads, inbox and paperwork, handled together" },
          { name: "Done-for-you setup", to: "/#how-it-works", description: "Three steps, done with you" },
          { name: "Built on Microsoft 365 security", to: "/#security", description: "How every setup is protected" },
          { name: "Services", to: "/services", description: "Custom agents and team workshops" },
        ],
      },
    ],
  },
  {
    name: "AI Partner",
    to: "/#managed",
    groups: [
      {
        links: [
          { name: "How we manage your agents", to: "/#managed", description: "You're the boss, we're their manager" },
          { name: "Why AI Workforce", to: "/#why", description: "Compared with DIY AI tools" },
          { name: "Meet Wesley", to: "/#founder", description: "20 years in Microsoft 365 and security" },
        ],
      },
    ],
  },
  {
    name: "Company",
    to: "/#founder",
    groups: [
      {
        links: [
          { name: "About", to: "/#founder" },
          { name: "Book a setup call", to: BOOKING_URL },
          { name: "Cloud2Networks", to: "https://cloud2networks.com" },
        ],
      },
    ],
  },
  {
    name: "Resources",
    to: "/#faq",
    groups: [
      {
        links: [
          { name: "FAQ", to: "/#faq" },
          { name: "Use case library", to: "/use-cases" },
          { name: "Agent directory", to: "/#agents" },
          { name: "Blog", to: BlogUrl },
        ],
      },
    ],
  },
  { name: "Blog", to: BlogUrl },
];

export const demoNavigationitems: NavigationItem[] = [
  { name: "AI Scheduler", to: routes.DemoAppRoute.to },
  { name: "File Upload", to: routes.FileUploadRoute.to },
  { name: "Documentation", to: DocsUrl },
  { name: "Blog", to: BlogUrl },
];

import { type App } from "@wasp.sh/spec";

const SITE = "https://www.my2ndworkforce.com";
const TITLE = "AI Workforce | Managed AI agents for your business";
const DESCRIPTION =
  "AI agents that answer your leads, clear your inbox, book your meetings and screen candidates. Set up and managed for you, and you approve anything that leaves your business.";

export const head: App["head"] = [
  "<link rel='icon' href='/favicon.ico' sizes='any' />",
  "<link rel='icon' type='image/svg+xml' href='/favicon.svg' />",
  "<link rel='apple-touch-icon' href='/apple-touch-icon.png' />",
  "<meta name='theme-color' content='#1f35e8' />",

  `<meta name='description' content='${DESCRIPTION}' />`,
  "<meta name='author' content='AI Workforce' />",
  `<link rel='canonical' href='${SITE}/' />`,

  "<meta property='og:type' content='website' />",
  `<meta property='og:title' content='${TITLE}' />`,
  "<meta property='og:site_name' content='AI Workforce' />",
  `<meta property='og:url' content='${SITE}/' />`,
  `<meta property='og:description' content='${DESCRIPTION}' />`,
  `<meta property='og:image' content='${SITE}/og-image.png' />`,
  "<meta property='og:image:width' content='1200' />",
  "<meta property='og:image:height' content='630' />",
  `<meta name='twitter:card' content='summary_large_image' />`,
  `<meta name='twitter:title' content='${TITLE}' />`,
  `<meta name='twitter:description' content='${DESCRIPTION}' />`,
  `<meta name='twitter:image' content='${SITE}/og-image.png' />`,
  // Analytics: add the Plausible script here once a real Plausible site id exists, e.g.
  // "<script async data-domain='www.my2ndworkforce.com' src='https://plausible.io/js/script.js'></script>",
];

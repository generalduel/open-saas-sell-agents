// JSON-LD structured data for search engines and AI answers. See https://schema.org.
// Only facts that are true today: no prices, ratings or reviews.
const SITE = "https://www.my2ndworkforce.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "AI Workforce",
      url: `${SITE}/`,
      logo: `${SITE}/apple-touch-icon.png`,
      email: "support@my2ndworkforce.com",
      founder: { "@type": "Person", name: "Wesley Swann" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "AI Workforce",
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${SITE}/#service`,
      name: "Managed AI agents",
      serviceType: "Managed AI agent setup, hosting and monitoring",
      provider: { "@id": `${SITE}/#organization` },
      description:
        "AI agents that answer leads, sort inboxes, book meetings, keep CRM records clean and support hiring, with human approval on every outbound action.",
      image: `${SITE}/og-image.png`,
    },
  ],
};

export function SchemaMarkup() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: the schema contains only static strings.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

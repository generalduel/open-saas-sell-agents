import { app, page, route, action, query, api } from "@wasp.sh/spec";

import { App } from "./src/client/App" with { type: "ref" };
import { NotFoundPage } from "./src/client/components/NotFoundPage" with { type: "ref" };
import { serverEnvValidationSchema } from "./src/env" with { type: "ref" };
import { LandingPage } from "./src/landing-page/LandingPage" with { type: "ref" };
import { AgentDetailPage } from "./src/landing-page/AgentDetailPage" with { type: "ref" };
import { seedMockUsers } from "./src/server/scripts/dbSeeds" with { type: "ref" };

import { adminSpec } from "./src/admin/admin.wasp";
import { analyticsSpec } from "./src/analytics/analytics.wasp";
import { authConfig, authSpec } from "./src/auth/auth.wasp";
import { head } from "./src/client/head.wasp";
import { demoAiAppSpec } from "./src/demo-ai-app/demo-ai-app.wasp";
import { fileUploadSpec } from "./src/file-upload/file-upload.wasp";
import { paymentSpec } from "./src/payment/payment.wasp";
import { emailSender } from "./src/server/emailSender.wasp";
import { userSpec } from "./src/user/user.wasp";
import { PortalPage } from "./src/portal/PortalPage" with { type: "ref" };
import { AgentCredentialsPage } from "./src/portal/AgentCredentialsPage" with { type: "ref" };
import { getAgentCredentialWorkspace,provisionAgentCredential } from "./src/portal/agentCredentials" with { type: "ref" };
import { getPortalState,saveAgentConfig,saveCredential,decideReview,launchAgent } from "./src/portal/operations" with { type: "ref" };
import { portalReviewWebhook } from "./src/portal/webhook" with { type: "ref" };
import { beginGoogleSync,googleSyncCallback } from "./src/portal/googleOAuth" with { type: "ref" };

export default app({
  name: "OpenSaaS",
  wasp: { version: "^0.26.0" },
  title: "My Open SaaS App",
  head,
  auth: authConfig,
  db: {
    // Run `wasp db seed` to seed the database with the seed functions below:
    seeds: [
      // Populates the database with a bunch of fake users to work with during development.
      seedMockUsers,
    ],
  },
  client: {
    rootComponent: App,
  },
  server: {
    envValidationSchema: serverEnvValidationSchema,
  },
  emailSender,
  spec: [
    // Prerendering routes with static content creates HTML files at build time that are served immediately,
    // improving SEO, search engine/AI crawling, and performance: https://wasp.sh/docs/advanced/prerendering
    route("LandingPageRoute", "/", page(LandingPage), { prerender: true }),
    route("AgentDetailRoute", "/agents/:slug", page(AgentDetailPage)),
    route("AgentsRoute", "/agents", page(LandingPage)),
    route("NotFoundRoute", "*", page(NotFoundPage)),
    authSpec,
    userSpec,
    route("PortalRoute", "/portal", page(PortalPage, { authRequired: true })),
    route("AgentCredentialsRoute", "/portal/credentials", page(AgentCredentialsPage, { authRequired: true })),
    query(getAgentCredentialWorkspace,{entities:["CustomerAgentEntitlement","CustomerAgentCredential"]}),
    action(provisionAgentCredential,{entities:["CustomerAgentEntitlement","CustomerAgentCredential"]}),
    query(getPortalState,{entities:["User","PortalAgentConfig","PortalCredential","PortalGoogleConnection","PortalReview"]}),
    action(saveAgentConfig,{entities:["PortalAgentConfig"]}),
    action(saveCredential,{entities:["PortalCredential"]}),
    action(decideReview,{entities:["PortalReview"]}),
    action(launchAgent,{entities:["PortalAgentConfig"]}),
    api("POST","/portal/review-events",portalReviewWebhook,{entities:["PortalReview","PortalAgentConfig"]}),
    action(beginGoogleSync,{entities:["PortalGoogleOAuthState"]}),
    api("GET","/portal/google/callback",googleSyncCallback,{entities:["PortalGoogleOAuthState","PortalGoogleConnection"]}),
    demoAiAppSpec,
    paymentSpec,
    fileUploadSpec,
    analyticsSpec,
    adminSpec,
  ],
});

# AI Workforce client portal — architecture and deployment plan
## Status
Draft source code is committed; **not built, migrated, deployed, or connected to a production n8n environment**.
Existing Wasp email/Google account sign-in and existing payments are reused. This portal adds an authenticated `/portal` with billing, agent marketplace, integration hub and HITL desk.
## 1. Frontend implementation
1. Install repo dependencies and Wasp 0.26 locally; start PostgreSQL.
2. In `template/app`, run `wasp db migrate-dev` to create four new Prisma models (after reviewing generated migration).
3. Configure existing Wasp auth, billing, provider webhooks and account permissions. Do not expose account data via public endpoints.
4. Run Wasp client and server; verify email/Google login, subscription state, route /portal and cross-user isolation.
5. Configure the backend integration environment variables and n8n workflows, then test failure and replay cases.
6. Run TypeScript/build, responsive/keyboard and browser integration checks before merge.
## 2. Data and encryption
- `PortalAgentConfig`: per-user unique slug, JSON operating parameters, enabled flag.
- `PortalCredential`: provider, ciphertext, IV, GCM tag, key version; AES-256-GCM encrypted with PORTAL_ENCRYPTION_KEY in the Wasp server, never stored unencrypted.
- `PortalGoogleConnection`: account subject, granted scopes, encrypted refresh token with IV/tag and version; OAuth implementation and key rotation still pending.
- `PortalReview`: user-scoped workflow/execution ID, proposed action, state and review decision.
- Users and existing billing fields remain in their original tables.
- Production improvement: use envelope encryption with cloud KMS, versioned data keys, audit trails, tighter workspace RBAC, throttling and retention policies. DB backups and KMS policy must be access-controlled.
- IMPORTANT: No API key is ever returned to client APIs. Browser requests are TLS-only and secrets must not appear in logs.
## 3. Google Cloud setup checklist
- [ ] Create Google Cloud project, configure OAuth consent screen and authorized domain, privacy policy.
- [ ] Enable Google Drive API and Gmail API; choose Web application OAuth credentials.
- [ ] Configure the exact **server-side** redirect URI: https://YOUR_API_HOST/portal/google/callback
- [ ] Use authorization-code grant + PKCE and server-verified state; request offline access, validate issuer, audience, subject and granted scopes.
- [ ] Suggested minimum scopes: `https://www.googleapis.com/auth/drive.file` for files created/opened with the app; `https://www.googleapis.com/auth/gmail.send` for sending. Reading arbitrary mailbox messages requires broader scopes (for example `gmail.readonly`); request only necessary scopes after separate feature consent.
- [ ] Obtain Google verification for sensitive/restricted scopes as necessary. Restricted Gmail data stored/transmitted on servers may require independent security assessment.
- [ ] In callback exchange code on server, encrypt refresh token, store subject and scopes, never return Google tokens to browser.
- [ ] Implement refresh/revoke/disconnect logic and error recovery before enabling Sync button. **The current Sync Google Account button is deliberately disabled** until this code and credentials exist.
- [ ] Do not confuse Wasp Google **sign-in** with Google Drive/Gmail **authorization**; these are distinct OAuth grants and scopes.
Google references: https://developers.google.com/identity/protocols/oauth2/web-server ; https://developers.google.com/workspace/gmail/api/auth/scopes ; https://developers.google.com/workspace/drive/api/guides/api-specific-auth
## 4. n8n integration
Portal browser → authenticated Wasp actions → n8n signed webhook. Wasp sends only userId, agent slug, configId, eventId, timestamp (NO RAW CREDENTIALS). Configure `N8N_AGENT_WEBHOOK_URL` and `N8N_WEBHOOK_SHARED_SECRET`.
- n8n must validate `x-portal-signature` HMAC-SHA256 against **exact raw HTTP body** using the shared secret, enforce timestamp freshness/replay protection and user/tenant isolation. The portal currently signs the JSON body it transmits; n8n must verify before processing.
- Agent workflow loads approved configuration and credential via a secure server-to-server broker (TO IMPLEMENT). Never inject another customer's keys or make a global all-tenant n8n credential.
- Preferred production architecture: n8n fetches scoped short-lived access through a Wasp credential broker authenticated by mTLS/service identity; broker can proxy vendor API calls or provision scoped n8n credentials using supported n8n APIs. Avoid shipping refresh tokens to n8n when proxy calls are sufficient.
- If direct n8n token storage is required, use n8n's encrypted credential store with its stable `N8N_ENCRYPTION_KEY`, per-tenant isolation, restricted instance access and credential lifecycle controls. n8n does not automatically encrypt arbitrary webhook JSON stored in execution logs.
- n8n review step POSTs a signed JSON body to `/portal/review-events` with eventId, userId, workflowId, executionId, title, summary and proposedAction. **Webhook signing/JSON canonicalization must be aligned and tested; configure body-parser raw bytes for production**.
- User clicks Approve/Reject → authenticated `decideReview` action → `N8N_DECISION_WEBHOOK_URL` signed message. Workflow must correlate decisionId and executionId, check authorization/expiry and safely resume or terminate. Use n8n Wait/resume flow or state machine; do not expose public unauthenticated resume URLs.
- End-to-end guarantees, retries and durable outbox remain pending; production must handle webhook timeout without double-processing.
## 5. Required server environment
```sh
PORTAL_ENCRYPTION_KEY=<32 random bytes base64; KMS-managed in production>
N8N_WEBHOOK_SHARED_SECRET=<32+ random bytes; separate from encryption key>
N8N_AGENT_WEBHOOK_URL=https://YOUR_N8N_HOST/webhook/agent-launch
N8N_DECISION_WEBHOOK_URL=https://YOUR_N8N_HOST/webhook/review-decision
```
Never commit secrets. Configure them through the actual hosting provider's secret manager.
## 6. Security and release gates
- Verify tenant-scoped credential access, rejected invalid agent parameters and entitlement enforcement; server-side entitlement checks are **not implemented yet**.
- Verify subscription tier maps to specific agent permissions before enabling billing-based gating.
- Add CSRF/session checks, rate limiting, webhook replay prevention, audit trails, idempotency and data retention.
- Test the Google OAuth code exchange, token refresh, revoke/disconnect and least-privilege scopes.
- Test HITL acknowledgement / double approval / expiry and n8n signatures. Avoid execution data containing PII or secret material.
- Production remains blocked until tests, production credentials, n8n workflows and hosting are configured.

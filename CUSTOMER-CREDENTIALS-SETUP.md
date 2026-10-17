# Customer Agent Credential Provisioning
Branch implementation includes the authenticated user-menu route `/portal/credentials`, selectable approved services, server-side n8n credential API, user-entitlement-to-project mapping and masked connection fields.
## Mandatory setup
1. Create a dedicated n8n project for each customer/tenant and provision the purchased agent workflow inside that project.
2. Insert a `CustomerAgentEntitlement` record after a verified completed purchase: userId, agentSlug, n8nProjectId, active=true. This is intentionally **not** automatically inferred from subscriptionPlan. Add a verified payment webhook fulfillment job and admin assignment workflow before launch.
3. Configure `N8N_BASE_URL` (HTTPS only), `N8N_API_KEY` (server only), and `PORTAL_ENCRYPTION_KEY` (base64 32 bytes). Test n8n API permissions: credential:create, credential:update, credential:move and project access as applicable.
4. Run `wasp db migrate-dev`, compile and test Wasp in staging. Validate actual n8n credential schemas against `GET /api/v1/credentials/schema/{credentialType}`. Credential definitions in `agentCredentials.ts` are starting templates, not guaranteed mappings for your installed n8n version (especially Omni, ActiveCampaign, AMQP).
5. **Critical:** creating a credential in a project does NOT automatically attach it to a workflow node. A separate agent provisioning worker must bind the newly returned credential ID into a customer-specific cloned workflow's node definitions, via workflow API/update and security checks; do not attach credentials to a shared cross-tenant workflow.
6. Ensure all service workflows run in the same project and never dynamically load another tenant's credential. Implement safe rotation/deletion and a reconciliation job for partial failures, including created-but-not-transferred credentials.
7. Audit and rate-limit credential changes. Implement KMS envelope encryption and a rotating data-key policy for production. Do not log secret payloads.
8. Add e2e tests for signed-in vs logged-out, tenant entitlement, per-project transfer, credential schema, form masking, backend persistence, update/rotation, purchase revocation and workflow binding.
## Notes
UI replicates **interaction patterns** from n8n screenshots rather than copying protected n8n source code or brand assets. The n8n API key never reaches client JS. Only entitlements assigned by trusted server-side admin provisioning are returned.
Status: staging draft; not built/tested/migrated/deployed or connected to a live n8n instance.

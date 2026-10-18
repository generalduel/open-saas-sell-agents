# AI Workforce launch acceptance checks — staging required

## Implemented in this change
- After successful authentication, route to `/portal` rather than the Open SaaS demo.
- Portal onboarding includes account, assigned-agent, connection and review steps.
- Portal reads active `CustomerAgentEntitlement` and saved connection statuses without exposing credentials.
- Checkout return clearly distinguishes redirect from confirmed payment.
- Past-due, cancellation-at-period-end and deleted subscription statuses display customer guidance.
- Added `/support`, `/privacy`, `/terms` and footer navigation, with explicit unapproved legal content notices.
- Updated key branding and public navigation links.

## Must pass in staging before any public launch
1. Run `wasp db migrate-dev` in a disposable dev database and `wasp build` with configured Wasp 0.26.0; run TypeScript lint/tests.
2. Sign up using email and Google separately. Confirm each flow reaches portal, email verification/password reset functions and only the owning user can see assignments.
3. Test no-entitlement, one-entitlement, and multiple-entitlement accounts; test a second customer cannot see the first customer's assignments or connections.
4. In **payment processor test mode**, test Hobby/Pro checkout success and cancel. Validate signed provider webhook signatures and database subscription states; returning with `?status=success` alone must not activate anything.
5. Simulate a declined renewal: confirm webhook transitions to `past_due` and customer portal alert. Test cancel-at-period-end, immediate cancellation and reactivation state changes.
6. Verify provider-generated receipts and invoices are delivered, billing portal access works, and any customer email sender uses a validated domain and real `from` address. **No receipt email implementation is asserted by this pull request.**
7. Verify support/legal routes, hyperlinks and mobile layouts at 320, 375, 768 and 1440 CSS pixels using a browser.
8. Configure legal entity/contact information, approved privacy notice and terms; remove draft banners only after legal approval.
9. Replace starter payment plan descriptions and prices with approved offers; ensure agent-specific fulfillment is enforced server-side.
10. Security-test login throttling, purchased-agent authorization, cross-tenant isolation, credential secrecy, WAF and security monitoring.

## Blocking dependencies
- A working development or staging deployment, Postgres database, provider sandbox credentials and domain/email sender.
- Approved commercial offer/pricing, support contact and reviewed legal documents.
- Automated payment-to-agent entitlement fulfillment and endpoint authorization (separate launch-critical work).
- n8n agent execution and connector setup (separate task).

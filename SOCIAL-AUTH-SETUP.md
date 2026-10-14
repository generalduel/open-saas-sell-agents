# Social sign-in setup — not yet live
## Google
Implemented on draft branch using Wasp's native Google OAuth provider and googleSignInUrl.
1. Create OAuth Web application in Google Cloud Console.
2. Local redirect URI: http://localhost:3001/auth/google/callback
3. Production redirect: https://YOUR-API-HOST/auth/google/callback (not frontend hostname unless same host).
4. Supply GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as **server-side environment variables**. Never commit secrets.
5. Confirm consent screen, appropriate scopes and production domain verification; test login and logout before merge.
## Amazon
Login with Amazon is NOT a built-in Wasp auth method. UI shows clearly labeled Coming soon, without a deceptive nonfunctional auth button.
To add securely, select and implement an OIDC/OAuth broker or a custom verified authentication integration. AWS Cognito supports Login with Amazon as a federated identity provider; bridge its validated tokens to Wasp sessions with a supported, security-reviewed design. Do not treat an OAuth access token as a Wasp session or automatically merge accounts by email. Confirm client ID, client secret, consent/privacy URLs, identity linking, CSRF/state and PKCE requirements with provider.
## Validation
No build, OAuth configuration, cloud tenant changes, production deployment or end-to-end sign-in verification has been completed.
Sources:
https://wasp.sh/docs/auth/social-auth/google
https://wasp.sh/docs/auth/social-auth/overview
https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-social-idp-lwa.html

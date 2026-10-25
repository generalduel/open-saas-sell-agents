import { LoginForm } from "wasp/client/auth";
import { Link as WaspRouterLink, routes } from "wasp/client/router";
import { AuthPageLayout } from "./AuthPageLayout";
import { useRedirectIfLoggedIn } from "./hooks/useRedirectIfLoggedIn";
import { usePageTitle } from "../client/hooks/usePageTitle";

export function LoginPage() {
  useRedirectIfLoggedIn();
  usePageTitle("Sign in");

  return (
    <AuthPageLayout
      title="Welcome back to your AI workforce."
      intro="Sign in to manage your agents, connect your tools and review anything waiting for your approval."
    >
      <LoginForm />
      <div className="mt-6 space-y-3 text-sm text-[var(--wf-steel)]">
        <p>
          New to AI Workforce?{" "}
          <WaspRouterLink to={routes.SignupRoute.to} className="font-semibold text-[var(--wf-cobalt)] underline underline-offset-4">
            Create an account
          </WaspRouterLink>
        </p>
        <p>
          Forgot your password?{" "}
          <WaspRouterLink to={routes.RequestPasswordResetRoute.to} className="font-semibold text-[var(--wf-cobalt)] underline underline-offset-4">
            Reset it
          </WaspRouterLink>
        </p>
      </div>
    </AuthPageLayout>
  );
}

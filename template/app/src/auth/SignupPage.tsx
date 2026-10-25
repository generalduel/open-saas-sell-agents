import { SignupForm } from "wasp/client/auth";
import { Link as WaspRouterLink, routes } from "wasp/client/router";
import { AuthPageLayout } from "./AuthPageLayout";
import { useRedirectIfLoggedIn } from "./hooks/useRedirectIfLoggedIn";
import { usePageTitle } from "../client/hooks/usePageTitle";

export function SignupPage() {
  useRedirectIfLoggedIn();
  usePageTitle("Create your account");

  return (
    <AuthPageLayout
      title="Set up your AI workforce account."
      intro="Create your account to choose your agents, connect your website and add your knowledge files."
    >
      <SignupForm />
      <p className="mt-6 text-sm text-[var(--wf-steel)]">
        Already have an account?{" "}
        <WaspRouterLink to={routes.LoginRoute.to} className="font-semibold text-[var(--wf-cobalt)] underline underline-offset-4">
          Sign in
        </WaspRouterLink>
      </p>
    </AuthPageLayout>
  );
}

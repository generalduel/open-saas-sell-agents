import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "wasp/client/auth";
import {
  generateCheckoutSession,
  getCustomerPortalUrl,
  useQuery,
} from "wasp/client/operations";
import { routes } from "wasp/client/router";
import { Alert, AlertDescription } from "../client/components/ui/alert";
import { cn } from "../client/utils";
import "../landing-page/landing.css";
import { usePageTitle } from "../client/hooks/usePageTitle";
import {
  PaymentPlanId,
  paymentPlans,
  prettyPaymentPlanName,
  SubscriptionStatus,
} from "./plans";

const bestDealPaymentPlanId: PaymentPlanId = PaymentPlanId.Pro;

interface PaymentPlanCard {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export const paymentPlanCards: Record<PaymentPlanId, PaymentPlanCard> = {
  [PaymentPlanId.Hobby]: {
    name: prettyPaymentPlanName(PaymentPlanId.Hobby),
    price: "$9.99",
    description: "All you need to get started",
    features: ["Limited monthly usage", "Basic support"],
  },
  [PaymentPlanId.Pro]: {
    name: prettyPaymentPlanName(PaymentPlanId.Pro),
    price: "$19.99",
    description: "Our most popular plan",
    features: ["Unlimited monthly usage", "Priority customer support"],
  },
  [PaymentPlanId.Credits10]: {
    name: prettyPaymentPlanName(PaymentPlanId.Credits10),
    price: "$9.99",
    description: "One-time purchase of 10 credits for your account",
    features: ["Use credits for e.g. OpenAI API calls", "No expiration date"],
  },
};

export function PricingPage() {
  usePageTitle("Plans and pricing");
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: user } = useAuth();
  const isUserSubscribed =
    !!user &&
    !!user.subscriptionStatus &&
    user.subscriptionStatus !== SubscriptionStatus.Deleted;

  const {
    data: customerPortalUrl,
    isLoading: isCustomerPortalUrlLoading,
    error: customerPortalUrlError,
  } = useQuery(getCustomerPortalUrl, { enabled: isUserSubscribed });

  const navigate = useNavigate();

  async function handleBuyNowClick(paymentPlanId: PaymentPlanId) {
    if (!user) {
      navigate(routes.LoginRoute.to);
      return;
    }
    try {
      setIsPaymentLoading(true);

      const checkoutSession = await generateCheckoutSession(paymentPlanId);

      if (checkoutSession?.sessionUrl) {
        window.open(checkoutSession.sessionUrl, "_self");
      } else {
        throw new Error("Error generating checkout session URL");
      }
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Error processing payment. Please try again later.");
      }
      setIsPaymentLoading(false); // We only set this to false here and not in the try block because we redirect to the checkout url within the same window
    }
  }

  const handleCustomerPortalClick = () => {
    if (!user) {
      navigate(routes.LoginRoute.to);
      return;
    }

    if (customerPortalUrlError) {
      setErrorMessage("Error fetching Customer Portal URL");
      return;
    }

    if (!customerPortalUrl) {
      setErrorMessage(`Customer Portal does not exist for user ${user.id}`);
      return;
    }

    window.open(customerPortalUrl, "_blank");
  };

  return (
    <div className="wf min-h-screen">
      <section className="bg-[var(--wf-cobalt)] text-white">
        <div id="pricing" className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 md:pb-20 md:pt-20">
          <h1 className="wf-display max-w-4xl text-[clamp(2.6rem,6vw,5rem)]">Plans and pricing</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            Start with a clear workflow, connect approved tools and stay in control.
            Plan features reflect the currently configured billing products, not a
            guarantee that any specific agent is included.
          </p>
        </div>
      </section>
      <div className="wf-paper-section mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        {errorMessage && (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <div className="grid gap-6 lg:grid-cols-3">
          {Object.values(PaymentPlanId).map((planId) => {
            const best = planId === bestDealPaymentPlanId;
            return (
              <article
                key={planId}
                className={cn(
                  "flex flex-col rounded-[24px] border-2 bg-white p-8 text-[var(--wf-ink)]",
                  best ? "border-[var(--wf-cobalt)]" : "border-[var(--wf-line)]",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 id={planId} className="wf-wide text-xl">
                    {paymentPlanCards[planId].name}
                  </h2>
                  {best && (
                    <span className="rounded-full bg-[var(--wf-yellow)] px-3 py-1 text-xs font-semibold">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-3 text-[var(--wf-steel)]">{paymentPlanCards[planId].description}</p>
                <p className="mt-6 flex items-baseline gap-1">
                  <span className="wf-display text-5xl">{paymentPlanCards[planId].price}</span>
                  <span className="text-sm font-semibold text-[var(--wf-steel)]">
                    {paymentPlans[planId].effect.kind === "subscription" && "/month"}
                  </span>
                </p>
                <ul role="list" className="mt-8 flex-1 space-y-3 text-[15px]">
                  {paymentPlanCards[planId].features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-[var(--wf-cobalt)]" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {isUserSubscribed ? (
                    <button
                      type="button"
                      onClick={handleCustomerPortalClick}
                      disabled={isCustomerPortalUrlLoading}
                      aria-describedby="manage-subscription"
                      className="wf-wide w-full rounded-full bg-[var(--wf-ink)] px-6 py-3.5 text-white transition-colors hover:bg-[var(--wf-cobalt)] disabled:opacity-50"
                    >
                      Manage subscription
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleBuyNowClick(planId)}
                      aria-describedby={planId}
                      disabled={isPaymentLoading}
                      className={cn(
                        "wf-wide w-full rounded-full px-6 py-3.5 transition-colors disabled:opacity-50",
                        best
                          ? "bg-[var(--wf-cobalt)] text-white hover:bg-[var(--wf-ink)]"
                          : "border-2 border-[var(--wf-ink)] hover:bg-[var(--wf-ink)] hover:text-white",
                      )}
                    >
                      {user ? "Buy plan" : "Log in to buy plan"}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

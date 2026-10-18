import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Link, routes } from "wasp/client/router";

const ACCOUNT_PAGE_REDIRECT_DELAY_MS = 4000;

export enum CheckoutResult {
  Success = "success",
  Canceled = "canceled",
}

export function CheckoutResultPage() {
  const navigate = useNavigate();
  const [urlSearchParams] = useSearchParams();
  const status = urlSearchParams.get("status");

  useEffect(() => {
    const accountPageRedirectTimeoutId = setTimeout(() => {
      navigate("/portal");
    }, ACCOUNT_PAGE_REDIRECT_DELAY_MS);

    return () => {
      clearTimeout(accountPageRedirectTimeoutId);
    };
  }, [navigate]);

  if (
    status === null ||
    (status !== CheckoutResult.Success && status !== CheckoutResult.Canceled)
  ) {
    return <Link to="/portal">Return to your workspace</Link>;
  }

  return (
    <div className="mt-10 flex flex-col items-stretch sm:mx-6 sm:items-center">
      <div className="flex flex-col gap-4 px-4 py-8 text-center shadow-xl ring-1 ring-gray-900/10 sm:max-w-md sm:rounded-lg sm:px-10 dark:ring-gray-100/10">
        <h1 className="text-xl font-semibold">
          {status === CheckoutResult.Success && "Checkout completed — verification in progress"}
          {status === CheckoutResult.Canceled && "Checkout canceled."}
        </h1>
        <span className="">
          Your agent access is assigned only after payment confirmation. You will be redirected to your workspace in{" "}
          {ACCOUNT_PAGE_REDIRECT_DELAY_MS / 1000} seconds...
        </span>
      </div>
    </div>
  );
}

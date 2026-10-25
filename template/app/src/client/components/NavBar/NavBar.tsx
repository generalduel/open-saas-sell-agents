import { ChevronDown, LogIn, Menu } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState, type ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";
import { useAuth } from "wasp/client/auth";
import { Link as WaspRouterLink, routes } from "wasp/client/router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../client/components/ui/sheet";
import { throttleWithTrailingInvocation } from "../../../shared/utils";
import { UserDropdown } from "../../../user/UserDropdown";
import { UserMenuItems } from "../../../user/UserMenuItems";
import logo from "../../static/logo.svg";
import { cn } from "../../utils";
import { DarkModeSwitcher } from "../DarkModeSwitcher";
import { AgentAvatar } from "../../../landing-page/agentPeople";

export interface NavigationLink {
  name: string;
  to: string;
  description?: string;
  /** Agent catalog slug: shows that agent's portrait next to the link. */
  avatar?: string;
}

export interface NavigationItem {
  name: string;
  to: string;
  /** Submenu groups. Items without groups render as plain links. */
  groups?: { heading?: string; links: NavigationLink[] }[];
  /** Wide multi-column panel centered under the nav bar. */
  mega?: boolean;
  footer?: NavigationLink;
}

export function NavBar({
  navigationItems,
}: {
  navigationItems: NavigationItem[];
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const throttledHandler = throttleWithTrailingInvocation(() => {
      setIsScrolled(window.scrollY > 0);
    }, 50);

    window.addEventListener("scroll", throttledHandler);

    return () => {
      window.removeEventListener("scroll", throttledHandler);
      throttledHandler.cancel();
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled && "top-4",
        )}
      >
        <div
          className={cn("transition-all duration-300", {
            "bg-background/90 border-border mx-4 rounded-full border pr-2 shadow-lg backdrop-blur-lg md:mx-20 lg:pr-0":
              isScrolled,
            "bg-background/80 border-border mx-0 border-b backdrop-blur-lg":
              !isScrolled,
          })}
        >
          <nav
            className={cn(
              "relative flex items-center justify-between transition-all duration-300",
              {
                "p-3 lg:px-6": isScrolled,
                "p-6 lg:px-8": !isScrolled,
              },
            )}
            aria-label="Global"
          >
            <div className="flex items-center gap-6">
              <WaspRouterLink
                to={routes.LandingPageRoute.to}
                className="text-foreground hover:text-primary flex items-center transition-colors duration-300 ease-in-out"
              >
                <NavLogo isScrolled={isScrolled} />
                <span
                  className={cn(
                    "text-foreground font-semibold leading-6 transition-all duration-300",
                    {
                      "ml-2 text-sm": !isScrolled,
                      "ml-2 text-xs": isScrolled,
                    },
                  )}
                >
                  AI Workforce
                </span>
              </WaspRouterLink>

              <ul className="ml-4 hidden items-center gap-4 lg:flex xl:gap-6">
                {renderNavigationItems(navigationItems)}
              </ul>
            </div>
            <NavBarMobileMenu
              isScrolled={isScrolled}
              navigationItems={navigationItems}
            />
            <NavBarDesktopUserDropdown isScrolled={isScrolled} />
          </nav>
        </div>
      </header>
    </>
  );
}

function NavBarDesktopUserDropdown({ isScrolled }: { isScrolled: boolean }) {
  const { data: user, isLoading: isUserLoading } = useAuth();

  return (
    <div className="hidden items-center justify-end gap-3 lg:flex lg:flex-1">
      <ul className="flex items-center justify-center gap-2 sm:gap-4">
        <DarkModeSwitcher />
      </ul>
      {isUserLoading ? null : !user ? (
        <WaspRouterLink
          to={routes.LoginRoute.to}
          className={cn(
            "ml-3 font-semibold leading-6 transition-all duration-300",
            {
              "text-sm": !isScrolled,
              "text-xs": isScrolled,
            },
          )}
        >
          <div className="text-foreground hover:text-primary flex items-center transition-colors duration-300 ease-in-out">
            Log in{" "}
            <LogIn
              size={isScrolled ? "1rem" : "1.1rem"}
              className={cn("transition-all duration-300", {
                "ml-1 mt-[0.1rem]": !isScrolled,
                "ml-1": isScrolled,
              })}
            />
          </div>
        </WaspRouterLink>
      ) : (
        <div className="ml-3">
          <UserDropdown user={user} />
        </div>
      )}
    </div>
  );
}

function NavBarMobileMenu({
  isScrolled,
  navigationItems,
}: {
  isScrolled: boolean;
  navigationItems: NavigationItem[];
}) {
  const { data: user, isLoading: isUserLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex lg:hidden">
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className={cn(
              "text-muted-foreground hover:text-muted hover:bg-accent inline-flex items-center justify-center rounded-md transition-colors",
            )}
          >
            <span className="sr-only">Open main menu</span>
            <Menu
              className={cn("transition-all duration-300", {
                "size-8 p-1": !isScrolled,
                "size-6 p-0.5": isScrolled,
              })}
              aria-hidden="true"
            />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] overflow-y-auto sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <WaspRouterLink to={routes.LandingPageRoute.to}>
                <span className="sr-only">AI Workforce</span>
                <NavLogo isScrolled={false} />
              </WaspRouterLink>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 flow-root">
            <div className="divide-border -my-6 divide-y">
              <ul className="space-y-2 py-6">
                {renderNavigationItems(navigationItems, setMobileMenuOpen)}
              </ul>
              <div className="py-6">
                {isUserLoading ? null : !user ? (
                  <WaspRouterLink to={routes.LoginRoute.to}>
                    <div className="text-foreground hover:text-primary flex items-center justify-end transition-colors duration-300 ease-in-out">
                      Sign in <LogIn size="1.1rem" className="ml-1" />
                    </div>
                  </WaspRouterLink>
                ) : (
                  <ul className="space-y-2">
                    <UserMenuItems
                      user={user}
                      onItemClick={() => setMobileMenuOpen(false)}
                    />
                  </ul>
                )}
              </div>
              <div className="py-6">
                <DarkModeSwitcher />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function NavItemLink({
  to,
  className,
  onClick,
  children,
}: {
  to: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (to.startsWith("http")) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <ReactRouterLink to={to} className={className} onClick={onClick}>
      {children}
    </ReactRouterLink>
  );
}

function renderNavigationItems(
  navigationItems: NavigationItem[],
  setMobileMenuOpen?: Dispatch<SetStateAction<boolean>>,
) {
  const isMobile = !!setMobileMenuOpen;
  const close = setMobileMenuOpen && (() => setMobileMenuOpen(false));
  const menuStyles = cn({
    "block rounded-lg px-3 py-2 text-sm font-medium leading-7 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors":
      isMobile,
    "text-sm font-normal leading-6 text-foreground duration-300 ease-in-out hover:text-primary transition-colors":
      !isMobile,
  });

  return navigationItems.map((item) => {
    if (!item.groups) {
      return (
        <li key={item.name}>
          <NavItemLink to={item.to} className={menuStyles} onClick={close}>
            {item.name}
          </NavItemLink>
        </li>
      );
    }

    if (isMobile) {
      return (
        <li key={item.name}>
          <details className="group">
            <summary className={cn(menuStyles, "flex cursor-pointer list-none items-center justify-between")}>
              {item.name}
              <ChevronDown size={16} className="transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="mb-2 ml-3 border-l border-border pl-3">
              {item.groups.map((g, gi) => (
                <div key={g.heading ?? gi} className="py-1">
                  {g.heading && <p className="px-2 pt-2 text-xs font-semibold text-muted-foreground">{g.heading}</p>}
                  <ul>
                    {g.links.map((l) => (
                      <li key={l.name + l.to}>
                        <NavItemLink
                          to={l.to}
                          onClick={close}
                          className="block rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent"
                        >
                          {l.name}
                        </NavItemLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {item.footer && (
                <NavItemLink to={item.footer.to} onClick={close} className="block px-2 py-2 text-sm font-semibold text-primary">
                  {item.footer.name}
                </NavItemLink>
              )}
            </div>
          </details>
        </li>
      );
    }

    return (
      <li key={item.name} className={cn("group/nav", !item.mega && "relative")}>
        <NavItemLink to={item.to} className={cn(menuStyles, "inline-flex items-center gap-1")}>
          {item.name}
          <ChevronDown
            size={14}
            className="transition-transform duration-200 group-hover/nav:rotate-180 group-focus-within/nav:rotate-180"
            aria-hidden="true"
          />
        </NavItemLink>
        <div
          className={cn(
            "invisible absolute top-full z-50 pt-3 opacity-0 transition-opacity duration-150 group-focus-within/nav:visible group-focus-within/nav:opacity-100 group-hover/nav:visible group-hover/nav:opacity-100",
            item.mega ? "left-1/2 w-[min(60rem,calc(100vw-2rem))] -translate-x-1/2" : "-left-4 w-72",
          )}
        >
          <div className="border-border bg-background text-foreground rounded-2xl border p-5 shadow-xl">
            <div className={cn("grid gap-6", item.mega && "grid-cols-4")}>
              {item.groups.map((g, gi) => (
                <div key={g.heading ?? gi}>
                  {g.heading && <p className="text-muted-foreground mb-2 px-2 text-xs font-semibold">{g.heading}</p>}
                  <ul className="space-y-0.5">
                    {g.links.map((l) => (
                      <li key={l.name + l.to}>
                        <NavItemLink
                          to={l.to}
                          className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors"
                        >
                          {l.avatar && <AgentAvatar slug={l.avatar} size={30} decorative badge={false} />}
                          <span className="min-w-0">
                            <span className="block font-medium leading-snug">{l.name}</span>
                            {l.description && (
                              <span className="text-muted-foreground block text-xs leading-snug">{l.description}</span>
                            )}
                          </span>
                        </NavItemLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {item.footer && (
              <div className="border-border mt-4 border-t pt-3">
                <NavItemLink to={item.footer.to} className="text-primary px-2 text-sm font-semibold hover:underline">
                  {item.footer.name}
                </NavItemLink>
              </div>
            )}
          </div>
        </div>
      </li>
    );
  });
}

function NavLogo({ isScrolled }: { isScrolled: boolean }) {
  return (
    <img
      className={cn("rounded-md transition-all duration-500", {
        "size-8": !isScrolled,
        "size-7": isScrolled,
      })}
      src={logo}
      alt="AI Workforce"
    />
  );
}

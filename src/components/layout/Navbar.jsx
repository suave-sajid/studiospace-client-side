
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Aperture,
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarDays,
  ClipboardList,
  Heart,
  ChevronDown,
  LogOut,
  UserRound,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/about" },
];

const workspaceLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Add New Studio",
    href: "/add-studio",
    icon: PlusCircle,
  },
  {
    label: "My Studio Listings",
    href: "/my-listings",
    icon: Building2,
  },
  {
    label: "My Bookings",
    href: "/my-bookings",
    icon: CalendarDays,
  },
  {
    label: "Booking Requests",
    href: "/received-bookings",
    icon: ClipboardList,
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isLoggedIn = Boolean(session?.user);

  const user = session?.user;

  const userName = user?.name || "My Account";
  const userEmail = user?.email || "";
  const userImage = user?.image;

  // Generate initials for avatar fallback
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  // Close menus whenever route changes
  useEffect(() => {
    setIsMobileOpen(false);
    setIsWorkspaceOpen(false);
  }, [pathname]);

  // Active route indicator
  const isActive = (href) => {
    // Hash links are section navigation, not page routes
    if (href.includes("#")) return false;

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenus = () => {
    setIsMobileOpen(false);
    setIsWorkspaceOpen(false);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "Logout failed.");
      }

      closeMenus();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getLinkClass = (href) => {
    return `relative whitespace-nowrap text-sm font-medium transition ${
      isActive(href)
        ? "text-brand"
        : "text-muted hover:text-ink"
    }`;
  };

  const Avatar = ({ size = "normal" }) => {
    const sizeClass =
      size === "small"
        ? "size-8 text-xs"
        : "size-10 text-sm";

    return (
      <div
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-sage font-bold text-ink ${sizeClass}`}
      >
        {userImage ? (
          <img
            src={userImage}
            alt={`${userName} profile`}
            className="h-full w-full object-cover"
          />
        ) : (
          initials || <UserRound size={18} />
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center gap-2.5"
        >
          <Aperture
            size={29}
            strokeWidth={2.2}
            className="text-brand"
          />

          <span className="text-lg font-bold tracking-tight text-ink sm:text-xl">
            Studio<span className="text-brand">Space.</span>
          </span>
        </Link>

        {/* Desktop Public Navigation */}
        <div className="hidden items-center gap-4 xl:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={getLinkClass(link.href)}
            >
              {link.label}

              {isActive(link.href) && (
                <span className="absolute -bottom-[27px] left-0 h-0.5 w-full rounded-full bg-brand" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Account Actions */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-border" />
          ) : isLoggedIn ? (
            <div
              className="relative"
              onMouseEnter={() => setIsWorkspaceOpen(true)}
              onMouseLeave={() => setIsWorkspaceOpen(false)}
            >
              <button
                type="button"
                onClick={() =>
                  setIsWorkspaceOpen((previous) => !previous)
                }
                aria-expanded={isWorkspaceOpen}
                aria-haspopup="true"
                className="flex items-center gap-2 rounded-full border border-border bg-surface py-1.5 pl-1.5 pr-3 text-sm font-semibold text-ink transition hover:border-brand/50"
              >
                <Avatar size="small" />

                <span className="max-w-28 truncate">
                  {userName}
                </span>

                <ChevronDown
                  size={16}
                  className={`transition ${
                    isWorkspaceOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isWorkspaceOpen && (
                <div className="absolute right-0 top-full z-50 w-64 pt-3">
                  <div className="overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-xl">

                    {/* User Information */}
                    <div className="flex items-center gap-3 border-b border-border px-3 py-3">
                      <Avatar />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">
                          {userName}
                        </p>

                        <p className="mt-1 truncate text-xs text-muted">
                          {userEmail}
                        </p>
                      </div>
                    </div>

                    {/* Workspace Links */}
                    <div className="py-2">
                      {workspaceLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMenus}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                              isActive(link.href)
                                ? "bg-brand/10 font-semibold text-brand"
                                : "text-ink hover:bg-canvas"
                            }`}
                          >
                            <Icon size={17} />
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-border pt-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        <LogOut size={17} />
                        {isLoggingOut
                          ? "Logging out..."
                          : "Logout"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="whitespace-nowrap text-sm font-semibold text-ink transition hover:text-brand"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="whitespace-nowrap rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile / Tablet Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((previous) => !previous)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-ink transition hover:bg-white lg:hidden"
        >
          {isMobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile / Tablet Navigation Panel */}
      {isMobileOpen && (
        <div className="absolute left-0 right-0 top-full z-50 max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-border bg-canvas shadow-xl lg:hidden">
          <div className="mx-auto max-w-7xl space-y-6 px-5 py-6 sm:px-8">

            {/* Public Navigation */}
            <section>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">
                Discover
              </p>

              <div className="grid gap-1">
                {publicLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    className={`flex items-center rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      isActive(link.href)
                        ? "bg-brand/10 text-brand"
                        : "text-ink hover:bg-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>

            {/* Logged-in Workspace */}
            {!isPending && isLoggedIn && (
              <section className="border-t border-border pt-5">
                <div className="mb-4 flex items-center gap-3">
                  <Avatar />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {userName}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted">
                      {userEmail}
                    </p>
                  </div>
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">
                  My Workspace
                </p>

                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {workspaceLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenus}
                        className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                          isActive(link.href)
                            ? "bg-brand/10 text-brand"
                            : "text-ink hover:bg-white"
                        }`}
                      >
                        <Icon size={18} />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Guest Authentication */}
            {!isPending && !isLoggedIn && (
              <section className="grid grid-cols-2 gap-3 border-t border-border pt-5">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="rounded-full border border-border px-4 py-3 text-center text-sm font-semibold text-ink transition hover:bg-white"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="rounded-full bg-brand px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  Register
                </Link>
              </section>
            )}

            {/* Mobile Logout */}
            {!isPending && isLoggedIn && (
              <div className="border-t border-border pt-5">
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  <LogOut size={17} />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}

            {isPending && (
              <div className="h-10 animate-pulse rounded-xl bg-border" />
            )}
          </div>
        </div>
      )}
    </header>
  );
}

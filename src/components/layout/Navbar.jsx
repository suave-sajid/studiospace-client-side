"use client";

import { useState } from "react";
import Link from "next/link";
import { Aperture, Menu, X } from "lucide-react";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const navigationLinks = [
  { label: "Explore spaces", href: "/studios" },
  { label: "Categories", href: "/#categories" },
  { label: "How it works", href: "/#how-it-works" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "Logout failed.");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/95 backdrop-blur-md">
      <nav className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2.5"
        >
          <Aperture size={30} strokeWidth={2.2} />

          <span className="text-xl font-bold tracking-tight text-ink">
            Studio<span className="text-brand">Space.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        {isPending ? (
          <div className="h-9 w-24 animate-pulse rounded-lg bg-border" />
        ) : session?.user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {session.user.name}
            </span>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-canvas"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium transition hover:text-brand"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Get Started
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="flex size-10 items-center justify-center rounded-lg border border-border text-ink transition hover:bg-white md:hidden"
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full border-b border-border bg-canvas p-5 shadow-lg md:hidden">
            <div className="flex flex-col gap-5">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-ink transition hover:text-brand"
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex gap-3 border-t border-border pt-5">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-full border border-border px-4 py-3 text-center text-sm font-semibold text-ink"
                >
                  Log in
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-full bg-brand px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
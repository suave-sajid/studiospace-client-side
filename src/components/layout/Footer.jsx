
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

const quickLinks = [
  { label: "Explore Studios", href: "/studios" },
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "List Your Studio", href: "/add-studio" },
];

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e) {
    e.preventDefault();

    // Newsletter backend integration will be added later.
    // Do not show a successful subscription until it is connected.
    toast.info("Newsletter subscription is not connected yet.");

    setEmail("");
  }

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">

        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-xl font-bold text-white">
                S
              </span>

              <span className="text-2xl font-bold tracking-tight text-ink">
                StudioSpace
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-muted">
              A creative space for every big idea. Discover,
              book, and share inspiring spaces for photography,
              filmmaking, podcasting, and more.
            </p>


            <div className="mt-6 flex items-center gap-3">
              {/* Instagram */}
              <SocialLink href="https://instagram.com" label="Instagram">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </SocialLink>

              {/* Facebook */}
              <SocialLink href="https://facebook.com" label="Facebook">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.5v1.8H7V13h2.9v8h3.6Z" />
                </svg>
              </SocialLink>

              {/* LinkedIn */}
              <SocialLink href="https://linkedin.com" label="LinkedIn">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
                  <path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.1 0H13v1.6h.1A4 4 0 0 1 16.7 8c3.9 0 4.6 2.5 4.6 5.7V21h-3.8v-6.5c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V21H9.4V9Z" />
                </svg>
              </SocialLink>

              {/* X */}
              <SocialLink href="https://x.com" label="X">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
                  <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.45L5.5 22H2.36l7.25-8.3L1.8 2h6.4l4.43 6.77L18.9 2Zm-1.1 18h1.73L7.26 3.89H5.4L17.8 20Z" />
                </svg>
              </SocialLink>
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-ink">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-ink">
              Explore Categories
            </h3>

            <ul className="mt-5 space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(category)}`}
                    className="text-sm text-muted transition hover:text-brand"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-ink">
              Stay Inspired
            </h3>

            <p className="mt-5 text-sm leading-7 text-muted">
              Get creative space inspiration, updates,
              and exclusive offers delivered to your inbox.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-5"
            >
              <label
                htmlFor="newsletter-email"
                className="sr-only"
              >
                Your email address
              </label>

              <div className="flex items-center gap-2 rounded-xl border border-border bg-canvas p-1.5">
                <Mail
                  size={18}
                  className="ml-2 shrink-0 text-muted"
                />

                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-ink outline-none placeholder:text-muted"
                />

                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand text-white transition hover:bg-brand-dark"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>

            <p className="mt-3 text-xs leading-5 text-muted">
              By subscribing, you agree to receive updates
              from StudioSpace.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-14 flex flex-col gap-5 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-muted">
            © {new Date().getFullYear()} StudioSpace.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5 text-xs text-muted">
            <Link
              href="/"
              className="transition hover:text-brand"
            >
              Terms of Service
            </Link>

            <Link
              href="/"
              className="transition hover:text-brand"
            >
              Privacy Policy
            </Link>
          </div>

          <p className="text-xs text-muted">
            Made for creators, with creativity.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition hover:border-brand hover:bg-brand hover:text-white"
    >
      {children}
    </a>
  );
}

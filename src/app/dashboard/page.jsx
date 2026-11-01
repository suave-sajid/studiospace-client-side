"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";


export default function DashboardPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted">Checking your session...</p>
      </main>
    );
  }

  return (
    <>


      <main className="min-h-[75vh] px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="mb-2 text-sm font-medium text-brand">
              YOUR WORKSPACE
            </p>

            <h1 className="text-3xl font-bold">
              Welcome, {session.user.name}
            </h1>

            <p className="mt-2 text-muted">
              Manage your creative spaces and bookings.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              title="Add a Studio"
              description="List your creative space and reach new customers."
              href="/add-studio"
              action="Create listing"
            />

            <DashboardCard
              title="My Listings"
              description="Manage your published studios and update their details."
              href="/my-listings"
              action="View listings"
            />

            <DashboardCard
              title="Explore Studios"
              description="Discover creative spaces for your next project."
              href="/studios"
              action="Explore spaces"
            />
          </div>
        </div>
      </main>


    </>
  );
}

function DashboardCard({ title, description, href, action }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-3 min-h-12 text-sm leading-6 text-muted">
        {description}
      </p>

      <Link
        href={href}
        className="mt-6 inline-flex rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        {action}
      </Link>
    </div>
  );
}
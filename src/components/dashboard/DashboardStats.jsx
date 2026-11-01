"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  CalendarDays,
  ClipboardList,
  Heart,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const statItems = [
  {
    key: "listings",
    label: "My Listings",
    icon: Building2,
    color: "text-brand",
  },
  {
    key: "bookings",
    label: "My Bookings",
    icon: CalendarDays,
    color: "text-blue-600",
  },
  {
    key: "requests",
    label: "Booking Requests",
    icon: ClipboardList,
    color: "text-amber-600",
  },
  {
    key: "wishlist",
    label: "Wishlist",
    icon: Heart,
    color: "text-rose-500",
  },
];

export default function DashboardStats() {
  const { data: session, isPending } = authClient.useSession();

  const [stats, setStats] = useState({
    listings: 0,
    bookings: 0,
    requests: 0,
    wishlist: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      setLoading(true);

      const endpoints = [
        { key: "listings", url: "/api/studios/mine" },
        { key: "bookings", url: "/api/bookings/my" },
        { key: "requests", url: "/api/bookings/received" },
        { key: "wishlist", url: "/api/wishlist" },
      ];

      const results = await Promise.all(
        endpoints.map(async ({ key, url }) => {
          try {
            const response = await apiFetch(url);

            if (!response.ok) {
              throw new Error(`Failed to load ${key}`);
            }

            const result = await response.json();

            return {
              key,
              count: Array.isArray(result.data)
                ? result.data.length
                : 0,
            };
          } catch (error) {
            console.error(`Dashboard ${key} error:`, error);
            return { key, count: 0 };
          }
        })
      );

      setStats((previous) => ({
        ...previous,
        ...Object.fromEntries(
          results.map(({ key, count }) => [key, count])
        ),
      }));

      setLoading(false);
    };

    fetchStats();
  }, [session, isPending]);

  if (isPending || !session) return null;

  return (
    <section className="mb-10">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Your Overview</h2>
        <p className="mt-1 text-sm text-muted">
          A quick look at your StudioSpace activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">
                  {item.label}
                </span>

                <Icon size={21} className={item.color} />
              </div>

              <p className="mt-4 text-3xl font-bold text-ink">
                {loading ? "—" : stats[item.key]}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
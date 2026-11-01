
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

export default function ReceivedBookingsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      setLoading(false);
      return;
    }

    fetchBookings();
  }, [session, isPending]);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await apiFetch("/api/bookings/received");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load requests.");
      }

      setBookings(result.data || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, action) => {
    try {
      setUpdatingId(bookingId);

      const response = await apiFetch(
        `/api/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not update booking.");
      }

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: result.data.status }
            : booking
        )
      );

      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (isPending || loading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-muted">Loading booking requests...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Please sign in</h1>
        <Link href="/login" className="text-brand underline">
          Sign in to continue
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm text-muted">Host dashboard</p>
        <h1 className="text-3xl font-semibold">Booking Requests</h1>
        <p className="mt-2 text-muted">
          Manage booking requests received for your studios.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <h2 className="text-xl font-semibold">No booking requests</h2>
          <p className="mt-2 text-muted">
            New booking requests for your studios will appear here.
          </p>
          <Link
            href="/my-listings"
            className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-white"
          >
            Manage My Studios
          </Link>
        </div>
      ) : (
        <div className="grid gap-5">
          {bookings.map((booking) => (
            <article
              key={booking._id}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex gap-4">
                  <img
                    src={booking.studio?.image || "/placeholder-studio.jpg"}
                    alt={booking.studio?.title || "Studio"}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <div>
                    <p className="text-sm text-muted">
                      {booking.studio?.category || "Studio"}
                    </p>
                    <h2 className="text-lg font-semibold">
                      {booking.studio?.title || "Studio unavailable"}
                    </h2>
                    <p className="text-sm text-muted">
                      {booking.studio?.location?.city || ""}
                    </p>
                    <p className="mt-2 text-xs text-muted">
                      Customer ID: {booking.creatorId}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-sage px-3 py-1 text-sm">
                  {booking.status}
                </span>
              </div>

              <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-muted">Start</p>
                  <p>{new Date(booking.startAt).toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-muted">End</p>
                  <p>{new Date(booking.endAt).toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-muted">Total amount</p>
                  <p className="font-semibold">
                    ${booking.totalAmount}
                  </p>
                </div>
              </div>

              {booking.status === "Pending" && (
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    disabled={updatingId === booking._id}
                    onClick={() => updateStatus(booking._id, "confirm")}
                    className="rounded-full bg-brand px-5 py-2 text-sm text-white disabled:opacity-50"
                  >
                    {updatingId === booking._id ? "Updating..." : "Confirm"}
                  </button>

                  <button
                    disabled={updatingId === booking._id}
                    onClick={() => updateStatus(booking._id, "reject")}
                    className="rounded-full border border-border px-5 py-2 text-sm disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

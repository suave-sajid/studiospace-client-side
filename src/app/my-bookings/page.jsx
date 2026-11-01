
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import ReviewForm from "@/components/reviews/ReviewForm";

export default function MyBookingsPage() {
    const { data: session, isPending } = authClient.useSession();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

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

            const response = await apiFetch("/api/bookings/my");
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to load bookings.");
            }

            setBookings(result.data || []);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (bookingId) => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmed) return;

        try {
            const response = await apiFetch(
                `/api/bookings/${bookingId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        action: "cancel",
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Cancellation failed.");
            }

            setBookings((previous) =>
                previous.map((booking) =>
                    booking._id === bookingId
                        ? { ...booking, status: "Cancelled" }
                        : booking
                )
            );


            toast.success("Booking cancelled successfully.");
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (isPending || loading) {
        return (
            <main className="mx-auto max-w-6xl px-6 py-16">
                <p className="text-muted">Loading your bookings...</p>
            </main>
        );
    }

    if (!session) {
        return (
            <main className="mx-auto max-w-6xl px-6 py-16">
                <h1 className="text-2xl font-semibold">Please sign in</h1>
                <Link href="/login" className="text-brand underline">
                    Sign in to view your bookings
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <div className="mb-8">
                <p className="mb-2 text-sm text-muted">Your activity</p>
                <h1 className="text-3xl font-semibold">My Bookings</h1>
                <p className="mt-2 text-muted">
                    View and manage your studio booking requests.
                </p>
            </div>

            {bookings.length === 0 ? (
                <div className="rounded-2xl border border-border bg-surface p-12 text-center">
                    <h2 className="text-xl font-semibold">No bookings yet</h2>
                    <p className="mt-2 text-muted">
                        Find a creative space and make your first booking.
                    </p>
                    <Link
                        href="/studios"
                        className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-white"
                    >
                        Explore Studios
                    </Link>
                </div>
            ) : (
                <div className="grid gap-5">
                    {bookings.map((booking) => (
                        <article
                            key={booking._id}
                            className="grid gap-5 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-[180px_1fr]"
                        >
                            <img
                                src={booking.studio?.image || "/placeholder-studio.jpg"}
                                alt={booking.studio?.title || "Studio"}
                                className="h-40 w-full rounded-xl object-cover"
                            />

                            <div>
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm text-muted">
                                            {booking.studio?.category || "Studio"}
                                        </p>
                                        <h2 className="mt-1 text-xl font-semibold">
                                            {booking.studio?.title || "Studio unavailable"}
                                        </h2>
                                        <p className="mt-1 text-sm text-muted">
                                            {booking.studio?.location?.city || ""}
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-sage px-3 py-1 text-sm">
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                                    <div>
                                        <p className="text-muted">Start</p>
                                        <p>{new Date(booking.startAt).toLocaleString()}</p>
                                    </div>

                                    <div>
                                        <p className="text-muted">End</p>
                                        <p>{new Date(booking.endAt).toLocaleString()}</p>
                                    </div>

                                    <div>
                                        <p className="text-muted">Total</p>
                                        <p className="font-semibold">
                                            ${booking.totalAmount}
                                        </p>
                                    </div>
                                </div>

                                {["Pending", "Confirmed"].includes(booking.status) && (
                                    <button
                                        onClick={() => cancelBooking(booking._id)}
                                        className="mt-5 rounded-full border border-border px-5 py-2 text-sm hover:bg-canvas"
                                    >
                                        Cancel Booking
                                    </button>
                                )}

                                {
                                    booking.status === "Completed" && (
                                        <ReviewForm
                                            bookingId={booking._id}
                                        />
                                    )
                                }
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}

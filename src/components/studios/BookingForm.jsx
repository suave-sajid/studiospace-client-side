
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

export default function BookingForm({
  studioId,
  hourlyRate,
  securityDeposit,
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startDate = startAt ? new Date(startAt) : null;
  const endDate = endAt ? new Date(endAt) : null;

  const totalHours =
    startDate && endDate && endDate > startDate
      ? (endDate - startDate) / (1000 * 60 * 60)
      : 0;

  const totalAmount =
    Number(hourlyRate) * totalHours + Number(securityDeposit);

  const handleBooking = async (event) => {
    event.preventDefault();

    if (!session) {
      toast.error("Please sign in before booking.");
      router.push("/login");
      return;
    }

    if (!startAt || !endAt) {
      toast.error("Please select your booking date and time.");
      return;
    }

    if (startDate <= new Date()) {
      toast.error("Please select a future start time.");
      return;
    }

    if (
      endDate <= startDate ||
      totalHours < 1 ||
      !Number.isInteger(totalHours)
    ) {
      toast.error("Select a valid duration in whole hours.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await apiFetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studioId,
          startAt: startDate.toISOString(),
          endAt: endDate.toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed.");
      }

      toast.success("Booking request sent successfully!");

      router.push("/my-bookings");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return <p className="text-sm text-muted">Loading...</p>;
  }

  return (
    <form onSubmit={handleBooking} className="space-y-5">
      <div>
        <p className="text-2xl font-semibold">
          ${hourlyRate}
          <span className="text-sm font-normal text-muted"> / hour</span>
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Start date & time
        </label>
        <input
          type="datetime-local"
          value={startAt}
          min={new Date(Date.now() + 60000).toISOString().slice(0, 16)}
          onChange={(event) => setStartAt(event.target.value)}
          required
          className="form-input w-full"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          End date & time
        </label>
        <input
          type="datetime-local"
          value={endAt}
          min={startAt || undefined}
          onChange={(event) => setEndAt(event.target.value)}
          required
          className="form-input w-full"
        />
      </div>

      <div className="space-y-2 rounded-xl bg-canvas p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Duration</span>
          <span>{totalHours > 0 ? `${totalHours} hours` : "—"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted">Studio fee</span>
          <span>
            ${totalHours > 0 ? hourlyRate * totalHours : 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted">Security deposit</span>
          <span>${securityDeposit}</span>
        </div>

        <div className="flex justify-between border-t border-border pt-3 font-semibold">
          <span>Total amount</span>
          <span>${totalHours > 0 ? totalAmount : 0}</span>
        </div>
      </div>

      {!session ? (
        <p className="text-sm text-muted">
          Sign in to request a booking.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand px-6 py-3 font-medium text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending Request..." : "Request Booking"}
      </button>

      <p className="text-center text-xs text-muted">
        Your booking will be pending until the host confirms it.
      </p>
    </form>
  );
}

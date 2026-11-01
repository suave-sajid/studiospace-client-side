
"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

export default function ReviewForm({ bookingId, onSuccess }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (comment.trim().length < 10) {
      toast.error("Write at least 10 characters.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await apiFetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          rating,
          comment: comment.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not submit review.");
      }

      toast.success("Your review was submitted!");
      setComment("");
      onSuccess?.();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4 rounded-xl border border-border bg-canvas p-4">
      <h3 className="font-semibold">Share your experience</h3>

      <div>
        <p className="mb-2 text-sm text-muted">Your rating</p>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              aria-label={`Rate ${value} stars`}
              className="transition hover:scale-110"
            >
              <Star
                size={25}
                className={
                  value <= rating
                    ? "fill-brand text-brand"
                    : "text-muted"
                }
              />
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Tell others about your experience..."
        rows={4}
        maxLength={500}
        required
        className="w-full rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-brand"
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted">
          {comment.length}/500 characters
        </span>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
}

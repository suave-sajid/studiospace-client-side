
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  MapPin,
  Users,
  Pencil,
  Trash2,
  Eye,
  Loader2,
  Building2,
  ArrowRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

export default function MyListingsPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [studios, setStudios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch authenticated user's listings
  const fetchMyStudios = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await apiFetch("/api/studios/mine");
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to load your listings."
        );
      }

      setStudios(result.data || []);
    } catch (error) {
      setErrorMessage(
        error.message || "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Authentication and initial data loading
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
      return;
    }

    if (session?.user) {
      fetchMyStudios();
    }
  }, [isPending, session?.user, router, fetchMyStudios]);

  // Delete selected studio
  const handleDelete = async () => {
    if (!selectedStudio || deletingId) return;

    const studioId = selectedStudio._id;

    try {
      setDeletingId(studioId);

      const response = await apiFetch(
        `/api/studios/${studioId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to delete studio."
        );
      }

      // Update UI without another API request
      setStudios((previous) =>
        previous.filter((studio) => studio._id !== studioId)
      );

      setSelectedStudio(null);

      toast.success("Studio listing deleted successfully.");
    } catch (error) {
      toast.error(
        error.message || "Failed to delete studio."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Session loading
  if (isPending || !session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas">
        <div className="flex items-center gap-3 text-sm text-muted">
          <Loader2 size={18} className="animate-spin" />
          Checking your session...
        </div>
      </main>
    );
  }

  const activeCount = studios.filter(
    (studio) => studio.status === "active"
  ).length;

  const inactiveCount = studios.length - activeCount;

  return (
    <>
      <main className="min-h-screen bg-canvas px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* Page Header */}
          <section className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Host workspace
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                My Listings
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
                Manage your creative spaces, update your listing
                details, and keep your properties ready for creators.
              </p>
            </div>

            <Link
              href="/add-studio"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
            >
              <Plus size={18} />
              Add a Studio
            </Link>
          </section>

          {/* Statistics */}
          {!isLoading && !errorMessage && (
            <section className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatCard
                icon={<Building2 size={20} />}
                label="Total Listings"
                value={studios.length}
              />

              <StatCard
                icon={<Eye size={20} />}
                label="Active Listings"
                value={activeCount}
              />

              <StatCard
                icon={<AlertCircle size={20} />}
                label="Inactive Listings"
                value={inactiveCount}
              />
            </section>
          )}

          {/* Section Heading */}
          <div className="mt-12 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-ink">
                Your creative spaces
              </h2>

              <p className="mt-1 text-sm text-muted">
                {isLoading
                  ? "Loading your listings..."
                  : `${studios.length} ${
                      studios.length === 1 ? "listing" : "listings"
                    } found`}
              </p>
            </div>

            {!isLoading && (
              <button
                type="button"
                onClick={fetchMyStudios}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-muted transition hover:bg-canvas hover:text-ink"
              >
                <RefreshCw size={15} />
                Refresh
              </button>
            )}
          </div>

          {/* Error State */}
          {errorMessage && (
            <div
              role="alert"
              className="mt-6 flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-red-600"
                />

                <div>
                  <p className="font-semibold text-red-800">
                    Unable to load your listings
                  </p>

                  <p className="mt-1 text-sm text-red-700">
                    {errorMessage}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={fetchMyStudios}
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <RefreshCw size={15} />
                Try again
              </button>
            </div>
          )}

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <StudioCardSkeleton key={item} />
              ))}
            </div>
          ) : errorMessage ? null : studios.length === 0 ? (
            /* Empty State */
            <EmptyState />
          ) : (
            /* Studio Grid */
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <StudioListingCard
                  key={studio._id}
                  studio={studio}
                  onDelete={() => setSelectedStudio(studio)}
                />
              ))}
            </div>
          )}

          {/* Bottom Information */}
          {!isLoading && !errorMessage && studios.length > 0 && (
            <div className="mt-10 flex flex-col justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
              <p className="text-xs text-muted">
                Keep your studio details and images up to date.
              </p>

              <Link
                href="/add-studio"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark"
              >
                Publish another studio
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {selectedStudio && (
        <DeleteConfirmation
          studio={selectedStudio}
          isDeleting={deletingId === selectedStudio._id}
          onCancel={() => {
            if (!deletingId) {
              setSelectedStudio(null);
            }
          }}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

// Statistics Card
function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{label}</p>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage text-ink">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-3xl font-bold tabular-nums text-ink">
        {value}
      </p>
    </div>
  );
}

// Studio Listing Card
function StudioListingCard({ studio, onDelete }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Studio Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-canvas">
        {studio.image && !imageError ? (
          <img
            src={studio.image}
            alt={studio.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Building2 size={42} className="text-muted/50" />
          </div>
        )}

        {/* Status */}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-xs font-semibold capitalize shadow-sm ${
            studio.status === "active"
              ? "bg-white text-green-700"
              : "bg-white text-gray-600"
          }`}
        >
          {studio.status || "Unknown"}
        </span>
      </div>

      {/* Card Information */}
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">
          {studio.category}
        </p>

        <h2 className="mt-2 line-clamp-1 text-lg font-bold text-ink">
          {studio.title}
        </h2>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <MapPin size={15} className="shrink-0" />
          <span className="line-clamp-1">
            {studio.location?.address}, {studio.location?.city}
          </span>
        </div>

        {/* Price and Capacity */}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted">Hourly rate</p>

            <p className="mt-1 text-lg font-bold text-ink">
              ${studio.hourlyRate}
              <span className="ml-1 text-xs font-normal text-muted">
                / hour
              </span>
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted">Capacity</p>

            <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
              <Users size={15} />
              {studio.maxCapacity} guests
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <Link
            href={`/studios/${studio._id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-2 py-2.5 text-xs font-semibold text-ink transition hover:bg-canvas"
          >
            <Eye size={15} />
            View
          </Link>

          <Link
            href={`/my-listings/edit/${studio._id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-2 py-2.5 text-xs font-semibold text-ink transition hover:bg-canvas"
          >
            <Pencil size={15} />
            Edit
          </Link>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-2 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
            aria-label={`Delete ${studio.title}`}
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

// Loading Skeleton
function StudioCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="aspect-[16/10] animate-pulse bg-border" />

      <div className="space-y-4 p-5">
        <div className="h-3 w-24 animate-pulse rounded bg-border" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-border" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-border" />
        <div className="h-10 animate-pulse rounded bg-border" />
        <div className="h-10 animate-pulse rounded bg-border" />
      </div>
    </div>
  );
}

// Empty State
function EmptyState() {
  return (
    <div className="mt-7 rounded-3xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sage">
        <Building2 size={30} className="text-ink" />
      </div>

      <h2 className="mt-6 text-xl font-bold text-ink">
        Your creative space deserves to be discovered.
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
        You haven't published a studio yet. Share your space
        with photographers, filmmakers, podcasters and creators.
      </p>

      <Link
        href="/add-studio"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        <Plus size={17} />
        Create your first listing
      </Link>
    </div>
  );
}

// Delete Confirmation Modal
function DeleteConfirmation({
  studio,
  isDeleting,
  onCancel,
  onConfirm,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isDeleting
        ) {
          onCancel();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <Trash2 size={22} />
        </div>

        <h2
          id="delete-title"
          className="mt-5 text-xl font-bold text-ink"
        >
          Delete this studio?
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted">
          Are you sure you want to delete{" "}
          <strong className="text-ink">
            {studio.title}
          </strong>
          ? This action cannot be undone.
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-ink transition hover:bg-canvas disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete Studio
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

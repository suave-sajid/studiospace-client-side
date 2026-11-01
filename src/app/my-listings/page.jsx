"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";


export default function MyListingsPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [studios, setStudios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMyStudios = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await apiFetch("/api/studios/mine");
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to load your listings.");
      }

      setStudios(result.data || []);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
      return;
    }

    if (session?.user) {
      fetchMyStudios();
    }
  }, [isPending, session?.user, router, fetchMyStudios]);

  const handleDelete = async () => {
    if (!selectedStudio) return;

    try {
      setIsDeleting(true);
      setErrorMessage("");

      const response = await apiFetch(
        `/api/studios/${selectedStudio._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete studio.");
      }

      setStudios((previous) =>
        previous.filter(
          (studio) => studio._id !== selectedStudio._id
        )
      );

      setSelectedStudio(null);
    } catch (error) {
      setErrorMessage(error.message || "Delete failed.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted">Checking your session...</p>
      </main>
    );
  }

  return (
    <>

      <main className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-brand">
                Host workspace
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                My Listings
              </h1>

              <p className="mt-2 text-sm text-muted">
                Manage the creative spaces you have published.
              </p>
            </div>

            <Link
              href="/add-studio"
              className="inline-flex w-fit rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              + Add a Studio
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-xl border border-border bg-surface px-5 py-3">
              <p className="text-xs text-muted">Total listings</p>
              <p className="mt-1 text-2xl font-bold">{studios.length}</p>
            </div>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorMessage}
            </div>
          )}

          {isLoading ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-80 animate-pulse rounded-2xl bg-border"
                />
              ))}
            </div>
          ) : studios.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
              <h2 className="text-xl font-semibold">
                No studios listed yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                Your creative space deserves to be discovered. Publish
                your first listing and welcome new creators.
              </p>

              <Link
                href="/add-studio"
                className="mt-6 inline-flex rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Create your first listing
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <StudioListingCard
                  key={studio._id}
                  studio={studio}
                  onDelete={() => setSelectedStudio(studio)}
                />
              ))}
            </div>
          )}
        </div>
      </main>


      {selectedStudio && (
        <DeleteConfirmation
          studio={selectedStudio}
          isDeleting={isDeleting}
          onCancel={() => setSelectedStudio(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

function StudioListingCard({ studio, onDelete }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="relative aspect-[16/10] overflow-hidden bg-canvas">
        <img
          src={studio.image}
          alt={studio.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />

        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold capitalize text-ink shadow-sm">
          {studio.status}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-medium text-brand">
          {studio.category}
        </p>

        <h2 className="mt-2 line-clamp-1 text-lg font-semibold">
          {studio.title}
        </h2>

        <p className="mt-1 text-sm text-muted">
          {studio.location?.address}, {studio.location?.city}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <p className="font-semibold">
            {studio.hourlyRate}
            <span className="text-xs font-normal text-muted"> / hour</span>
          </p>

          <p className="text-xs text-muted">
            Capacity: {studio.maxCapacity}
          </p>
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            href={`/studios/${studio._id}`}
            className="flex-1 rounded-lg border border-border px-3 py-2.5 text-center text-sm font-medium transition hover:bg-canvas"
          >
            View
          </Link>

          <Link
            href={`/my-listings/edit/${studio._id}`}
            className="flex-1 rounded-lg border border-border px-3 py-2.5 text-center text-sm font-medium transition hover:bg-canvas"
          >
            Edit
          </Link>

          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            aria-label={`Delete ${studio.title}`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

function DeleteConfirmation({
  studio,
  isDeleting,
  onCancel,
  onConfirm,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isDeleting) {
          onCancel();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl"
      >
        <h2 id="delete-title" className="text-xl font-bold">
          Delete this studio?
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted">
          Are you sure you want to delete{" "}
          <strong className="text-ink">{studio.title}</strong>?
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-canvas disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete studio"}
          </button>
        </div>
      </div>
    </div>
  );
}
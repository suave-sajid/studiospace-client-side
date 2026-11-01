
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

export default function WishlistPage() {
  const { data: session, isPending } = authClient.useSession();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      setLoading(false);
      return;
    }

    fetchWishlist();
  }, [session, isPending]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const response = await apiFetch("/api/wishlist");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load wishlist.");
      }

      setWishlist(result.data || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (studioId) => {
    try {
      setRemovingId(studioId);

      const response = await apiFetch(`/api/wishlist/${studioId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to remove studio.");
      }

      setWishlist((previous) =>
        previous.filter((item) => item.studio._id !== studioId)
      );

      toast.success("Removed from wishlist.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setRemovingId(null);
    }
  };

  if (isPending || loading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-muted">Loading your wishlist...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Please sign in</h1>
        <Link href="/login" className="mt-3 inline-block text-brand underline">
          Sign in to view your wishlist
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm text-muted">Your saved spaces</p>
        <h1 className="text-3xl font-semibold">My Wishlist</h1>
        <p className="mt-2 text-muted">
          Keep your favorite creative spaces in one place.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <Heart size={32} className="mx-auto text-brand" />
          <h2 className="mt-4 text-xl font-semibold">
            Your wishlist is empty
          </h2>
          <p className="mt-2 text-muted">
            Save studios you like and find them here later.
          </p>
          <Link
            href="/studios"
            className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-white"
          >
            Explore Studios
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => {
            const studio = item.studio;

            return (
              <article
                key={item._id}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <Link href={`/studios/${studio._id}`}>
                  <img
                    src={studio.image || "/placeholder-studio.jpg"}
                    alt={studio.title}
                    className="h-52 w-full object-cover"
                  />
                </Link>

                <div className="p-5">
                  <p className="text-sm text-muted">{studio.category}</p>

                  <Link href={`/studios/${studio._id}`}>
                    <h2 className="mt-1 text-lg font-semibold hover:text-brand">
                      {studio.title}
                    </h2>
                  </Link>

                  <p className="mt-1 text-sm text-muted">
                    {studio.location?.city}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-semibold">
                      ${studio.hourlyRate}
                      <span className="text-sm font-normal text-muted">
                        {" "}/ hour
                      </span>
                    </p>

                    <button
                      type="button"
                      onClick={() => removeFromWishlist(studio._id)}
                      disabled={removingId === studio._id}
                      className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-canvas disabled:opacity-50"
                    >
                      <Trash2 size={15} />
                      {removingId === studio._id ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

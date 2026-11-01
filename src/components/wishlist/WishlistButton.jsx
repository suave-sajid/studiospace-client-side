"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

export default function WishlistButton({ studioId }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isPending || !session) return;

    const fetchWishlistStatus = async () => {
      try {
        const response = await apiFetch("/api/wishlist");
        const result = await response.json();

        if (!response.ok) return;

        const exists = (result.data || []).some(
          (item) => item.studio?._id === studioId
        );

        setIsWishlisted(exists);
      } catch (error) {
        console.error("Wishlist status error:", error);
      }
    };

    fetchWishlistStatus();
  }, [session, isPending, studioId]);

  const handleToggle = async () => {
    if (!session) {
      toast.error("Please sign in to save studios.");
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);

      const response = await apiFetch(
        `/api/wishlist/${studioId}`,
        {
          method: isWishlisted ? "DELETE" : "POST",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Wishlist update failed.");
      }

      setIsWishlisted(!isWishlisted);

      toast.success(
        isWishlisted
          ? "Removed from wishlist."
          : "Added to wishlist."
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isLoading || isPending}
      aria-label={
        isWishlisted ? "Remove from wishlist" : "Add to wishlist"
      }
      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white text-ink shadow-sm transition hover:scale-105 hover:text-brand disabled:opacity-60"
    >
      <Heart
        size={19}
        className={
          isWishlisted
            ? "fill-brand text-brand"
            : "text-ink"
        }
      />
    </button>
  );
}
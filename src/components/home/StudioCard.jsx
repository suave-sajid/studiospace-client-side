
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import WishlistButton from "@/components/wishlist/WishlistButton";

export default function StudioCard({ studio }) {
    const {
        _id,
        title,
        category,
        hourlyRate,
        location,
        image,
        rating,
        reviewCount,
    } = studio;

    return (
        <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">

            {/* Studio Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-canvas">

                <Link
                    href={`/studios/${_id}`}
                    className="absolute inset-0 block"
                >
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted">
                            Studio image unavailable
                        </div>
                    )}

                    <span className="absolute left-4 top-4 rounded-full border border-border/50 bg-surface/95 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur-sm">
                        {category}
                    </span>
                </Link>

                <WishlistButton studioId={_id} />
            </div>

            {/* Studio Information */}
            <div className="p-5">

                <div className="flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 font-bold text-ink">
                        {title}
                    </h3>

                    <div className="flex shrink-0 items-center gap-1 text-sm">
                        {Number(rating) > 0 ? (
                            <>
                                <Star
                                    size={15}
                                    className="fill-amber-400 text-amber-400"
                                />
                                <span className="font-semibold text-ink">
                                    {Number(rating).toFixed(1)}
                                </span>
                            </>
                        ) : (
                            <span className="text-xs text-muted">
                                New studio
                            </span>
                        )}
                    </div>
                </div>

                {/* Location */}
                <div className="mt-3 flex items-center gap-1.5 text-sm text-muted">
                    <MapPin size={15} />
                    <span>
                        {location?.city || "Location unavailable"}
                    </span>
                </div>

                {/* Price and Reviews */}
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <div>
                        <span className="text-lg font-bold text-ink">
                            ৳{Number(hourlyRate).toLocaleString("en-BD")}
                        </span>
                        <span className="ml-1 text-xs text-muted">
                            / hour
                        </span>
                    </div>

                    <span className="text-xs text-muted">
                        {reviewCount || 0} reviews
                    </span>
                </div>

                {/* View Details Button */}
                <Link
                    href={`/studios/${_id}`}
                    className="mt-4 flex w-full items-center justify-center rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
                >
                    View Details
                </Link>

            </div>
        </article>
    );
}

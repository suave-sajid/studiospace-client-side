import Link from "next/link";
import {
    MapPin,
    Star,
    ArrowUpRight,
} from "lucide-react";
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
        <article className="group overflow-hidden rounded-2xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-black/5">

            {/* Studio Image */}

            {/* Studio Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-sage">

                <Link
                    href={`/studios/${_id}`}
                    className="absolute inset-0 block"
                >
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted">
                            Studio image unavailable
                        </div>
                    )}

                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink">
                        {category}
                    </span>

                    <span className="absolute right-16 top-4 flex size-9 items-center justify-center rounded-full bg-white text-ink shadow-sm transition group-hover:bg-brand group-hover:text-white">
                        <ArrowUpRight size={18} />
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
                                <Star size={15} className="fill-amber-400 text-amber-400" />
                                <span className="font-semibold text-ink">
                                    {Number(rating).toFixed(1)}
                                </span>
                            </>
                        ) : (
                            <span className="text-xs text-muted">New studio</span>
                        )}
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-sm text-muted">
                    <MapPin size={15} />
                    <span>{location?.city || "Location unavailable"}</span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <div>
                        <span className="text-lg font-bold text-ink">
                            ৳{Number(hourlyRate).toLocaleString("en-BD")}
                        </span>
                        <span className="ml-1 text-xs text-muted">/ hour</span>
                    </div>

                    <span className="text-xs text-muted">
                        {reviewCount || 0} reviews
                    </span>
                </div>
            </div>
        </article>
    );
}
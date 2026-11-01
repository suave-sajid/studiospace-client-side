export default function StudioCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      {/* Image placeholder */}
      <div className="aspect-[4/3] animate-pulse bg-stone-200" />

      <div className="space-y-4 p-5">
        {/* Title and rating */}
        <div className="flex items-center justify-between gap-4">
          <div className="h-5 w-3/5 animate-pulse rounded bg-stone-200" />
          <div className="h-4 w-12 animate-pulse rounded bg-stone-200" />
        </div>

        {/* Location */}
        <div className="h-4 w-2/5 animate-pulse rounded bg-stone-200" />

        {/* Price */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="h-6 w-24 animate-pulse rounded bg-stone-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-stone-200" />
        </div>
      </div>
    </div>
  );
}
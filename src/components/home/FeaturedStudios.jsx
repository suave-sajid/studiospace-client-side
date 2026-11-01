import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";

import FeaturedStudioList from "./FeaturedStudioList";
import StudioCardSkeleton from "./StudioCardSkeleton";

function FeaturedStudiosLoading() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <StudioCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default function FeaturedStudios() {
  return (
    <section className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section Heading */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-brand">
              HANDPICKED SPACES
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Spaces worth discovering.
            </h2>

            <p className="mt-3 text-sm text-muted">
              Explore inspiring spaces for your next creative project.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-brand"
          >
            Explore all
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Async Studio Data */}
        <Suspense fallback={<FeaturedStudiosLoading />}>
          <FeaturedStudioList />
        </Suspense>

      </div>
    </section>
  );
}
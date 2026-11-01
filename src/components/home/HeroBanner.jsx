import Link from "next/link";
import { ArrowRight, Aperture, Sparkles } from "lucide-react";
import SearchBar from "./SearchBar";

export default function HeroBanner() {
  return (
    <section className="overflow-hidden bg-canvas">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">

        {/* Left: Hero Content */}
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold tracking-wide text-muted">
            <Sparkles size={15} className="text-brand" />
            A MARKETPLACE FOR CREATORS
          </div>

          <h1 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Find your space.
            <br />
            <span className="text-brand">Create</span> something
            <br />
            extraordinary.
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-muted sm:text-lg">
            Discover inspiring studios and creative spaces.
            Book the perfect environment to bring your next
            big idea to life.
          </p>

          {/* Search Component */}
          <div className="mt-10">
            <SearchBar />
          </div>

          <p className="mt-5 text-xs leading-6 text-muted">
            Photography · Film · Podcast · Music · Creative workshops
          </p>

          <Link
            href="/studios"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-brand"
          >
            Explore all spaces
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Right: Hero Visual */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sage">

            {/* Decorative background */}
            <div className="absolute -right-20 -top-20 size-80 rounded-full border border-ink/10" />
            <div className="absolute -right-10 -top-10 size-60 rounded-full border border-ink/10" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="flex size-24 items-center justify-center rounded-full border border-ink/20">
                <Aperture size={60} strokeWidth={1} />
              </div>

              <p className="mt-8 text-xs font-semibold tracking-[0.35em] text-ink/60">
                STUDIO SPACE
              </p>

              <h2 className="mt-4 max-w-sm text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Ideas need
                <br />
                space to grow.
              </h2>

              <p className="mt-5 max-w-xs text-sm leading-7 text-ink/60">
                Find inspiring spaces. Create extraordinary things.
              </p>

              <span className="mt-8 rounded-full bg-white/70 px-5 py-3 text-xs font-semibold tracking-wide">
                SPACE TO CREATE
              </span>
            </div>
          </div>

          {/* Floating card */}
          <div className="absolute -bottom-5 -left-2 rounded-2xl border border-border bg-white p-4 shadow-xl sm:-left-6">
            <p className="text-xs text-muted">Your creative journey</p>
            <p className="mt-1 font-bold">Starts with a space.</p>
          </div>

          <div className="absolute -right-2 top-8 rounded-2xl bg-brand p-4 text-white shadow-lg sm:-right-5">
            <Sparkles size={22} />
          </div>
        </div>

      </div>
    </section>
  );
}

import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Film,
  Mic2,
  Music2,
  Users,
  Sparkles,
  Heart,
  ShieldCheck,
} from "lucide-react";

const creativeSpaces = [
  {
    icon: Camera,
    title: "Photography Studios",
    description:
      "Discover professional spaces for portraits, product photography, and creative shoots.",
  },
  {
    icon: Film,
    title: "Film & Production",
    description:
      "Find production-ready environments for filmmaking, video production, and content creation.",
  },
  {
    icon: Mic2,
    title: "Podcast Studios",
    description:
      "Explore dedicated spaces for podcast recording, interviews, and audio production.",
  },
  {
    icon: Music2,
    title: "Music Studios",
    description:
      "Find creative environments for recording, rehearsals, and music production.",
  },
];

const values = [
  {
    icon: Users,
    title: "Community First",
    description:
      "We believe creativity grows when people, ideas, and opportunities come together.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description:
      "We aim to make discovering and booking creative spaces simple and transparent.",
  },
  {
    icon: Sparkles,
    title: "Creative Freedom",
    description:
      "Every creator deserves access to the right environment to bring their ideas to life.",
  },
  {
    icon: Heart,
    title: "Built for Creators",
    description:
      "Our platform focuses on the needs of photographers, filmmakers, podcasters, and artists.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-canvas text-ink transition-colors duration-300">

      {/* HERO */}
      <section className="relative px-5 pb-20 pt-20 sm:px-8 sm:pt-28 lg:px-12 lg:pb-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              <Sparkles size={14} />
              About StudioSpace
            </span>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              A space for every
              <span className="text-brand"> creative idea.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-muted sm:text-lg">
              StudioSpace connects creators with inspiring spaces.
              Whether you are capturing a moment, producing a film,
              recording a podcast, or creating something new, find
              the right space to make it happen.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/studios"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Explore Studios
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-7 py-4 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
              >
                Join StudioSpace
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative">
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-sage blur-2xl opacity-70" />

            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=85&w=1200"
                alt="Creative workspace"
                className="h-[380px] w-full object-cover sm:h-[480px]"
              />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-white/90 p-5 text-[#191919] backdrop-blur-md dark:border-white/10 dark:bg-[#1b1e25]/90 dark:text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                  The StudioSpace Vision
                </p>
                <p className="mt-2 text-lg font-semibold">
                  Making creative spaces accessible to everyone.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-7 -left-5 -z-0 h-24 w-24 rounded-full border-[14px] border-brand/20" />
          </div>

        </div>
      </section>

      {/* MISSION */}
      <section className="border-y border-border bg-surface px-5 py-20 transition-colors duration-300 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Our Mission
            </span>

            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Creativity needs the right environment.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-muted">
            <p>
              Finding the right creative space should not be complicated.
              Creators often spend valuable time searching for suitable
              studios, comparing options, and arranging bookings.
            </p>

            <p>
              StudioSpace aims to bring this process into one place.
              We connect studio owners who have spaces to share with
              creators who need somewhere to bring their ideas to life.
            </p>

            <p>
              Our goal is to build a marketplace where discovering,
              exploring, and booking creative spaces feels effortless.
            </p>
          </div>

        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Explore Possibilities
            </span>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Spaces for every kind of creator.
            </h2>

            <p className="mt-5 leading-7 text-muted">
              From photography to music production, discover spaces
              designed to support different creative workflows.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {creativeSpaces.map((space) => {
              const Icon = space.icon;

              return (
                <div
                  key={space.title}
                  className="group rounded-3xl border border-border bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20"
                >
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-canvas text-brand transition group-hover:bg-brand group-hover:text-white">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-lg font-semibold text-ink">
                    {space.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {space.description}
                  </p>

                  <Link
                    href="/studios"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:gap-3"
                  >
                    Explore spaces
                    <ArrowRight size={15} />
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#191919] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="mb-14 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E86B42]">
              What We Believe
            </span>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              More than a marketplace.
              <span className="text-[#E86B42]"> A creative community.</span>
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div key={value.title}>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#E86B42]">
                    <Icon size={23} />
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand px-7 py-16 text-center text-white sm:px-14 sm:py-20">

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            Your Next Creative Journey
          </span>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Have a space to share or an idea to create?
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-7 text-white/80">
            Be part of a growing creative ecosystem. Discover a space,
            share your studio, and make something extraordinary.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/studios"
              className="!bg-white !text-brand inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition hover:!bg-gray-100"
            >
              Find a Studio
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Get Started
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}

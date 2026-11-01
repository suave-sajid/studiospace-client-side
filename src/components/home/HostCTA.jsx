import Link from "next/link";
import {
  ArrowRight,
  Aperture,
  CheckCircle2,
} from "lucide-react";

const benefits = [
  "Reach creators looking for creative spaces",
  "Manage your studio listings in one place",
  "Receive and manage booking requests",
];

export default function HostCTA() {
  return (
    <section className="bg-canvas px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-20">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-10 -top-20 size-72 rounded-full border border-white/10" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">

            {/* Content */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-white/70">
                <Aperture size={16} className="text-brand" />
                FOR STUDIO OWNERS
              </div>

              <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Your space has
                <br />
                <span className="text-brand">a story to tell.</span>
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
                Turn your creative space into an opportunity.
                Connect with creators, showcase your studio,
                and grow your rental business.
              </p>

              <Link
                href="/add-studio"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                List your studio
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm sm:p-9">
              <p className="mb-7 text-sm font-semibold tracking-wide text-white/50">
                WHY HOST WITH STUDIOSPACE
              </p>

              <div className="space-y-7">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-4">
                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0 text-brand"
                    />

                    <p className="text-sm leading-6 text-white/85">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 border-t border-white/10 pt-6">
                <p className="text-xs leading-6 text-white/45">
                  Create your listing and introduce your space
                  to the creative community.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
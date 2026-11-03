
import Link from "next/link";
import {
  Search,
  CalendarCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import ProcessStep from "./ProcessStep";

const steps = [
  {
    number: "01",
    title: "Discover your space",
    description:
      "Explore creative studios and find the perfect environment for your project.",
    icon: Search,
  },
  {
    number: "02",
    title: "Book your session",
    description:
      "Choose your preferred date and time, review the details, and request your booking.",
    icon: CalendarCheck,
  },
  {
    number: "03",
    title: "Create something amazing",
    description:
      "Show up, bring your ideas, and turn your creative vision into reality.",
    icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-border bg-canvas py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-brand">
            SIMPLE PROCESS
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            From idea to creation.
            <br />
            <span className="text-brand">Three simple steps.</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-muted sm:text-base">
            Finding and booking your next creative space should
            be simple. We make the process effortless.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.number}
              {...step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-7 py-4 text-sm font-semibold text-white transition hover:bg-brand"
          >
            Find your space
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

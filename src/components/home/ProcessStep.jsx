import { ArrowRight } from "lucide-react";

export default function ProcessStep({
  number,
  icon: Icon,
  title,
  description,
  isLast = false,
}) {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Icon */}
      <div className="relative flex size-20 items-center justify-center rounded-2xl border border-border bg-white text-brand shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <Icon size={30} strokeWidth={1.6} />
      </div>

      {/* Step Number */}
      <span className="mt-5 text-xs font-bold tracking-[0.2em] text-brand">
        STEP {number}
      </span>

      {/* Content */}
      <h3 className="mt-3 text-lg font-bold text-ink">
        {title}
      </h3>

      <p className="mt-3 max-w-xs text-sm leading-7 text-muted">
        {description}
      </p>

      {/* Connector */}
      {!isLast && (
        <div className="absolute left-[calc(100%+0.5rem)] top-10 hidden -translate-x-1/2 text-border lg:block">
          <ArrowRight size={22} />
        </div>
      )}
    </div>
  );
}
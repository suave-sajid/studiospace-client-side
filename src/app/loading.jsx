import { Aperture, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#F7F5F0] px-5">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#DCE7DF]/60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#E86B42]/10 blur-3xl" />

      {/* Loading content */}
      <div className="relative flex w-full max-w-sm flex-col items-center text-center">

        {/* Logo */}
        <div className="mb-10 flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E86B42] text-white shadow-lg shadow-[#E86B42]/20">
            <Aperture size={25} strokeWidth={1.8} />
          </div>

          <span className="text-xl font-bold tracking-tight text-[#191919]">
            Studio<span className="text-[#E86B42]">Space</span>
          </span>
        </div>

        {/* Animated aperture */}
        <div className="relative mb-9 flex h-28 w-28 items-center justify-center">

          <div className="absolute inset-0 rounded-full border border-[#E5E1D8]" />

          <div className="absolute inset-2 animate-spin rounded-full border-[3px] border-transparent border-t-[#E86B42] border-r-[#E86B42]/30" />

          <div className="absolute inset-5 animate-[spin_5s_linear_infinite_reverse] rounded-full border-2 border-dashed border-[#D7D2C8]" />

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#E86B42] shadow-sm">
            <Aperture size={34} strokeWidth={1.5} />
          </div>

          <Sparkles
            size={16}
            className="absolute -right-1 top-2 animate-pulse text-[#E86B42]"
          />
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold tracking-tight text-[#191919]">
          Preparing your creative space
        </h2>

        <p className="mt-2 max-w-xs text-sm leading-6 text-[#6B6B63]">
          Just a moment. We're getting everything ready for you.
        </p>

        {/* Progress animation */}
        <div className="mt-8 h-1 w-44 overflow-hidden rounded-full bg-[#E5E1D8]">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-[#E86B42]" />
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A09B91]">
          Discover · Create · Inspire
        </p>

      </div>

      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>

    </main>
  );
}
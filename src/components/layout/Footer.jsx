import Link from "next/link";
import { Aperture } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 sm:flex-row sm:items-center lg:px-8">

        <div>
          <Link href="/" className="flex items-center gap-2">
            <Aperture size={25} />

            <span className="text-lg font-bold">
              StudioSpace<span className="text-brand">.</span>
            </span>
          </Link>

          <p className="mt-3 text-xs text-white/50">
            Space to create. Freedom to produce.
          </p>
        </div>

        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} StudioSpace. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
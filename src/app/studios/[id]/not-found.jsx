import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function StudioNotFound() {
  return (
    <>
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage">
            <SearchX size={38} className="text-brand" />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">
            Studio not found
          </p>

          <h1 className="text-3xl font-bold text-ink sm:text-4xl">
            This creative space doesn't exist.
          </h1>

          <p className="mt-4 leading-7 text-muted">
            The studio may have been removed, or the link may be incorrect.
            Explore our available creative spaces to find another one.
          </p>

          <Link
            href="/studios"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
          >
            <ArrowLeft size={18} />
            Explore studios
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
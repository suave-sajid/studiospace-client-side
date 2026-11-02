
import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="max-w-md text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-sage">
          <SearchX size={30} className="text-brand" />
        </div>

        <p className="mt-6 text-sm font-semibold tracking-widest text-brand">
          ERROR 404
        </p>

        <h1 className="mt-3 text-3xl font-semibold">
          Space not found
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-white hover:bg-brand-dark"
          >
            Back to Home
          </Link>

          <Link
            href="/studios"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-canvas"
          >
            Explore Studios
          </Link>
        </div>
      </div>
    </main>
  );
}


"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <div className="max-w-md text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-50 text-xl text-red-600">
          !
        </div>

        <h1 className="mt-5 text-2xl font-semibold">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          We couldn't load this page. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-dark"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}

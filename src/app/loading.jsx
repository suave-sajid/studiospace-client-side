
export default function Loading() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-6xl px-6 py-16">
      <div className="animate-pulse">
        <div className="mb-3 h-3 w-28 rounded bg-border" />
        <div className="h-9 w-64 rounded bg-border" />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="aspect-[4/3] bg-border" />
              <div className="space-y-3 p-5">
                <div className="h-4 w-3/4 rounded bg-border" />
                <div className="h-3 w-1/2 rounded bg-border" />
                <div className="h-5 w-1/3 rounded bg-border" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

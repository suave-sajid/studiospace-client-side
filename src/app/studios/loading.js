
export default function Loading() {
  return (
    <main className="min-h-screen bg-canvas px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-4 h-4 w-40 rounded bg-border" />
        <div className="mb-4 h-10 w-80 rounded bg-border" />
        <div className="mb-10 h-5 max-w-xl rounded bg-border" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="aspect-[4/3] bg-border" />
              <div className="space-y-3 p-5">
                <div className="h-4 w-2/3 rounded bg-border" />
                <div className="h-4 w-full rounded bg-border" />
                <div className="h-4 w-1/3 rounded bg-border" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

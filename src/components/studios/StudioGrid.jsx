
import StudioCard from "@/components/home/StudioCard";

export default function StudioGrid({ studios = [] }) {
  if (studios.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
        <h3 className="text-xl font-semibold text-ink">
          No studios found
        </h3>
        <p className="mt-2 text-sm text-muted">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studios.map((studio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
}

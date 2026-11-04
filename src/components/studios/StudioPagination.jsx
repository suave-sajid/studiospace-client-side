
import Link from "next/link";

export default function StudioPagination({ pagination, searchParams = {} }) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  function getPageUrl(page) {
    const query = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        query.set(key, String(value));
      }
    });

    query.set("page", String(page));

    return `/studios?${query.toString()}`;
  }

  const { page, totalPages } = pagination;

  return (
    <nav
      aria-label="Studio pagination"
      className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row"
    >
      <p className="text-sm text-muted">
        Page <span className="font-semibold text-ink">{page}</span> of{" "}
        <span className="font-semibold text-ink">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        {page > 1 ? (
          <Link
            href={getPageUrl(page - 1)}
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-canvas"
          >
            Previous
          </Link>
        ) : (
          <span className="cursor-not-allowed rounded-xl border border-border px-4 py-2.5 text-sm text-muted opacity-50">
            Previous
          </span>
        )}

        <span className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-canvas">
          {page}
        </span>

        {page < totalPages ? (
          <Link
            href={getPageUrl(page + 1)}
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-canvas"
          >
            Next
          </Link>
        ) : (
          <span className="cursor-not-allowed rounded-xl border border-border px-4 py-2.5 text-sm text-muted opacity-50">
            Next
          </span>
        )}
      </div>
    </nav>
  );
}

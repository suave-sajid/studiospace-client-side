import StudioCard from "./StudioCard";

async function getFeaturedStudios() {
  const apiUrl = process.env.API_URL || "http://localhost:5000";

  const response = await fetch(`${apiUrl}/api/studios/featured`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch studios: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Could not retrieve studios");
  }

  return Array.isArray(result.data) ? result.data : [];
}

export default async function FeaturedStudioList() {
  let studios = [];

  try {
    studios = await getFeaturedStudios();
  } catch (error) {
    console.error("Featured studios error:", error);

    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        Unable to load studios right now. Please try again later.
      </div>
    );
  }

  if (studios.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white px-6 py-16 text-center">
        <h3 className="text-xl font-bold text-ink">
          No studios available yet
        </h3>

        <p className="mt-3 text-sm text-muted">
          We are preparing creative spaces for you. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studios.map((studio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
}
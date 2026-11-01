import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Star,
  Users,
  CheckCircle2,
} from "lucide-react";
import StudioGallery from "@/components/studios/StudioGallary";


async function getStudio(id) {
  try {
    const API_URL = process.env.API_URL || "http://localhost:5000";

    const response = await fetch(
      `${API_URL}/api/studios/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;

    const result = await response.json();

    if (!result.success || !result.data) return null;

    return result.data;
  } catch (error) {
    console.error("Failed to fetch studio:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const studio = await getStudio(id);

  if (!studio) {
    return {
      title: "Studio Not Found",
    };
  }

  return {
    title: studio.title,
    description: studio.overview,
    openGraph: {
      title: `${studio.title} | StudioSpace`,
      description: studio.overview,
      images: studio.image ? [studio.image] : [],
    },
  };
}

export default async function StudioDetailsPage({ params }) {
  const { id } = await params;
  const studio = await getStudio(id);

  if (!studio) {
    notFound();
  }

  return (
    <>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link
          href="/studios"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand"
        >
          <ArrowLeft size={17} />
          Back to studios
        </Link>

        {/* Studio Heading */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-block rounded-full bg-sage px-3 py-1 text-xs font-semibold text-ink">
              {studio.category}
            </span>

            <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {studio.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {studio.location?.address}, {studio.location?.city}
              </span>

              <span className="flex items-center gap-1">
                <Star size={16} className="fill-brand text-brand" />
                {studio.rating > 0
                  ? `${studio.rating} (${studio.reviewCount} reviews)`
                  : "New studio"}
              </span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <StudioGallery
          image={studio.image}
          gallery={studio.gallery}
          title={studio.title}
        />

        {/* Details + Booking Layout */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main Information */}
          <div className="space-y-8 lg:col-span-2">
            {/* Capacity */}
            <section className="border-b border-border pb-7">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-sage p-3">
                  <Users size={22} />
                </div>

                <div>
                  <h2 className="font-semibold text-ink">
                    Space capacity
                  </h2>
                  <p className="text-sm text-muted">
                    Accommodates up to {studio.maxCapacity} people
                  </p>
                </div>
              </div>
            </section>

            {/* Overview */}
            <section className="border-b border-border pb-7">
              <h2 className="mb-4 text-xl font-bold text-ink">
                About this space
              </h2>

              <p className="leading-8 text-muted">
                {studio.overview}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="mb-5 text-xl font-bold text-ink">
                What this space offers
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {studio.amenities?.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 text-sm text-ink"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-brand"
                    />
                    {amenity}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Card */}
          <aside className="h-fit rounded-2xl border border-border bg-surface p-6 shadow-sm lg:sticky lg:top-24">
            <div className="mb-5">
              <span className="text-3xl font-bold text-ink">
                ${studio.hourlyRate}
              </span>
              <span className="text-sm text-muted"> / hour</span>
            </div>

            <div className="space-y-4 border-y border-border py-5">
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-muted">Hourly rate</span>
                <span className="font-semibold text-ink">
                  ${studio.hourlyRate}
                </span>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-muted">Security deposit</span>
                <span className="font-semibold text-ink">
                  ${studio.securityDeposit}
                </span>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-muted">Maximum capacity</span>
                <span className="font-semibold text-ink">
                  {studio.maxCapacity} people
                </span>
              </div>
            </div>

            <button
              disabled
              className="mt-6 w-full cursor-not-allowed rounded-xl bg-brand px-5 py-3 font-semibold text-white opacity-60"
            >
              Booking coming soon
            </button>

            <p className="mt-3 text-center text-xs text-muted">
              Booking functionality will be implemented in the next lessons.
            </p>
          </aside>
        </div>
      </main>

      
    </>
  );
}
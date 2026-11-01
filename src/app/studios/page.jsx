
import Link from "next/link";
import StudioGrid from "@/components/studios/StudioGrid";
import StudioFilters from "@/components/studios/StudioFilters";
import StudioPagination from "@/components/studios/StudioPagination";

async function getStudios(params) {
    const query = new URLSearchParams();

    query.set("page", params.page || "1");
    query.set("limit", "9");

    if (params.search) query.set("search", params.search);
    if (params.category) query.set("category", params.category);
    if (params.city) query.set("city", params.city);
    if (params.minPrice) query.set("minPrice", params.minPrice);
    if (params.maxPrice) query.set("maxPrice", params.maxPrice);
    if (params.sort) query.set("sort", params.sort);

    const apiUrl = process.env.API_URL || "http://localhost:5000";

    try {
        const response = await fetch(
            `${apiUrl}/api/studios?${query.toString()}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch studios");
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Unable to load studios");
        }

        return result;
    } catch (error) {
        console.error("Studio fetch error:", error);
        return null;
    }
}

export default async function StudiosPage({ searchParams }) {
    const params = await searchParams;
    const result = await getStudios(params);

    const studios = result?.data || [];
    const pagination = result?.pagination;

    return (
        <>


            <main className="min-h-screen flex-1 bg-canvas">
                <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
                    <div className="mb-10">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">
                            Explore StudioSpace
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                            Find your creative space
                        </h1>

                        <p className="mt-3 max-w-2xl text-muted">
                            Discover inspiring spaces for photography, filmmaking,
                            podcasting, music production and creative workshops.
                        </p>
                    </div>

                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-muted">
                            {pagination?.total ?? 0} studios available
                        </p>

                        <Link
                            href="/"
                            className="text-sm font-medium text-brand hover:text-brand-dark"
                        >
                            Back to home
                        </Link>
                    </div>

                    {result ? (<>
                        <StudioFilters initialFilters={params} />
                        <StudioGrid studios={studios} />
                    </>
                    ) : (
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="font-semibold text-ink">
                                    {pagination?.total ?? 0} creative spaces
                                </p>

                                <p className="mt-1 text-sm text-muted">
                                    Explore spaces that match your creative needs.
                                </p>
                            </div>

                            <span className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-muted">
                                {params.category || "All categories"}
                            </span>
                        </div>
                    )}

                    <StudioPagination
                        pagination={pagination}
                        searchParams={params}
                    />
                </section>
            </main>


        </>
    );
}

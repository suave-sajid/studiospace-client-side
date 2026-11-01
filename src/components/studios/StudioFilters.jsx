
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

export default function StudioFilters({ initialFilters = {} }) {
  const router = useRouter();

  const [search, setSearch] = useState(initialFilters.search || "");
  const [category, setCategory] = useState(initialFilters.category || "");
  const [city, setCity] = useState(initialFilters.city || "");
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || "");
  const [sort, setSort] = useState(initialFilters.sort || "newest");

  function handleSubmit(event) {
    event.preventDefault();

    const query = new URLSearchParams();

    if (search.trim()) query.set("search", search.trim());
    if (category) query.set("category", category);
    if (city.trim()) query.set("city", city.trim());
    if (minPrice) query.set("minPrice", minPrice);
    if (maxPrice) query.set("maxPrice", maxPrice);
    if (sort !== "newest") query.set("sort", sort);

    // প্রতিটি নতুন filter থেকে প্রথম page শুরু হবে
    query.set("page", "1");

    router.push(`/studios?${query.toString()}`);
  }

  function handleReset() {
    setSearch("");
    setCategory("");
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");

    router.push("/studios");
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-canvas px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/10";

  return (
    <form
      onSubmit={handleSubmit}
     className="mb-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-brand" />
          <h2 className="font-semibold text-ink">Find your studio</h2>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark sm:w-auto"
        >
          <RotateCcw size={15} />
          Clear filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label
            htmlFor="studio-search"
            className="text-sm font-medium text-ink"
          >
            Search
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              id="studio-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Studio name or keyword"
              className={`${inputClass} pl-11`}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="studio-category"
            className="text-sm font-medium text-ink"
          >
            Category
          </label>

          <select
            id="studio-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={inputClass}
          >
            <option value="">All categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="studio-city"
            className="text-sm font-medium text-ink"
          >
            City
          </label>

          <input
            id="studio-city"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="e.g. Chattogram"
            className={inputClass}
          />
        </div>

        {/* Minimum price */}
        <div>
          <label
            htmlFor="min-price"
            className="text-sm font-medium text-ink"
          >
            Minimum hourly price (৳)
          </label>

          <input
            id="min-price"
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder="Minimum price"
            className={inputClass}
          />
        </div>

        {/* Maximum price */}
        <div>
          <label
            htmlFor="max-price"
            className="text-sm font-medium text-ink"
          >
            Maximum hourly price (৳)
          </label>

          <input
            id="max-price"
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="Maximum price"
            className={inputClass}
          />
        </div>

        {/* Sorting */}
        <div>
          <label
            htmlFor="studio-sort"
            className="text-sm font-medium text-ink"
          >
            Sort by
          </label>

          <select
            id="studio-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className={inputClass}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="price_low">Price: Low to high</option>
            <option value="price_high">Price: High to low</option>
            <option value="rating">Highest rated</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          <Search size={16} />
          Apply filters
        </button>
      </div>
    </form>
  );
}

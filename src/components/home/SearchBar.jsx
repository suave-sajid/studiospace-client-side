import Link from "next/link";
import { Search, MapPin, ArrowRight } from "lucide-react";

export default function SearchBar() {
  return (
    <form
      action="/studios"
      className="flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-border bg-white p-3 shadow-lg shadow-black/5 sm:flex-row sm:items-center"
    >
      {/* Search input */}
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
        <Search size={21} className="shrink-0 text-muted" />

        <input
          type="text"
          name="search"
          placeholder="What space are you looking for?"
          className="min-w-0 w-full bg-transparent py-3 text-sm text-ink outline-none placeholder:text-muted"
        />
      </div>

      {/* Location */}
      <div className="hidden items-center gap-2 border-l border-border px-4 md:flex">
        <MapPin size={18} className="text-muted" />

        <input
          type="text"
          name="city"
          placeholder="Location"
          className="w-24 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        />
      </div>

      {/* Search button */}
      <button
        type="submit"
        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        Search
        <ArrowRight size={17} />
      </button>
    </form>
  );
}
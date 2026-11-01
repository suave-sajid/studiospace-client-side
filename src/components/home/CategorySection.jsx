import Link from "next/link";
import {
  Camera,
  Film,
  Mic2,
  Music2,
  Palette,
  ArrowRight,
} from "lucide-react";

import CategoryCard from "./CategoryCard";

const categories = [
  {
    id: 1,
    title: "Photography",
    description: "Professional spaces for every frame",
    category: "Photo Studio",
    icon: Camera,
  },
  {
    id: 2,
    title: "Film & Video",
    description: "Bring your visual stories to life",
    category: "Film Stage",
    icon: Film,
  },
  {
    id: 3,
    title: "Podcast",
    description: "Spaces where your voice matters",
    category: "Podcast Lounge",
    icon: Mic2,
  },
  {
    id: 4,
    title: "Music",
    description: "Create and record your next sound",
    category: "Music Suite",
    icon: Music2,
  },
  {
    id: 5,
    title: "Creative Workshop",
    description: "Room for ideas and collaboration",
    category: "Workshop",
    icon: Palette,
  },
];

export default function CategorySection() {
  return (
    <section
      id="categories"
      className="border-t border-border bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-brand">
              EXPLORE BY CATEGORY
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Find the right creative space.
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              Whatever you create, there is a space for it.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-brand"
          >
            View all spaces
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              description={category.description}
              category={category.category}
              icon={category.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
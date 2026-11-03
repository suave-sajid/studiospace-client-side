
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CategoryCard({
  title,
  description,
  icon: Icon,
  category,
}) {
  return (
    <Link
      href={`/studios?category=${encodeURIComponent(category)}`}
      className="group rounded-2xl border border-border bg-canvas p-6 transition duration-300 hover:-translate-y-1 hover:border-brand hover:bg-surface hover:shadow-lg"
    >
      {/* Icon */}
      <div className="mb-8 flex size-12 items-center justify-center rounded-xl bg-sage text-ink transition duration-300 group-hover:bg-brand group-hover:text-white">
        <Icon size={23} strokeWidth={1.8} />
      </div>

      {/* Content */}
      <h3 className="font-bold tracking-tight text-ink">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-muted">
        {description}
      </p>

      {/* Arrow */}
      <div className="mt-5 flex justify-end">
        <ArrowUpRight
          size={19}
          className="text-muted transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand"
        />
      </div>
    </Link>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CategoryMeta } from "@/lib/categories";

export function CategoryCard({
  category,
  count,
}: {
  category: CategoryMeta;
  count?: number;
}) {
  const Icon = category.icon;
  return (
    <Link
      href={category.href}
      className="group flex h-full flex-col rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-card-hover"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-navy-700 transition-colors group-hover:bg-teal-50 group-hover:text-teal-700">
        <Icon className="h-5.5 w-5.5" strokeWidth={1.75} />
      </span>

      <h3 className="mt-4 flex items-center gap-2 text-base font-semibold text-navy-900">
        {category.name}
        {typeof count === "number" && count > 0 && (
          <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-500">
            {count}
          </span>
        )}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500">
        {category.description}
      </p>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
        Browse
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

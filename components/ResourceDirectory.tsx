"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, FolderSearch } from "lucide-react";
import { ResourceCard } from "@/components/ResourceCard";
import { resources } from "@/lib/data";
import { DIRECTORY_CATEGORIES } from "@/lib/categories";
import type { Resource } from "@/lib/types";

type Sort = "az" | "za" | "category";

function matchesQuery(r: Resource, q: string): boolean {
  if (!q) return true;
  const hay = [
    r.name,
    r.description,
    r.organization,
    r.categories.join(" "),
    r.rawCategories.join(" "),
  ]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((term) => hay.includes(term));
}

export function ResourceDirectory() {
  const params = useSearchParams();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [noHomeOnly, setNoHomeOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("az");

  // Seed state from URL params (links from homepage / category cards).
  useEffect(() => {
    setQuery(params.get("q") ?? "");
    setCategory(params.get("category") ?? "");
    setNoHomeOnly(params.get("nohome") === "1");
  }, [params]);

  const filtered = useMemo(() => {
    let list = resources.filter((r) => {
      if (!matchesQuery(r, query)) return false;
      if (category && !r.categories.includes(category)) return false;
      if (
        noHomeOnly &&
        !(r.noHomeStatus === "yes" || r.noHomeStatus === "encouraged")
      )
        return false;
      return true;
    });

    list = [...list];
    if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "za") list.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "category")
      list.sort(
        (a, b) =>
          (a.categories[0] ?? "").localeCompare(b.categories[0] ?? "") ||
          a.name.localeCompare(b.name)
      );
    return list;
  }, [query, category, noHomeOnly, sort]);

  const hasFilters = Boolean(query || category || noHomeOnly);

  function clearAll() {
    setQuery("");
    setCategory("");
    setNoHomeOnly(false);
  }

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, description, organization, or category..."
          className="w-full rounded-xl border border-navy-200 bg-white py-3.5 pl-12 pr-10 text-sm text-navy-900 shadow-card placeholder:text-navy-400 focus:border-teal-400"
          aria-label="Search resources"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-navy-400 hover:bg-navy-50 hover:text-navy-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border border-navy-100 bg-navy-50/40 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-navy-700">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex flex-col gap-1 text-xs font-medium text-navy-500">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="min-w-[200px] rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 focus:border-teal-400"
            >
              <option value="">All categories</option>
              {DIRECTORY_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-xs font-medium text-navy-500">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="min-w-[150px] rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 focus:border-teal-400"
            >
              <option value="az">Name (A to Z)</option>
              <option value="za">Name (Z to A)</option>
              <option value="category">Category</option>
            </select>
          </label>

          <label className="mt-5 flex cursor-pointer items-center gap-2 text-sm text-navy-700">
            <input
              type="checkbox"
              checked={noHomeOnly}
              onChange={(e) => setNoHomeOnly(e.target.checked)}
              className="h-4 w-4 rounded border-navy-300 text-teal-600 focus:ring-teal-400"
            />
            No home program resources only
          </label>

          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Count */}
      <p className="mb-4 text-sm text-navy-500">
        Showing{" "}
        <span className="font-semibold text-navy-800">{filtered.length}</span>{" "}
        of {resources.length} resources
      </p>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-navy-200 bg-navy-50/40 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy-400 shadow-card">
            <FolderSearch className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-base font-semibold text-navy-800">
            No resources match your filters
          </h3>
          <p className="mt-1 max-w-sm text-sm text-navy-500">
            Try removing a filter or searching for a broader term.
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

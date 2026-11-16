"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    router.push(
      trimmed ? `/resources?q=${encodeURIComponent(trimmed)}` : "/resources"
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 flex w-full gap-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search neurosurgery resources..."
          className="w-full rounded-xl border border-navy-200 bg-white py-3.5 pl-12 pr-4 text-sm text-navy-900 shadow-card placeholder:text-navy-400 focus:border-teal-400"
          aria-label="Search neurosurgery resources"
        />
      </div>
      <button
        type="submit"
        className="rounded-xl bg-teal-600 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
      >
        Search
      </button>
    </form>
  );
}

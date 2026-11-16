"use client";

import { useMemo, useState } from "react";
import {
  Search,
  X,
  ArrowUpRight,
  Mail,
  CheckCircle2,
  HelpCircle,
  Compass,
} from "lucide-react";
import { programs } from "@/lib/data";
import type { Program } from "@/lib/types";

type Tab = "identified" | "not-documented" | "all";

function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-200 hover:border-teal-200 hover:shadow-card-hover">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-navy-900">
          {program.name}
        </h3>
        {program.builtForNoHome && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700 ring-1 ring-teal-200">
            <Compass className="h-3 w-3" />
            No home
          </span>
        )}
      </div>

      {program.hasFellowship ? (
        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Research opportunity identified
        </span>
      ) : (
        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-500">
          <HelpCircle className="h-3.5 w-3.5" />
          No opportunity documented
        </span>
      )}

      {program.fellowshipName && (
        <p className="text-sm font-medium text-navy-700">
          {program.fellowshipName}
        </p>
      )}

      {program.description ? (
        <p className="mt-2 text-sm leading-relaxed text-navy-500">
          {program.description}
        </p>
      ) : (
        !program.hasFellowship && (
          <p className="mt-2 text-sm leading-relaxed text-navy-400">
            We did not document a specific medical-student research fellowship
            for this program. That does not mean none exists. Contact the
            department directly to ask about research opportunities.
          </p>
        )
      )}

      {program.requirements && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">
            Eligibility &amp; application
          </p>
          <p className="mt-1 text-sm leading-relaxed text-navy-600">
            {program.requirements}
          </p>
        </div>
      )}

      {(program.link || program.requirementLink) && (
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-navy-50 pt-4">
          {program.link && (
            <a
              href={program.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy-700 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800"
            >
              Official Resource
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {program.requirementLink && (
            <a
              href={program.requirementLink}
              className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 bg-white px-3.5 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50"
            >
              <Mail className="h-4 w-4" />
              Contact
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export function FellowshipDirectory() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("identified");

  const counts = useMemo(
    () => ({
      identified: programs.filter((p) => p.hasFellowship).length,
      notDocumented: programs.filter((p) => !p.hasFellowship).length,
    }),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programs
      .filter((p) => {
        if (tab === "identified" && !p.hasFellowship) return false;
        if (tab === "not-documented" && p.hasFellowship) return false;
        if (q && !p.name.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => {
        // Within a view, surface identified opportunities first.
        if (a.hasFellowship !== b.hasFellowship) return a.hasFellowship ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
  }, [query, tab]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "identified", label: `Identified opportunities (${counts.identified})` },
    {
      key: "not-documented",
      label: `No opportunity documented (${counts.notDocumented})`,
    },
    { key: "all", label: `All programs (${programs.length})` },
  ];

  return (
    <div>
      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search programs by name..."
          className="w-full rounded-xl border border-navy-200 bg-white py-3.5 pl-12 pr-10 text-sm text-navy-900 shadow-card placeholder:text-navy-400 focus:border-teal-400"
          aria-label="Search programs"
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

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key
                ? "bg-navy-700 text-white"
                : "border border-navy-200 bg-white text-navy-600 hover:bg-navy-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-navy-500">
        Showing{" "}
        <span className="font-semibold text-navy-800">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "program" : "programs"}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-navy-200 bg-navy-50/40 py-16 text-center text-navy-500">
          No programs match your search.
        </div>
      )}
    </div>
  );
}

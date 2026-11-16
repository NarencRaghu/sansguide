import { ArrowUpRight, Building2, KeyRound, Compass } from "lucide-react";
import type { Resource } from "@/lib/types";
import { resourceLink } from "@/lib/data";

const NO_HOME_BADGE: Record<
  Resource["noHomeStatus"],
  { label: string; className: string } | null
> = {
  yes: {
    label: "Built for students without a home program",
    className: "bg-teal-50 text-teal-700 ring-1 ring-teal-200",
  },
  encouraged: {
    label: "Students with limited access encouraged",
    className: "bg-teal-50 text-teal-700 ring-1 ring-teal-200",
  },
  general: null,
  no: null,
  unknown: null,
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const link = resourceLink(resource);
  const badge = NO_HOME_BADGE[resource.noHomeStatus];
  const linkIsPost = !resource.url && resource.postLinks.length > 0;

  return (
    <article className="group flex h-full flex-col rounded-xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-card-hover">
      <div className="mb-3 flex flex-wrap gap-1.5">
        {resource.categories.map((c) => (
          <span
            key={c}
            className="inline-flex items-center rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-600"
          >
            {c}
          </span>
        ))}
      </div>

      <h3 className="text-base font-semibold leading-snug text-navy-900">
        {resource.name}
      </h3>

      {resource.description && (
        <p className="mt-2 text-sm leading-relaxed text-navy-500">
          {resource.description}
        </p>
      )}

      <dl className="mt-4 space-y-2 text-sm">
        {resource.organization && (
          <div className="flex gap-2 text-navy-600">
            <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
            <dd>{resource.organization}</dd>
          </div>
        )}
        {resource.access && (
          <div className="flex gap-2 text-navy-600">
            <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
            <dd>{resource.access}</dd>
          </div>
        )}
      </dl>

      {badge && (
        <div className="mt-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${badge.className}`}
          >
            <Compass className="h-3.5 w-3.5" />
            {badge.label}
          </span>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-navy-50 pt-4">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-navy-700 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800"
          >
            {linkIsPost ? "View Resource Post" : "Visit Resource"}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <span className="text-xs italic text-navy-400">
            No public link available
          </span>
        )}
      </div>
    </article>
  );
}

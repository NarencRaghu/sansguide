import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { HeroSearch } from "@/components/HeroSearch";
import { CategoryCard } from "@/components/CategoryCard";
import { ResourceCard } from "@/components/ResourceCard";
import { HeroImage } from "@/components/HeroImage";
import { CATEGORIES } from "@/lib/categories";
import { resources, programs } from "@/lib/data";

const SUGGEST_FORM = "https://forms.gle/32dttZyXCsv3eSUM6";

const FEATURED_NAMES = [
  "EXPANSE",
  "Cincinnati Neurosurgery Gap Year Scholars Program",
  "NERVE",
  "The Rhoton Collection",
  "AAMC Visiting Student Learning Opportunities (VSLO)",
  "WINS Mentorship Program",
];

function categoryCount(name: string): number {
  if (name === "Research Fellowships")
    return programs.filter((p) => p.hasFellowship).length;
  if (name === "YouTube")
    return resources.filter((r) => r.categories.includes("YouTube")).length;
  return resources.filter((r) => r.categories.includes(name)).length;
}

export default function HomePage() {
  const featured = FEATURED_NAMES.map((n) =>
    resources.find((r) => r.name === n)
  ).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-navy-100">
        <HeroImage />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl">
              Welcome to SANSguide
            </h1>
            <div className="mt-5 max-w-xl space-y-4 text-pretty leading-relaxed text-navy-50/90">
              <p>
                SANSguide was created by a group of medical students at Rosalind
                Franklin University of Medicine and Science and the University
                of Illinois Chicago. We wanted to make neurosurgery resources
                easier to find, so we gathered them all in one place.
              </p>
              <p>
                We know the path to neurosurgery can feel daunting, and even
                scary at times. Keep going. You will get there, and we hope
                these resources help you along the way.
              </p>
              <p>Good luck, and we&apos;re rooting for you!</p>
            </div>

            <div className="max-w-xl">
              <HeroSearch />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-teal-700"
              >
                Explore All Resources
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={SUGGEST_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-white/25"
              >
                Suggest a Resource
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-navy-100 bg-navy-50/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              Explore by Category
            </h2>
            <p className="mt-3 text-navy-600">
              Nine focused collections to help you find exactly what you need,
              whether you&apos;re looking for a mentor, a research year, or a way
              to get into the operating room.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <CategoryCard
                key={c.slug}
                category={c}
                count={categoryCount(c.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              Featured Resources
            </h2>
            <p className="mt-3 text-navy-600">
              A few highlights from the directory, including opportunities built
              for students without a home neurosurgery program.
            </p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            View all {resources.length} resources
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import {
  Users,
  FlaskConical,
  Stethoscope,
  ClipboardCheck,
  Network,
  Heart,
  ArrowRight,
} from "lucide-react";
import { ResourceCard } from "@/components/ResourceCard";
import { resources } from "@/lib/data";
import type { Resource } from "@/lib/types";

export const metadata = {
  title: "Without a Home Program | SANSguide",
  description:
    "Resources for medical students without a home neurosurgery residency program: mentorship, research, clinical exposure, applications, and connections.",
};

interface Section {
  key: string;
  title: string;
  blurb: string;
  icon: typeof Users;
  categories: string[];
}

const SECTIONS: Section[] = [
  {
    key: "mentorship",
    title: "Finding mentorship",
    blurb:
      "Programs that pair you with neurosurgery mentors when your school has no faculty to connect you.",
    icon: Users,
    categories: ["Mentorship & Networking"],
  },
  {
    key: "research",
    title: "Finding research opportunities",
    blurb:
      "Summer programs, research years, and collaborative teams that welcome students from any institution.",
    icon: FlaskConical,
    categories: ["Research Opportunities"],
  },
  {
    key: "clinical",
    title: "Getting clinical exposure",
    blurb:
      "Away rotations, sub-internships, bootcamps, and virtual experiences to see neurosurgery first-hand.",
    icon: Stethoscope,
    categories: ["Clinical Exposure"],
  },
  {
    key: "applications",
    title: "Preparing for residency applications",
    blurb:
      "Match data, application timelines, and specialty-specific guidance to help you apply competitively.",
    icon: ClipboardCheck,
    categories: ["Application & Match Guidance"],
  },
  {
    key: "connections",
    title: "Building professional connections",
    blurb:
      "Interest groups, societies, and communities where you can meet students, residents, and attendings.",
    icon: Network,
    categories: ["Community", "Mentorship & Networking"],
  },
];

function isBuiltForNoHome(r: Resource) {
  return r.noHomeStatus === "yes" || r.noHomeStatus === "encouraged";
}

function sectionResources(section: Section) {
  const list = resources.filter((r) =>
    r.categories.some((c) => section.categories.includes(c))
  );
  const specific = list.filter(isBuiltForNoHome);
  const general = list.filter((r) => !isBuiltForNoHome(r));
  return { specific, general };
}

export default function NoHomeProgramPage() {
  const specificCount = resources.filter(isBuiltForNoHome).length;

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-navy-100 bg-gradient-to-b from-teal-50/60 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-medium text-teal-700 shadow-card">
            <Heart className="h-3.5 w-3.5" />
            You belong in neurosurgery
          </span>
          <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Without a Home Program
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-navy-500">
            Not having a neurosurgery department at your school makes the path
            harder, not impossible. These resources exist to help you find
            mentorship, research, clinical exposure, and the connections you
            need to apply with confidence.
          </p>
          <p className="mt-4 text-sm text-navy-500">
            <span className="font-semibold text-teal-700">{specificCount}</span>{" "}
            resources in our directory are built specifically for students in
            your situation.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8">
        {SECTIONS.map((section) => {
          const { specific, general } = sectionResources(section);
          const Icon = section.icon;
          if (specific.length === 0 && general.length === 0) return null;
          return (
            <section key={section.key} id={section.key}>
              <div className="mb-6 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                  <Icon className="h-5.5 w-5.5" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
                    {section.title}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-navy-500">
                    {section.blurb}
                  </p>
                </div>
              </div>

              {specific.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal-700">
                    Built for students without a home program
                  </h3>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {specific.map((r) => (
                      <ResourceCard key={r.id} resource={r} />
                    ))}
                  </div>
                </div>
              )}

              {general.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-navy-400">
                    Open to all students
                  </h3>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {general.map((r) => (
                      <ResourceCard key={r.id} resource={r} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}

        <div className="rounded-xl border border-navy-100 bg-navy-50/50 p-8 text-center">
          <h2 className="text-lg font-semibold text-navy-900">
            Looking for a research year?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-navy-500">
            Several institutions offer dedicated research fellowships, some
            created specifically for students without a home neurosurgery
            program.
          </p>
          <Link
            href="/research-fellowships"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-navy-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            Browse Research Fellowships
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

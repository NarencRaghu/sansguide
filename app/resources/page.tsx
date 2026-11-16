import { Suspense } from "react";
import { ResourceDirectory } from "@/components/ResourceDirectory";

export const metadata = {
  title: "Explore Resources | SANSguide",
  description:
    "Search and filter the full directory of neurosurgery resources for medical students.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-wider text-teal-700">
          Student Access to NeuroSurgery
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
          Resource Directory
        </h1>
        <p className="mt-3 text-navy-600">
          Every resource we collected, in one searchable place. Filter by
          category, highlight opportunities for students without a home
          program, and sort to find what fits.
        </p>
      </header>

      <Suspense fallback={<div className="py-16 text-center text-navy-400">Loading directory...</div>}>
        <ResourceDirectory />
      </Suspense>
    </div>
  );
}

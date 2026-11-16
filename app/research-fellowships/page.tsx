import { Info } from "lucide-react";
import { FellowshipDirectory } from "@/components/FellowshipDirectory";

export const metadata = {
  title: "Research Fellowships | SANSguide",
  description:
    "Neurosurgery research fellowships and research-year opportunities, organized by institution.",
};

export default function ResearchFellowshipsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
          Research Fellowships
        </h1>
        <p className="mt-3 text-navy-500">
          Neurosurgery research-year and research-fellow opportunities,
          organized by institution, with the eligibility details we were able
          to confirm.
        </p>
      </header>

      <div className="mb-8 flex gap-3 rounded-xl border border-navy-100 bg-navy-50/50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
        <p className="text-sm leading-relaxed text-navy-600">
          A program listed as{" "}
          <span className="font-medium text-navy-800">
            &ldquo;no opportunity documented&rdquo;
          </span>{" "}
          only means our search did not surface a specific medical-student
          research fellowship. It does{" "}
          <span className="font-medium text-navy-800">not</span> mean the
          program has no research opportunities. Many departments offer
          mentored research on request, so always contact the department to
          confirm.
        </p>
      </div>

      <FellowshipDirectory />
    </div>
  );
}

import Link from "next/link";
import { ExternalLink } from "lucide-react";

const SUGGEST_FORM = "https://forms.gle/32dttZyXCsv3eSUM6";

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-50/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex flex-col leading-none">
              <span className="text-xl font-bold tracking-tight text-navy-800">
                SANSguide
              </span>
              <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-teal-700">
                Student Access to NeuroSurgery
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-500">
              A free, student-made collection of neurosurgery resources for
              medical students, created at Rosalind Franklin University of
              Medicine and Science and the University of Illinois Chicago.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-700">
              Explore
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-navy-500">
              <li>
                <Link href="/resources" className="hover:text-teal-700">
                  Explore Resources
                </Link>
              </li>
              <li>
                <Link href="/research-fellowships" className="hover:text-teal-700">
                  Research Fellowships
                </Link>
              </li>
              <li>
                <Link href="/no-home-program" className="hover:text-teal-700">
                  No Home Program
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-700">
                  About
                </Link>
              </li>
              <li>
                <a
                  href={SUGGEST_FORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-teal-700"
                >
                  Suggest a Resource
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-700">
              Disclaimer
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-navy-500">
              SANSguide is a student-made academic project. Listings are
              provided for informational purposes only and are not
              endorsements. Always confirm eligibility, deadlines, and current
              details on each resource&apos;s official website.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-100 pt-6 text-xs text-navy-400">
          © {new Date().getFullYear()} SANSguide · Student Access to
          NeuroSurgery
        </div>
      </div>
    </footer>
  );
}

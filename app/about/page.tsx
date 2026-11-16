import Link from "next/link";
import {
  Search,
  BookOpen,
  Instagram,
  Twitter,
  Building2,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { resources, programs } from "@/lib/data";

export const metadata = {
  title: "About | SANSguide",
  description:
    "About SANSguide (Student Access to NeuroSurgery): what it is, why it was created, and how resources were collected.",
};

const SUGGEST_FORM = "https://forms.gle/32dttZyXCsv3eSUM6";

const SOURCES = [
  { icon: Search, label: "Search engines" },
  { icon: BookOpen, label: "Academic databases" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "X" },
  { icon: Building2, label: "Neurosurgery department websites" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
          About SANSguide
        </h1>
        <p className="mt-3 text-lg text-navy-500">
          Student Access to NeuroSurgery
        </p>
      </header>

      <div className="space-y-10">
        <section>
          <p className="leading-relaxed text-navy-600">
            SANSguide is a free, student-made collection of neurosurgery
            resources for medical students. It was created by medical students
            at Rosalind Franklin University of Medicine and Science and the
            University of Illinois Chicago, and it brings together the resources
            we wish we had found sooner, all in one place.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-900">What is SANS?</h2>
          <p className="mt-3 leading-relaxed text-navy-600">
            SANS stands for Student Access to NeuroSurgery. The guide covers
            anything that can help a medical student explore and prepare for
            neurosurgery. That includes learning materials, research
            opportunities, mentorship programs, away rotations, conferences,
            scholarships, and application advice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-900">
            Why was it created?
          </h2>
          <p className="mt-3 leading-relaxed text-navy-600">
            Many medical students go to schools without a home neurosurgery
            program, including some of us who created this guide. Without
            residents, faculty, or a department down the hall, it can be hard to
            know where to start. Students end up searching through scattered
            websites, social media posts, and word of mouth. We made SANSguide
            so that no student has to start from scratch just because of where
            they go to school.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-900">Our goal</h2>
          <p className="mt-3 leading-relaxed text-navy-600">
            We want to make the path to neurosurgery more accessible for every
            medical student. That&apos;s especially true for students without a
            home program. We hope this guide helps you:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "Find opportunities to get involved early",
              "Connect with mentors and the neurosurgery community",
              "Feel more prepared and confident as you work toward residency",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-navy-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-900">
            How resources were collected
          </h2>
          <p className="mt-3 leading-relaxed text-navy-600">
            We gathered resources through a systematic search of publicly
            available sources. These included search engines, academic
            databases, social media platforms such as Instagram and X, and the
            official websites of neurosurgery departments. For each resource, we
            recorded a description, any requirements for access, and whether it
            was built specifically for students without a home neurosurgery
            program.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SOURCES.map((s) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.label}
                  className="flex items-center gap-3 rounded-lg border border-navy-100 bg-white px-4 py-3 text-sm text-navy-700 shadow-card"
                >
                  <Icon className="h-4.5 w-4.5 text-teal-600" />
                  {s.label}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-xl border border-navy-100 bg-navy-50/50 p-6">
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-navy-900">
                {resources.length}
              </p>
              <p className="mt-1 text-sm text-navy-500">curated resources</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-navy-900">
                {programs.length}
              </p>
              <p className="mt-1 text-sm text-navy-500">programs reviewed</p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-teal-200 bg-teal-50/60 p-6 text-center">
          <h2 className="text-lg font-semibold text-navy-900">
            This guide keeps growing
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-navy-600">
            If you know of a resource we missed, please share it through our
            suggestion form.
          </p>
          <a
            href={SUGGEST_FORM}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Suggest a Resource
            <ExternalLink className="h-4 w-4" />
          </a>
        </section>

        <section>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            Browse the full resource directory
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section>
          <p className="text-sm leading-relaxed text-navy-400">
            Disclaimer: SANSguide is a student-made academic project. Listings
            are provided for informational purposes only and do not constitute
            endorsements. Details change frequently, so always confirm
            eligibility, deadlines, and current information on each
            resource&apos;s official website.
          </p>
        </section>
      </div>
    </div>
  );
}

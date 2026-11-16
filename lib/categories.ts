import {
  Users,
  FlaskConical,
  Stethoscope,
  BookOpen,
  ClipboardCheck,
  MessageSquare,
  Compass,
  Youtube,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export interface CategoryMeta {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  /** Where the card links. Default directory filter; special pages for a few. */
  href: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "mentorship-networking",
    name: "Mentorship & Networking",
    description:
      "Mentorship programs and professional networking opportunities.",
    icon: Users,
    href: "/resources?category=Mentorship+%26+Networking",
  },
  {
    slug: "research-opportunities",
    name: "Research Opportunities",
    description:
      "Research programs, summer research, and other research experiences.",
    icon: FlaskConical,
    href: "/resources?category=Research+Opportunities",
  },
  {
    slug: "clinical-exposure",
    name: "Clinical Exposure",
    description:
      "Shadowing, away rotations, sub-internships, and virtual experiences.",
    icon: Stethoscope,
    href: "/resources?category=Clinical+Exposure",
  },
  {
    slug: "education",
    name: "Education",
    description:
      "Neurosurgical anatomy, operative videos, lectures, and educational platforms.",
    icon: BookOpen,
    href: "/resources?category=Education",
  },
  {
    slug: "application-match-guidance",
    name: "Application & Match Guidance",
    description:
      "Residency application advice, match guidance, and preparation resources.",
    icon: ClipboardCheck,
    href: "/resources?category=Application+%26+Match+Guidance",
  },
  {
    slug: "community",
    name: "Community",
    description:
      "Student interest groups, organizations, and online communities.",
    icon: MessageSquare,
    href: "/resources?category=Community",
  },
  {
    slug: "without-a-home-program",
    name: "Without a Home Program",
    description:
      "Resources especially useful for students without a home neurosurgery program.",
    icon: Compass,
    href: "/no-home-program",
  },
  {
    slug: "youtube",
    name: "YouTube",
    description: "Educational channels, lectures, and videos.",
    icon: Youtube,
    href: "/resources?category=YouTube",
  },
  {
    slug: "research-fellowships",
    name: "Research Fellowships",
    description: "Research-year opportunities and research fellow positions.",
    icon: GraduationCap,
    href: "/research-fellowships",
  },
];

/** Canonical category names used to populate directory filters. */
export const DIRECTORY_CATEGORIES = [
  "Mentorship & Networking",
  "Research Opportunities",
  "Clinical Exposure",
  "Education",
  "Application & Match Guidance",
  "Community",
  "Without a Home Program",
];

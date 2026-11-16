export type NoHomeStatus = "yes" | "encouraged" | "general" | "no" | "unknown";

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  access: string;
  organization: string;
  categories: string[];
  rawCategories: string[];
  noHomeStatus: NoHomeStatus;
  sources: string[];
  postLinks: string[];
}

export interface Program {
  id: string;
  name: string;
  hasFellowship: boolean;
  fellowshipName: string;
  description: string;
  link: string;
  requirements: string;
  requirementLink: string;
  builtForNoHome: boolean;
}

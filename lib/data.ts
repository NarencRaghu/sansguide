import resourcesJson from "@/data/resources.json";
import programsJson from "@/data/programs.json";
import type { Resource, Program } from "./types";

export const resources: Resource[] = resourcesJson as Resource[];
export const programs: Program[] = programsJson as Program[];

/** The best outbound link for a resource: direct URL, else a source post link. */
export function resourceLink(r: Resource): string {
  if (r.url) return r.url;
  if (r.postLinks && r.postLinks.length) return r.postLinks[0];
  return "";
}



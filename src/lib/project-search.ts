import Fuse from "fuse.js";
import type { IFuseOptions } from "fuse.js";
import type { Project } from "./types.d.ts";

const fuseOptions: IFuseOptions<Project> = {
  keys: [
    { name: "repo", weight: 2 },
    { name: "description", weight: 1.25 },
  ],
  threshold: 0.38,
  ignoreLocation: true,
  minMatchCharLength: 3,
  shouldSort: true,
};

/** Returns all projects when `query` is empty; otherwise fuzzy-matches searchable fields. */
export function filterProjectsByQuery(projects: Project[], query: string): Project[] {
  const q = query.trim();
  if (!q || projects.length === 0) return projects;

  const fuse = new Fuse(projects, fuseOptions);
  return fuse.search(q).map((r) => r.item);
}

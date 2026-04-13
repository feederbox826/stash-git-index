export const condition_map = [
  {
    name: "beta/stable",
    description: "project not labelled otherwise",
    background: "#d4edbc",
    color: "#000",
  },
  {
    name: "personal",
    description: "personal project. unsupported",
    background: "#c6dbe1",
    color: "#000",
  },
  {
    name: "wip",
    description: "work in progress. may be broken",
    background: "#b10202",
    color: "#fff",
  },
  {
    name: "unsupported",
    description: "explicitly broken in latest version of stash",
    background: "#ffe5a0",
    color: "#000",
  },
  {
    name: "archived",
    description: "archived project. unsupported and may be broken.",
    background: "#e6cff2",
    color: "#000",
  },
  {
    name: "empty",
    description: "placeholder project name",
    background: "#753800",
    color: "#fff",
  },
];

export const type_map = [
  {
    name: "other",
    description: "project doesn't fit other categories",
    background: "#11734b",
    color: "#fff"
  }, {
    name: "userscript",
    description: "in-browser modification for *monkey",
    background: "#bfe1f6",
    color: "#000"
  }, {
    name: "plugin",
    description: "plugin for stash",
    background: "#e6cff2",
    color: "#000"
  }, {
    name: "theme",
    description: "theme for stash",
    background: "#ffc8aa",
    color: "#000"
  }, {
    name: "plugin_theme",
    description: "plugin AND theme",
    background: "#ffcfc9",
    color: "#000"
  }, {
    name: "scraper",
    description: "scrapers for stash",
    background: "#a985fe",
    color: "#000"
  }, {
    name: "client",
    description: "alternative browser/display for stash",
    background: "#d4edbc",
    color: "#000"
  }, {
    name: "script",
    description: "one-off scripts for stash",
    background: "#c6dbe1",
    color: "#000"
  }, {
    name: "application",
    description: "standalone applications that work with stash",
    background: "#0a53a8",
    color: "#fff"
  }, {
    name: "packaging",
    description: "packaging for stash (e.g. docker images)",
    background: "#215a6c",
    color: "#fff"
  }, {
    name: "integration",
    description: "integrate stash into other software",
    background: "#ffe5a0",
    color: "#000"
  }, {
    name: "dependency",
    description: "used by other repositories, not to be used directly",
    background: "#473822",
    color: "#fff"
  }, {
    name: "documentation",
    description: "notes/ website/ other",
    background: "#753800",
    color: "#fff"
  }, {
    name: "empty",
    description: "placeholder project name",
    background: "#b10202",
    color: "#fff"
  }
]

/**
 * 
 * @param {string} last_commit
 * @returns {string}
 */
export const last_commit_condition = (last_commit) => {
  const date = Date.parse(last_commit);
  if (!date) return "is-link";
  const year = 1000 * 60 * 60 * 24 * 365;
  const now = Date.now();
  if (date.valueOf() > now - year) return "is-success";
  if (date.valueOf() < 1577836800000) return "is-danger";
  return "is-warning";
}

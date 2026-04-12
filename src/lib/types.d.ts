export enum condition {
  // green
  beta = 0, // actively maintained
  // blue
  personal = 1, // personal, no support
  // yellow
  wip = 2, // work in progress/ experimental
  // orange
  unsupported = 3, // explicitly unsupported, unmaintained or migrated
  // purple
  archived = 4, // explicitly archived or removed
  empty = 5 // no content
}

export enum type {
  other = 0,
  userscript = 1,
  plugin = 2,
  theme = 3,
  plugin_theme = 4,
  scraper = 5,
  client = 6,
  script = 7,
  application = 8,
  packaging = 9,
  integration = 10,
  dependency = 11,
  documentation = 12,
  empty = 13
}

export type Project = {
  repo: string,
  mirrored: boolean,
  removed: boolean,
  condition: condition,
  type: type,
  description: string | null,
  discourse_id: number | null,
  index_url: string | null,
  gist: string | null
}

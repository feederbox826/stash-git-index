<script lang="ts">
  import { onMount } from "svelte";
  import { loadDatabase, getAllProjects } from "./lib/db.js";
  import type { Project } from "./lib/types.d.ts";
  import { condition_map, type_map } from "./lib/reverse-enum.js";
  import { filterProjectsByQuery } from "./lib/project-search.js";
  import LastCommitPill from "./components/LastCommitPill.svelte";
  import RepoActions from "./components/RepoActions.svelte";
  import PluginIndexUrlCell from "./components/PluginIndexUrlCell.svelte";
  import SelectColor from "./components/SelectColor.svelte";
  import "bulma/css/bulma.min.css";
  import "./App.css";

  let projects = $state<Project[]>([]);
  let searchQuery = $state("");
  let conditionFilter = $state("");
  let typeFilter = $state("");
  let loading = $state(true);
  let error = $state<string | null>(null);

  function facetFilter(list: Project[]): Project[] {
    const c = conditionFilter === "" ? null : Number(conditionFilter);
    const t = typeFilter === "" ? null : Number(typeFilter);
    return list.filter((p) => {
      if (c !== null && p.condition !== c) return false;
      if (t !== null && p.type !== t) return false;
      return true;
    });
  }

  let filteredProjects = $derived(
    filterProjectsByQuery(facetFilter(projects), searchQuery),
  );

  const DB_URL_REMOTE = "https://raw.githubusercontent.com/feederbox826/stash-git-index/main/data/projects.sqlite";
  const DB_URL_LOCAL = `${import.meta.env.BASE_URL}data/projects.sqlite`;

  const DB_URL = import.meta.env.DEV ? DB_URL_LOCAL : DB_URL_REMOTE

  onMount(async () => {
    try {
      await loadDatabase(DB_URL);
      projects = getAllProjects() as Project[];
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Loading database...</p>
{:else if error}
  <p class="has-text-danger">Error: {error}</p>
{:else}
  <div class="projects-toolbar field is-grouped is-grouped-multiline mb-4">
    <p class="control">
      <SelectColor
        bind:value={conditionFilter}
        items={condition_map}
        allLabel="All conditions"
      />
    </p>
    <p class="control">
      <SelectColor
        bind:value={typeFilter}
        items={type_map}
        allLabel="All types"
      />
    </p>
    <p class="control is-expanded">
      <input
        class="input"
        type="search"
        placeholder="Search repo, descriptions..."
        bind:value={searchQuery}
        autocomplete="off"
        spellcheck="false"
      />
    </p>
    <p class="control">
      <span class="tag is-medium">
        {filteredProjects.length} / {projects.length}
      </span>
    </p>
  </div>

  <table class="table is-fullwidth is-striped is-hoverable ml-5">
    <thead class="is-position-sticky">
      <tr>
        <th>repository</th>
        <th>links</th>
        <th>condition</th>
        <th>type</th>
        <th>last update</th>
        <th>quick description</th>
        <th>plugin index URL</th>
      </tr>
    </thead>

    <tbody>
      {#each filteredProjects as p}
        {@const cond = condition_map[p.condition]}
        {@const types = type_map[p.type]}
        <tr>
          <td class="repo-cell is-vcentered">
            <span class="is-family-code">{p.repo}</span>
          </td>
          <td class="repo-actions-cell is-vcentered is-narrow">
            <RepoActions
              repo={p.repo}
              removed={Boolean(p.removed)}
              mirrored={Boolean(p.mirrored)}
              discourse_id={p.discourse_id}
              gist={p.gist}
            />
          </td>
          <td class="is-vcentered" title={cond?.description}>
            <span class="tag" style:background-color={cond.background} style:color={cond.color}>{cond.name}</span>
          </td>
          <td class="is-vcentered" title={types?.description}>
            <span class="tag" style:background-color={types.background} style:color={types.color}>{types.name}</span>
          </td>
          <td class="is-vcentered">
            <LastCommitPill repo={p.gist ?? p.repo} override={p.last_updated} />
          </td>
          <td class="is-vcentered">{p.description ?? ""}</td>
          <td class="plugin-index-cell is-vcentered"><PluginIndexUrlCell url={p.index_url} /></td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
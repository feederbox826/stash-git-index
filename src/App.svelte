<script lang="ts">
  import { onMount } from "svelte";
  import { loadDatabase, getAllProjects } from "./lib/db.js";
  import type { Project } from "./lib/types.d.ts";
  import { condition_map, type_map } from "./lib/reverse-enum.js";
  import LastCommitPill from "./components/LastCommitPill.svelte";
  import RepoActions from "./components/RepoActions.svelte";
  import PluginIndexUrlCell from "./components/PluginIndexUrlCell.svelte";
  import "bulma/css/bulma.min.css";
  import "./App.css";

  let projects: Project[] = [];
  let loading = true;
  let error: string | null = null;

  // const DB_URL = "https://raw.githubusercontent.com/feederbox826/stash-git-index/main/data/projects.sqlite";

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
  <p style="color:red">Error: {error}</p>
{:else}
  <table>
    <thead>
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
      {#each projects as p}
        {@const cond = condition_map[p.condition]}
        {@const types = type_map[p.type]}
        <tr>
          <td class="repo-cell">
            <span class="is-family-code">{p.repo}</span>
          </td>
          <td class="repo-actions-cell">
            <RepoActions
              repo={p.repo}
              removed={Boolean(p.removed)}
              mirrored={Boolean(p.mirrored)}
              discourse_id={p.discourse_id}
              gist={p.gist}
            />
          </td>
          <td title={cond?.description}>
            <span class="tag is-rounded" style:background-color={cond.background} style:color={cond.color}>{cond.name}</span>
          </td>
          <td title={types?.description}>
            <span class="tag is-rounded" style:background-color={types.background} style:color={types.color}>{types.name}</span>
          </td>
          <td>
            {#if p.removed}
              —
            {:else}
              <LastCommitPill repo={p.gist ?? p.repo} />
            {/if}
          </td>
          <td>{p.description ?? ""}</td>
          <td><PluginIndexUrlCell url={p.index_url} /></td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
<script lang="ts">
  import { last_commit_condition } from "../lib/reverse-enum.js";

  const lookup = (repo: string) => fetch(`https://commit.feederbox.cc/${repo}`)
    .then((res) => res.text())

  interface Props {
    repo: string;
    override: string | null;
  }

  let { repo, override }: Props = $props();
</script>
{#if override}
  <span class="tag is-rounded {last_commit_condition(override)}">{override}</span>
{:else}
  {#await lookup(repo)}
    <span>—</span>
  {:then text}
    <span class="tag {last_commit_condition(text)}">{text || "—"}</span>
  {:catch}
    —
  {/await}
{/if}
<script lang="ts">
  import { last_commit_condition } from "../lib/reverse-enum.js";

  const lookup = (repo: string) => fetch(`https://commit.feederbox.cc/${repo}`)
    .then((res) => res.text())

  interface Props {
    repo: string;
  }

  let { repo }: Props = $props();
</script>

{#await lookup(repo)}
  <span class="tag is-rounded is-light">…</span>
{:then text}
  <span class="tag is-rounded {last_commit_condition(text)}">{text || "—"}</span>
{:catch}
  —
{/await}
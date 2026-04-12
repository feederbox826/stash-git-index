<script lang="ts">
  import octocatUrl from "../assets/octocat.svg?url";
  import giteaUrl from "../assets/gitea.svg?url";
  import discourseUrl from "../assets/discourse.svg?url";

  interface Props {
    repo: string;
    removed: boolean;
    mirrored: boolean;
    discourse_id: number | null;
    gist: string | null;
  }

  let { repo, removed, mirrored, discourse_id, gist }: Props = $props();
</script>

<span class="repo-actions">
  {#if !removed}
    <a
      class="repo-icon-link icon icon--sm"
      href="{ gist ? `https://gist.github.com/${gist}` : `https://github.com/${repo}` }"
      target="_blank"
      rel="noopener noreferrer"
      title={"Open on GitHub"}
    >
      <img src={octocatUrl} width="20" height="20" alt="" />
    </a>
  {:else}
    <span title="Deleted by author">
      <span aria-hidden="true">🚫</span>
    </span>
  {/if}
  {#if mirrored}
    <a
      class="repo-icon-link icon icon--sm"
      href="https://git.feederbox.cc/{repo}"
      target="_blank"
      rel="noopener noreferrer"
      title="Open on mirror"
    >
      <img src={giteaUrl} width="20" height="20" alt="" />
    </a>
  {:else}
    <span title="Not mirrored">
      <span aria-hidden="true">🤖</span>
    </span>
  {/if}
  {#if discourse_id}
    <a
      class="repo-icon-link icon icon--sm"
      href={`https://discourse.stashapp.cc/t/${discourse_id}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Open on Discourse"
    >
      <img src={discourseUrl} width="20" height="20" alt="" />
    </a>
  {/if}
</span>

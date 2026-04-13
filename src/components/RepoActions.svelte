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

<div class="buttons are-small is-flex-wrap-nowrap">
  {#if !removed}
    <a
      class="button"
      href="{ gist ? `https://gist.github.com/${gist}` : `https://github.com/${repo}` }"
      target="_blank"
      rel="noopener noreferrer"
      title="Open on GitHub"
    >
      <span class="icon">
        <img src={octocatUrl} width="20" height="20" alt="" />
      </span>
    </a>
  {:else}
    <button type="button" class="button" disabled title="Deleted by author">
      <span class="icon">
        <span aria-hidden="true">🚫</span>
      </span>
    </button>
  {/if}
  {#if mirrored}
    <a
      class="button"
      href="https://git.feederbox.cc/{repo}"
      target="_blank"
      rel="noopener noreferrer"
      title="Open on mirror"
    >
      <span class="icon">
        <img src={giteaUrl} width="20" height="20" alt="" />
      </span>
    </a>
  {:else}
    <button type="button" class="button" disabled title="Not mirrored">
      <span class="icon">
        <span aria-hidden="true">🤖</span>
      </span>
    </button>
  {/if}
  {#if discourse_id}
    <a
      class="button"
      href={`https://discourse.stashapp.cc/t/${discourse_id}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Open on Discourse"
    >
      <span class="icon">
        <img src={discourseUrl} width="20" height="20" alt="" />
      </span>
    </a>
  {/if}
</div>
<script lang="ts">
  interface Props {
    url: string | null;
  }

  let { url }: Props = $props();

  let copied = $state(false);
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  const hasUrl = $derived(url?.length);

  async function copy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      copied = true;
      if (copyTimer) clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copied = false;
      }, 1600);
    } catch (e) {
      console.warn("clipboard", e);
    }
  }
</script>

{#if hasUrl}
  <div class="is-flex is-align-items-center" style="min-width: 0">
    <button
      type="button"
      class="button is-small is-flex-shrink-0"
      onclick={copy}
      title="Copy URL"
      aria-label="Copy plugin index URL"
    >
      {copied ? "✅" : "📋"}
    </button>
    <span
      class="is-family-code is-size-7 plugin-index-url__text"
      title={url}
    >
      {url}
    </span>
    
  </div>
{:else}
  —
{/if}

<style>
  .plugin-index-url__text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.45;
  }
</style>

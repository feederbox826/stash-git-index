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
  <span>
    {url}
    <button
      type="button"
      class="button is-small"
      onclick={copy}
      title="Copy URL"
      aria-label="Copy plugin index URL"
    >
      {copied ? "✅" : "📋"}
    </button>
  </span>
{:else}
  —
{/if}

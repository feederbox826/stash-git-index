<script lang="ts">
  interface Item {
    name: string;
    background: string;
    color: string;
    description?: string;
  }

  interface Props {
    items: Item[];
    allLabel: string;
    value?: string;
  }

  let { items, allLabel, value = $bindable("") }: Props = $props();

  let open = $state(false);
  let root = $state<HTMLDivElement | null>(null);

  const selectedIndex = $derived(
    value === "" ? null : Number(value),
  );

  const selected = $derived(
    selectedIndex !== null &&
      !Number.isNaN(selectedIndex) &&
      selectedIndex >= 0 &&
      selectedIndex < items.length
      ? items[selectedIndex]
      : null,
  );

  function pick(next: string) {
    value = next;
    open = false;
  }

  function toggle() {
    open = !open;
  }
</script>

<div class="dropdown" class:is-active={open} bind:this={root}>
  <div class="dropdown-trigger">
    <button
      type="button"
      class="button is-align-items-center"
      aria-haspopup="listbox"
      aria-expanded={open}
      onclick={(e) => {
        e.stopPropagation();
        toggle();
      }}
    >
      {#if selected}
        <span
          class="tag is-small"
          style:background-color={selected.background}
          style:color={selected.color}
          title={selected.description}
        >
          {selected.name}
        </span>
      {:else}
        <span class="has-text-weight-medium">{allLabel}</span>
      {/if}
    </button>
  </div>

  <div class="dropdown-menu" role="presentation">
    <div
      class="dropdown-content"
      role="listbox"
    >
      <button
        type="button"
        role="option"
        aria-selected={value === ""}
        class="dropdown-item"
        onclick={() => pick("")}
      >
        {allLabel}
      </button>
      {#each items as meta, i}
        <button
          type="button"
          role="option"
          aria-selected={value === String(i)}
          class="dropdown-item"
          title={meta.description}
          onclick={() => pick(String(i))}
        >
          <span
            class="tag is-small"
            style:background-color={meta.background}
            style:color={meta.color}
          >
            {meta.name}
          </span>
        </button>
      {/each}
    </div>
  </div>
</div>
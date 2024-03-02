<div class="px-3 py-2">
  {#if $$slots.heading}
	<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
    <slot name="heading" />
  </h2>
  {/if}
	<div class="space-y-1">
		<slot />
	</div>
</div>

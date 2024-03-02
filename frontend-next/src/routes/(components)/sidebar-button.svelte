<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '@/components/ui/button';

  export let href: string;

  let selected: boolean;
  $: selected = $page.url.pathname == href;
</script>

<Button variant={selected ? 'secondary' : 'ghost'} class="w-full justify-start" href={href}>
  <slot />
</Button>

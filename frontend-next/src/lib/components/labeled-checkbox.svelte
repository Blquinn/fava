<script lang="ts">
	import { cn } from '@/utils';
	import { Checkbox } from './ui/checkbox';
	import { Label } from './ui/label';

	export let checked: boolean;
	export let classes: string;
</script>

<Label
	class={cn(
		'text-sm font-medium leading-none peer-disabled:cursor-not-allowed',
		'flex items-center space-x-2 peer-disabled:opacity-70',
		classes
	)}
>
	<Checkbox bind:checked />
	<span>
		<slot />
	</span>
</Label>

<script lang="ts">
	import * as Select from '@/components/ui/select';

	export let ledgers: string[] = [
    'My Personal Ledger',
    'Example Ledger',
  ];

	let selectedLedger = ledgers[0];
</script>

<Select.Root
	portal={null}
	selected={{ value: selectedLedger, label: selectedLedger }}
	onSelectedChange={(e) => {
		selectedLedger = ledgers.find((l) => l === e?.value) || ledgers[0];
	}}
>
	<Select.Trigger
		class='flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0'
		aria-label="Select account"
	>
		<span class="pointer-events-none">
			<span class='ml-2'>
				{selectedLedger}
			</span>
		</span>
	</Select.Trigger>
	<Select.Content sameWidth={true}>
		<Select.Group>
			{#each ledgers as ledger}
				<Select.Item value={ledger} label={ledger}>
					<div
						class="[&_svg]:text-foreground flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
					>
						{ledger}
					</div>
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input hidden name="account" />
</Select.Root>

<script lang="ts">
	import PageContent from '../(components)/page-content.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Select from '$lib/components/ui/select';

	let currencies: string[] = ['USD', 'VACHR', 'IRAUSD'];
	$: selectedCurrencies = [...currencies];

	let timeIntervals = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
	let selectedInterval = 'Monthly';

	let units = ['At Cost', 'At Market Value', 'Units', 'Converted to USD'];
	let selectedUnit = 'At Cost';
</script>

<PageContent>
	<span slot="heading">Income Statement</span>

	<div class="mt-2 flex flex-col">
		<!-- Heading -->
		<div class="grid grid-cols-1 space-y-2 lg:space-y-0 lg:grid-cols-2">
      <!-- Currency selection -->
			<Select.Root
				multiple
				selected={selectedCurrencies.map((s) => {
					return { value: s, label: s };
				})}
				onSelectedChange={(s) => {
					if (s) {
						selectedCurrencies = s.map((s) => s.value);
					} else {
						selectedCurrencies = [];
					}
				}}
			>
				<Select.Trigger class="w-44">
					<Select.Value />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Currencies</Select.Label>
						{#each currencies as currency}
							<Select.Item value={currency} label={currency}>{currency}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="unit" />
			</Select.Root>

			<!-- Right side of header -->
			<div class="flex flex-row space-x-2">
				<Tabs.Root value="account" class="w-64">
					<Tabs.List class="grid w-full grid-cols-2">
						<Tabs.Trigger value="account">Stacked Bars</Tabs.Trigger>
						<Tabs.Trigger value="password">Single Bars</Tabs.Trigger>
					</Tabs.List>
				</Tabs.Root>

				<Select.Root selected={{ value: selectedUnit, label: selectedUnit }}>
					<Select.Trigger class="w-44">
						<Select.Value />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Unit</Select.Label>
							{#each units as unit}
								<Select.Item value={unit} label={unit}>{unit}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="unit" />
				</Select.Root>

				<Select.Root selected={{ value: selectedInterval, label: selectedInterval }}>
					<Select.Trigger class="w-32">
						<Select.Value />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Time Interval</Select.Label>
							{#each timeIntervals as interval}
								<Select.Item value={interval} label={interval}>{interval}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="timeInterval" />
				</Select.Root>
			</div>
		</div>

		<!-- Main Content -->
		<div class="flex-grow"></div>
	</div>
</PageContent>

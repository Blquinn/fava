<script lang="ts">
	import PageContent from '../(components)/page-content.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Select from '$lib/components/ui/select';
	import LabeledCheckbox from '@/components/labeled-checkbox.svelte';
	import { onMount } from 'svelte';
	import bb, { bar } from 'billboard.js';

	interface Currency {
		currency: string;
		selected: boolean;
	}

	let currencies: Currency[] = [
		{ currency: 'USD', selected: true },
		{ currency: 'VACHR', selected: true },
		{ currency: 'IRAUSD', selected: true }
	];

	let timeIntervals = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
	let selectedInterval = 'Monthly';

	let units = ['At Cost', 'At Market Value', 'Units', 'Converted to USD'];
	let selectedUnit = 'At Cost';

	let chartEl: HTMLElement | undefined;

	onMount(() => {
		var chart = bb.generate({
			data: {
				columns: [
					['data1', 30, 200, 100, 400, 150, 250],
					['data2', 130, 100, 140, 200, 150, 50],
					['data3', 130, -150, 200, 300, -200, 100]
				],
				type: bar(),
				groups: [['data1', 'data2', 'data3']]
			},
			title: {
				text: 'Income'
			},
			bar: {
				width: {
					ratio: 0.5
				}
			},
			bindto: chartEl
		});

		return () => chart.destroy();
	});
</script>

<PageContent>
	<span slot="heading">Income Statement</span>

	<div class="mt-2 flex flex-col">
		<div class="h-64 w-full" bind:this={chartEl}></div>
		<!-- Heading -->
		<div class="grid grid-cols-1 space-y-2 lg:grid-cols-2">
			<div class="flex flex-row">
				{#each currencies as currency}
					<LabeledCheckbox bind:checked={currency.selected} classes="mr-3">
						{currency.currency}
					</LabeledCheckbox>
				{/each}
			</div>

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

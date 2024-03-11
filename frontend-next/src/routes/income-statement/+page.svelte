<script lang="ts">
	import PageContent from '../(components)/page-content.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Select from '$lib/components/ui/select';
	import { onMount } from 'svelte';
	import bb, { bar } from 'billboard.js';
	import { timeout } from '@/utils';
	import type { IncomeStatementResponse } from './types';
  import response from './response.json';

	let chartEl: HTMLElement | undefined;
	let chart: bb.Chart | undefined;

	let currencies: string[] = ['USD', 'VACHR', 'IRAUSD'];
	$: selectedCurrencies = [...currencies];

	let timeIntervals = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
	let selectedInterval = 'Monthly';

	let units = ['At Cost', 'At Market Value', 'Units', 'Converted to USD'];
	let selectedUnit = 'At Cost';

	let chartTypes = ['Net Profit', 'Income (Monthly)', 'Expenses (Montly)', 'Income', 'Expenses'];
	let activeChartType = 'Net Profit';

	// These will be
	let chartVisualizationTypes = [
		{ value: 'stacked_bars', name: 'Stacked Bars' },
		{ value: 'single_bars', name: 'Single Bars' }
	];
	let activeChartVisualizationType = 'stacked_bars';

	const chartData: bb.Data = {
		columns: [
			['data1', 30, 200, 100, 400, 150, 250],
			['data2', 130, 100, 140, 200, 150, 50],
			['data3', 130, -150, 200, 300, -200, 100]
		],
		type: bar()
	};
	const chartGroups = [['data1', 'data2', 'data3']];

  let responsePromise: Promise<void> | undefined;
  let responseData: IncomeStatementResponse | undefined;

	onMount(() => {
    responsePromise = (async () => {
      await timeout(500);
      responseData = response as unknown as IncomeStatementResponse;
    })();

		chart = bb.generate({
			data: {
				...chartData,
				groups: chartGroups
			},
			bar: {
				width: {
					ratio: 0.5
				}
			},
			bindto: chartEl
		});

		return () => chart?.destroy();
	});

	// Handle active chart type change.
	$: if (chart) {
		chart.destroy();
		if (activeChartVisualizationType == 'stacked_bars') {
			chart = bb.generate({
				data: {
					...chartData,
					groups: chartGroups
				},
				bar: {
					width: {
						ratio: 0.5
					}
				},
				bindto: chartEl
			});
		} else {
			chart = bb.generate({
				data: {
					...chartData
				},
				bar: {
					width: {
						ratio: 0.5
					}
				},
				bindto: chartEl
			});
		}
	}
</script>

<PageContent>
	<span slot="heading">Income Statement</span>

	<div class="mt-2 flex flex-col space-y-2">
		<div class="flex w-full justify-between">
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

			<Tabs.Root
				onValueChange={(typ) => {
					if (typ) {
						activeChartType = typ;
					} else {
						activeChartType = 'Net Profit';
					}
				}}
				value={activeChartType}
			>
				<Tabs.List>
					{#each chartTypes as chartType}
						<Tabs.Trigger value={chartType}>{chartType}</Tabs.Trigger>
					{/each}
				</Tabs.List>
			</Tabs.Root>
		</div>

		<div class="h-64 w-full" bind:this={chartEl}></div>

		<!-- Right side of header -->
		<div class="flex flex-row space-x-2 self-end">
			<Tabs.Root
				onValueChange={(typ) => {
					if (typ) {
						activeChartVisualizationType = typ;
					} else {
						activeChartVisualizationType = 'stacked_bars';
					}
				}}
				value={activeChartVisualizationType}
			>
				<Tabs.List>
					{#each chartVisualizationTypes as chartType}
						<Tabs.Trigger value={chartType.value}>{chartType.name}</Tabs.Trigger>
					{/each}
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

		<!-- Main Content -->
		<div>
      {#await responsePromise}
        <span>Loading</span>
      {:then}
        <span>Loaded</span>
      {:catch error}
        <span>Failed to load data: {error}</span>
      {/await}
    </div>
	</div>
</PageContent>

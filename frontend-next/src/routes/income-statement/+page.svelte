<script lang="ts">
	import PageContent from '../(components)/page-content.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Select from '$lib/components/ui/select';
	import { onMount } from 'svelte';
	import bb, { bar } from 'billboard.js';

	let chartEl: HTMLElement | undefined;
	let chart: bb.Chart | undefined;

	let currencies: string[] = ['USD', 'VACHR', 'IRAUSD'];
	$: selectedCurrencies = [...currencies];

	let timeIntervals = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
	let selectedInterval = 'Monthly';

	let units = ['At Cost', 'At Market Value', 'Units', 'Converted to USD'];
	let selectedUnit = 'At Cost';

	let chartTypes = [
		{ value: 'stacked_bars', name: 'Stacked Bars' },
		{ value: 'single_bars', name: 'Single Bars' }
	];
	let activeChartType = 'stacked_bars';

	const chartData: bb.Data = {
		columns: [
			['data1', 30, 200, 100, 400, 150, 250],
			['data2', 130, 100, 140, 200, 150, 50],
			['data3', 130, -150, 200, 300, -200, 100]
		],
		type: bar(),
	};
  const chartGroups = [['data1', 'data2', 'data3']];

	onMount(() => {
		chart = bb.generate({
			data: {
        ...chartData,
        groups: chartGroups,
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

		return () => chart?.destroy();
	});

  // Handle active chart type change.
	$: if (chart) {
    chart.destroy();
		if (activeChartType == 'stacked_bars') {
      chart = bb.generate({
        data: {
          ...chartData,
          groups: chartGroups,
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
      })
		} else {
      chart = bb.generate({
        data: {
          ...chartData,
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
      })
		}
	}
</script>

<PageContent>
	<span slot="heading">Income Statement</span>

	<div class="mt-2 flex flex-col">
		<!-- Heading -->
		<div class="h-64 w-full" bind:this={chartEl}></div>

		<div class="grid grid-cols-1 space-y-2 lg:grid-cols-2 lg:space-y-0">
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
				<Tabs.Root
					class="w-64"
					onValueChange={(typ) => {
						if (typ) {
							activeChartType = typ;
						} else {
							activeChartType = 'stacked_bars';
						}
					}}
					value={activeChartType}
				>
					<Tabs.List class="grid w-full grid-cols-2">
						{#each chartTypes as chartType}
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
		</div>

		<!-- Main Content -->
		<div class="flex-grow"></div>
	</div>
</PageContent>

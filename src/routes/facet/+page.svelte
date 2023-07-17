<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import Skeleton from '@components/Skeleton.svelte';
	import { group, max } from 'd3-array';
	import LineChart from '@visualisations/charts/LineChart.svelte';
	import { formatPercent } from '@utils';
</script>

<h2 class="text-3xl font-bold mb-8">
	Facets <span class="text-xl text-gray-500">/ small multiples</span>
</h2>

{#await data.streamed.data}
	<div class="w-full h-graph rounded">
		<Skeleton />
	</div>
{:then value}
	{@const grouped = group(value.series, (d) => d.country)}
	{@const keys = grouped.keys()}
	{@const yMax = max(value.series, (d) => d.value)}
	<h3 class="text-lg font-bold mb-2">
		{value.indicator}
	</h3>
	<div class="grid grid-cols-2 md:grid-cols-3 gap-2">
		{#each keys as key}
			<div>
				<h4 class="text-sm font-bold">
					{key}
				</h4>
				<figure class="w-full h-[200px] md:h-[300px]">
					<LineChart
						data={grouped.get(key)}
						x="date"
						y="value"
						yFormat={(y) => formatPercent(y, 0, 0.01)}
						{yMax}
						xFormat={(x) => x}
						filled={true}
						margins={{ top: 10, right: 10, bottom: 40, left: 50 }}
					/>
				</figure>
			</div>
		{/each}
	</div>
	<span class="text-sm text-gray-500">Source: World Bank</span>
{/await}

<script lang="ts">
	import Skeleton from '@components/Skeleton.svelte';
	import type { PageData } from './$types';
	import { formatPercent } from '@utils';

	import LineChart from '@visualisations/charts/LineChart.svelte';

	export let data: PageData;
</script>

<h1 class="text-3xl font-bold mb-8">Line</h1>

{#await data.streamed.data}
	<div class="w-full h-graph rounded">
		<Skeleton />
	</div>
{:then value}
	<h3 class="text-lg font-bold mb-2">
		{value.indicator}
	</h3>
	<figure class="w-full h-graph">
		<LineChart
			data={value.series}
			x="date"
			y="value"
			filled={true}
			yFormat={(y) => formatPercent(y, 0, 0.01)}
			xFormat={(x) => x}
		/>
	</figure>
	<span class="text-sm text-gray-500">Source: World Bank</span>
{:catch error}
	<p>{error.message}</p>
{/await}
<h2>Code</h2>
<svelte:component this={data.content} />

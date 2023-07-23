<script lang="ts">
	import BarStack from '@visualisations/charts/BarStack.svelte';
	export let data;
	import { format } from 'd3-format';
</script>

<h1 class="text-3xl font-bold mb-8">Stacked Bar</h1>

<h3 class="text-lg font-bold mb-2">
	{data.indicator}
</h3>

<div class="mb-4">
	<figure class="w-full h-graph">
		<BarStack
			data={data.series}
			x="date"
			y="value"
			color="country"
			yFormat={(y) => format('.2s')(y)}
		/>
	</figure>
	<span class="text-sm text-gray-500">Source: World Bank</span>
</div>

<h2>Code</h2>
<svelte:component this={data.content} />

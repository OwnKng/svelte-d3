<script lang="ts">
	import BarStack from '@visualisations/charts/BarStack.svelte';
	export let data;
	import { format } from 'd3-format';

	const getX = (d: any) => d.date;
	const getY = (d: any) => d.value;
	const getColor = (d: any) => d.country;
</script>

<h2 class="text-3xl font-bold mb-8">Stacked Bar</h2>

<h3 class="text-lg font-bold mb-2">
	{data.indicator}
</h3>

<figure class="w-full h-graph">
	<BarStack data={data.series} {getX} {getY} {getColor} yFormat={(y) => format('.2s')(y)} />
</figure>
<span class="text-sm text-gray-500">Source: World Bank</span>

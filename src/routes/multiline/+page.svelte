<script lang="ts">
	import MultiLine from '@visualisations/charts/MultiLine.svelte';
	import { format } from 'd3-format';

	export let data: any = [];

	const cleaned = data.series.filter((d) => d.value !== null).sort((a, b) => a.date - b.date);

	const getX = (d: any) => d.date;
	const getY = (d: any) => d.value;
	const getColor = (d: any) => d.country;
</script>

<h1 class="text-3xl font-bold mb-8">Multiple lines</h1>

<h3 class="text-lg font-bold mb-2">
	{data.indicator}
</h3>
<figure class="w-full h-graph">
	<MultiLine
		data={cleaned}
		{getX}
		{getY}
		{getColor}
		xFormat={(d) => d}
		yFormat={(d) => format('$.2s')(d)}
	/>
</figure>
<span class="text-sm text-gray-500">Source: World Bank</span>
<h2>Code</h2>
<svelte:component this={data.content} />

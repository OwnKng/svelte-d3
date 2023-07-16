<script lang="ts">
	import ScatterPlot from '@visualisations/charts/Scatter.svelte';
	import { createDummyData } from '../../utils';
	import { formatPercent } from '../../utils';

	let data = createDummyData(200);
</script>

<h2 class="text-3xl font-bold mb-8">Scatterplot</h2>

<button
	class="px-4 py-2 border bg-emerald-400 border-emerald-600 text-zinc-900 rounded-full hover:bg-emerald-500 hover:border-emerald-700 transition"
	on:click={() => (data = createDummyData(200))}>Regenerate data</button
>

<div class="w-full h-[500px] my-4">
	<ScatterPlot {data} x="x" y="y" color="color" xFormat={formatPercent} yFormat={formatPercent} />
</div>

<script>
	import Histogram from '@visualisations/charts/Histogram.svelte';
	import { randomNormal } from 'd3-random';
	import { format } from 'd3-format';
	export let data;

	const r = randomNormal(100, 20);

	let hist = new Array(1000).fill(0).map(() => ({ x: r() }));

	function regenerateData() {
		hist = new Array(1000).fill(0).map(() => ({ x: r() }));
	}
</script>

<h1 class="text-3xl font-bold mb-8">Histogram</h1>

<button
	class="border bg-primary bg-emerald-400 text-zinc-900 border-emerald-600 rounded px-3 py-1 shadow rounded-full text-sm"
	on:click={() => regenerateData()}>Regenerate data</button
>
<div class="w-full h-graph py-2">
	<Histogram data={hist} x="x" yFormat={(d) => format('.0%')(d)} />
</div>

<div>
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

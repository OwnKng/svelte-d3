<script>
	import Histogram from '@visualisations/charts/Histogram.svelte';
	import { randomNormal } from 'd3-random';
	import { format } from 'd3-format';
	import Button from '@components/Button.svelte';
	export let data;

	const r = randomNormal(100, 20);

	let hist = new Array(1000).fill(0).map(() => ({ x: r() }));

	function regenerateData() {
		hist = new Array(1000).fill(0).map(() => ({ x: r() }));
	}
</script>

<h1 class="text-3xl font-bold mb-8">Histogram</h1>

<Button on:click={() => regenerateData()}>Regenerate data</Button>
<div class="w-full h-graph py-2">
	<Histogram data={hist} x="x" yFormat={(d) => format('.0%')(d)} />
</div>

<div>
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

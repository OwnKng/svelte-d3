<script lang="ts">
	import ScatterPlot from '@visualisations/charts/Scatter.svelte';
	import { createDummyData } from '../../utils';
	import { formatPercent } from '../../utils';
	import Button from '@components/Button.svelte';
	import type { PageData } from '../scatterplot/$types';

	export let data: PageData;

	let dummy = createDummyData(200);
</script>

<h1 class="text-3xl font-bold mb-8">Scatterplot</h1>

<Button on:click={() => (dummy = createDummyData(200))}>Regenerate data</Button>

<div class="w-full h-[500px] my-4">
	<ScatterPlot
		data={dummy}
		x="x"
		y="y"
		color="color"
		xFormat={formatPercent}
		yFormat={formatPercent}
	/>
</div>
<div class="mt-8">
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

<script lang="ts">
	import Axis from '@visualisations/helpers/Axis.svelte';
	import AxisBottom from '@visualisations/helpers/AxisBottom.svelte';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleLinear, scaleBand } from 'd3-scale';
	import type { PageData } from './$types';

	export let data: PageData;

	const margins = {
		top: 20,
		right: 20,
		bottom: 40,
		left: 40
	};

	$: width = 0;
	$: height = 0;

	// dimensions
	$: dimensions = {
		width,
		height,
		margins: margins,
		innerHeight: Math.max(height - margins.top - margins.bottom, 0),
		innerWidth: Math.max(width - margins.left - margins.right, 0)
	};

	$: yScale = scaleLinear().domain([0, 100]).range([dimensions.innerHeight, 0]);
	$: xScale = scaleBand().domain(['Alpha', 'Beta', 'Gamma']).range([0, dimensions.innerWidth]);
</script>

<h1 class="text-3xl font-bold mb-8">Axis</h1>

<div class="w-full h-graph rounded" bind:clientWidth={width} bind:clientHeight={height}>
	{#if width > 100}
		<Chart {dimensions}>
			<AxisLeft scale={yScale} />
			<AxisBottom scale={xScale} />
		</Chart>
	{/if}
</div>
<div>
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

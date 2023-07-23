<script lang="ts">
	import AxisBottom from '@visualisations/helpers/AxisBottom.svelte';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleLinear, scaleLog } from 'd3-scale';
	import type { PageData } from './$types';
	import Grid from '@visualisations/helpers/Grid.svelte';
	import { format } from 'd3-format';
	import Panel from '@visualisations/helpers/Panel.svelte';

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
	$: xScale = scaleLog().domain([1, 1000000]).range([0, dimensions.innerWidth]);
</script>

<h1 class="text-3xl font-bold mb-8">Panel</h1>

<div class="w-full h-graph rounded" bind:clientWidth={width} bind:clientHeight={height}>
	{#if width > 100}
		<Chart {dimensions}>
			<Panel {xScale} {yScale} width={dimensions.innerWidth} height={dimensions.innerHeight} />
			<AxisLeft scale={yScale} />
			<AxisBottom scale={xScale} formatTick={format('.2s')} />
		</Chart>
	{/if}
</div>
<div>
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

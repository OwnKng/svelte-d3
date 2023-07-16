<script lang="ts">
	import { DEFAULT_MARGIN } from '../util';
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { max } from 'd3-array';
	import Chart from '../primatives/Chart.svelte';
	import Axis from '../helpers/Axis.svelte';
	import Bars from '../primatives/Bars.svelte';
	import GridRows from '../helpers/GridRows.svelte';

	export let margins = DEFAULT_MARGIN;
	export let width = 0;
	export let height = 0;

	export let data: any[];
	export let getY = (d: any) => d.y;
	export let getX = (d: any) => d.x;
	export let getColor = (d: any) => d.color;
	export let colorScale: any | undefined = null;

	// dimensions
	$: dimensions = {
		width,
		height,
		margins,
		innerHeight: Math.max(height - margins.top - margins.bottom, 0),
		innerWidth: Math.max(width - margins.left - margins.right, 0)
	};

	// scales
	$: xKeys = [...new Set(data.map(getX))];
	$: xScale = scaleBand().domain(xKeys).range([0, dimensions.innerWidth]).padding(0.2);

	$: yScale = scaleLinear()
		.domain([0, max(data, getY)])
		.range([dimensions.innerHeight, 0]);
</script>

<div class="w-full h-full relative" bind:clientWidth={width} bind:clientHeight={height}>
	{#if width > 100}
		<Chart {dimensions}>
			<GridRows scale={yScale} />
			<Bars
				{data}
				x={(d) => xScale(getX(d))}
				y={(d) => yScale(getY(d))}
				width={() => xScale.bandwidth()}
				height={(d) => innerHeight - yScale(getY(d))}
				fill={getColor}
			/>
			<Axis orientation="y" scale={yScale} />
		</Chart>
	{/if}
</div>

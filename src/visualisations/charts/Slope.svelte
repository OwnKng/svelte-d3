<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { extent, group } from 'd3-array';
	import { line } from 'd3-shape';
	import { curveBumpX } from 'd3-shape';

	export let margins = { top: 10, left: 10, right: 10, bottom: 10 };
	export let data: any[] = [];
	export let x: string;
	export let y: string;
	export let color: string;

	let width = 0;
	let height = 0;

	$: dimensions = {
		width,
		height,
		margins,
		innerWidth: width - margins.left - margins.right,
		innerHeight: height - margins.bottom - margins.bottom
	};

	// Accessors
	$: getX = (d: any) => d[x];
	$: getY = (d: any) => d[y];
	$: getColor = (d: any) => d[color];

	// Scales
	$: keys = [...new Set(data.map(getX))];
	$: xScale = scaleBand(keys, [0, dimensions.innerWidth]);
	$: yScale = scaleLinear(extent(data, getY), [dimensions.innerHeight, 0]);

	// Colors
	$: grouped = group(data, getColor);
	$: colorKeys = [...new Set(data.map(getColor))];

	$: lineGenerator = line()
		.x((d) => xScale(getX(d)) + xScale.bandwidth() / 2)
		.y((d) => yScale(getY(d)))
		.curve(curveBumpX);
</script>

<div class="w-full h-full" bind:clientHeight={height} bind:clientWidth={width}>
	<Chart {dimensions}>
		{#each colorKeys as line}
			<path d={lineGenerator(grouped.get(line))} stroke="white" fill="none" />
		{/each}
		{#each data as d}
			<circle
				cx={xScale(getX(d)) + xScale.bandwidth() / 2}
				cy={yScale(getY(d))}
				r={8}
				fill="white"
				stroke="black"
			/>
		{/each}
	</Chart>
</div>

<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleLinear } from 'd3-scale';
	import { line, curveStepAfter } from 'd3-shape';
	import { max } from 'd3-array';
	import Bar from '@visualisations/primatives/Bar.svelte';
	import Grid from '@visualisations/helpers/Grid.svelte';

	export let data: any[] = [];
	export let x: string;
	export let y: string;
	export let colorScale: (d: number) => string;

	export let margins = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	let width = 0;
	let height = 100;

	$: dimensions = {
		width,
		height,
		margins,
		innerWidth: width - margins.left - margins.right,
		innerHeight: height - margins.top - margins.bottom
	};

	$: getX = (d) => d[x];
	$: getY = (d) => d[y];

	$: xScale = scaleLinear().domain([0, 100]).range([0, dimensions.innerWidth]);

	$: yMax = max(data, getY);
	$: yScale = scaleLinear().domain([0, yMax]).range([dimensions.innerHeight, 0]).nice();

	$: lineGenerator = line()
		.x((d) => xScale(getX(d)))
		.y((d) => yScale(getY(d)))
		.curve(curveStepAfter);
</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
	{#if width > 100}
		<Chart {dimensions}>
			<g>
				{#each data as d}
					<Bar
						x={xScale(getX(d))}
						width={xScale(5)}
						y={yScale(getY(d))}
						height={dimensions.innerHeight - yScale(getY(d))}
						fill={colorScale(getX(d))}
					/>
				{/each}
			</g>
			<path d={lineGenerator(data)} stroke="white" stroke-width={2} fill="transparent" />
			<Grid orientation="x" scale={xScale} stroke="var(--colors-midnight)" />
		</Chart>
	{/if}
</div>

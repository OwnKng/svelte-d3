<script lang="ts">
	import Line from '@visualisations/primatives/Line.svelte';
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { line } from 'd3-shape';
	import { DEFAULT_MARGIN } from '@visualisations/util';
	import { curveMonotoneX } from 'd3-shape';

	let w = 0;
	let h = 0;

	let margins = DEFAULT_MARGIN;

	$: dimensions = {
		width: w,
		height: h,
		margins,
		innerHeight: Math.max(h - margins.top - margins.bottom, 0),
		innerWidth: Math.max(w - margins.left - margins.right, 0)
	};

	const data = new Array(50).fill(0).map((_, i) => ({
		x: i,
		y: Math.random() * 100
	}));

	$: xScale = scaleBand()
		.domain(data.map((d) => d.x))
		.range([0, dimensions.innerWidth])
		.padding(0.1);

	$: yScale = scaleLinear().domain([0, 100]).range([dimensions.innerHeight, 0]);

	$: path = line()
		.x((d) => xScale(d.x))
		.y((d) => yScale(d.y))
		.curve(curveMonotoneX);
</script>

<h1 class="text-3xl font-bold mb-8">Line</h1>

<div class="h-graph w-full relative" bind:clientWidth={w} bind:clientHeight={h}>
	<Chart {dimensions}>
		<Line path={path(data)} color="var(--colors-primary)" style="stroke-width: 3;" />
	</Chart>
</div>

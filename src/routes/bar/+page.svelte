<script lang="ts">
	import Bar from '@visualisations/primatives/Bar.svelte';
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleLinear, scaleBand } from 'd3-scale';

	import { DEFAULT_MARGIN } from '@visualisations/util';

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
</script>

<h1 class="text-3xl font-bold mb-8">Bar</h1>

<div class="h-graph w-full relative" bind:clientWidth={w} bind:clientHeight={h}>
	<Chart {dimensions}>
		{#each data as d}
			<Bar
				x={xScale(d.x)}
				y={yScale(d.y)}
				width={xScale.bandwidth()}
				height={dimensions.innerHeight - yScale(d.y)}
				fill="var(--colors-primary)"
			/>
		{/each}
	</Chart>
</div>

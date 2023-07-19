<script script="ts">
	export let data;

	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleLinear, scaleSqrt } from 'd3-scale';
	import Circle from '@visualisations/primatives/Circle.svelte';

	let w = 0;
	let h = 100;

	const margins = {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	};

	$: dimensions = {
		width: w,
		height: h,
		margins,
		innerHeight: Math.max(h - margins.top - margins.bottom, 0),
		innerWidth: Math.max(w - margins.left - margins.right, 0)
	};

	const circles = new Array(10).fill(0).map((_, i) => i);

	$: xScale = scaleLinear().domain([0, 10]).range([0, dimensions.innerWidth]);
	$: yScale = scaleLinear().domain([0, 10]).range([0, dimensions.innerHeight]);
	$: rScale = scaleSqrt().domain([0, 10]).range([0, 20]);
	$: colorScale = scaleLinear().domain([0, 10]).range(['#34d399', '#22d3ee']);
</script>

<h1 class="text-3xl font-bold mb-8">Circle</h1>

<div>
	<div class="w-full relative" bind:clientWidth={w}>
		<Chart {dimensions}>
			{#each circles as circle}
				<Circle
					x={xScale(circle)}
					y={yScale(5)}
					radius={rScale(circle)}
					fill={colorScale(circle)}
				/>
			{/each}
		</Chart>
	</div>
	<!-- Post -->
	<svelte:component this={data.content} />
</div>

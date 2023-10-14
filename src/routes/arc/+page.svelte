<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import type { PageData } from './$types';
	import Arc from '@visualisations/primatives/Arc.svelte';

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

	$: radius = Math.min(dimensions.innerWidth, dimensions.innerHeight) / 2;
</script>

<h1 class="text-3xl font-bold mb-8">Arc</h1>
<div class="w-full h-graph rounded" bind:clientWidth={width} bind:clientHeight={height}>
	{#if width > 100}
		<Chart {dimensions}>
			<g transform={`translate(${dimensions.innerWidth / 2}, ${dimensions.innerHeight / 2})`}>
				<Arc
					fill="var(--colors-primary)"
					innerRadius={radius * 0.8}
					outerRadius={radius}
					startAngle={Math.PI * 1.5}
					endAngle={Math.PI * 2.5}
					stroke="transparent"
					cornerRadius={20}
					animated
				/>
				<line
					x1={-dimensions.innerWidth * 0.5}
					y1={0}
					x2={dimensions.innerWidth * 0.5}
					y2={0}
					stroke="var(--colors-grid)"
				/>
			</g>
		</Chart>
	{/if}
</div>
<div>
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

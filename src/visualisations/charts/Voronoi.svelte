<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import Triangle from '@visualisations/primatives/Triangle.svelte';
	import { scaleSequential, scaleLinear } from 'd3-scale';
	import { Delaunay } from 'd3-delaunay';
	import { extent } from 'd3-array';
	import { interpolateMagma } from 'd3-scale-chromatic';

	export let data: any[];
	export let x: string;
	export let y: string;

	export let margins = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	};

	// dimensions
	let width = 0;
	let height = 0;

	$: dimensions = {
		width,
		height,
		margins,
		innerHeight: Math.max(height - margins.top - margins.bottom, 0),
		innerWidth: Math.max(width - margins.left - margins.right, 0)
	};

	// Accessors
	$: getX = (d: any) => d[x];
	$: getY = (d: any) => d[y];

	// scales
	$: xScale = scaleLinear(extent(data, getX), [0, dimensions.innerWidth]);
	$: yScale = scaleLinear(extent(data, getY), [dimensions.innerHeight, 0]);
	$: colorScale = scaleSequential(interpolateMagma).domain([0, 10]);

	// Create polygons
	$: delaunay = Delaunay.from(data.map((d) => [xScale(getX(d)), yScale(getY(d))]));
	$: voronoi = delaunay.voronoi([0, 0, dimensions.innerWidth, dimensions.innerHeight]);
	$: polygons = data.map((_, i) => {
		return {
			d: voronoi.renderCell(i),
			neighbours: [...voronoi.neighbors(i)]
		};
	});

	// interaction
	let tooltipData = {
		x: 0,
		y: 0,
		indicies: [] as number[]
	};

	function handleMouseOver(event: MouseEvent) {
		const x = event.offsetX - dimensions.margins.left;
		const y = event.offsetY - dimensions.margins.top;

		const index = delaunay.find(x, y);

		tooltipData = {
			x,
			y,
			indicies: [index, ...voronoi.neighbors(index)]
		};
	}

	function handleMouseLeave(event: MouseEvent) {
		tooltipData = {
			x: 0,
			y: 0,
			indicies: []
		};
	}
</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
	<Chart {dimensions}>
		{#each polygons as polygon, i}
			<path
				d={polygon.d}
				fill={colorScale(polygon.neighbours.length)}
				stroke-width={1}
				fill-opacity={tooltipData.indicies.includes(i) ? 1 : 0}
				stroke={tooltipData.indicies.includes(i)
					? 'var(--colors-background)'
					: 'var(--colors-grid)'}
			/>
		{/each}
		{#each data as datum}
			<Triangle
				x={xScale(getX(datum))}
				y={yScale(getY(datum))}
				fill="var(--colors-primary)"
				size={50}
				stroke="transparent"
			/>
		{/each}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<rect
			x={dimensions.margins.left}
			y={dimensions.margins.top}
			width={dimensions.innerWidth}
			height={dimensions.innerHeight}
			fill="transparent"
			on:mousemove={handleMouseOver}
			on:mouseleave={handleMouseLeave}
		/>
	</Chart>
</div>

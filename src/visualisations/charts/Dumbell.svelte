<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { colorPalette } from '@visualisations/util';
	import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
	import { extent, group } from 'd3-array';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';
	import AxisBottom from '@visualisations/helpers/AxisBottom.svelte';
	import LegendOrdinal from '@visualisations/helpers/LegendOrdinal.svelte';

	export let x: string;
	export let y: string;
	export let color: string;
	export let colors = colorPalette;

	let width = 500;
	let height = 500;
	let margins = {
		top: 20,
		right: 20,
		bottom: 40,
		left: 140
	};

	export let data: any[];

	$: dimensions = {
		width,
		height,
		margins,
		innerWidth: width - margins.left - margins.right,
		innerHeight: height - margins.top - margins.bottom
	};

	// Accessors
	$: getX = (d: any) => d[x];
	$: getY = (d: any) => d[y];
	$: getColor = (d: any) => d[color];

	$: yKeys = [...new Set(data.map(getY))];
	$: colorKeys = [...new Set(data.map(getColor))];

	$: xScale = scaleLinear().range([0, dimensions.innerWidth]).domain(extent(data, getX));
	$: yScale = scaleBand().range([dimensions.innerHeight, 0]).domain(yKeys);
	$: colorScale = scaleOrdinal().range(colors).domain(colorKeys);

	// Reshape the data to draw the lines
	$: series = group(data, getY);

	// Grid
	$: yTicks = yScale.domain().filter((_, i) => i % 2);
</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
	<LegendOrdinal scale={colorScale} />
	<Chart {dimensions}>
		<AxisLeft scale={yScale} hideTicks hideAxisLine />
		<AxisBottom scale={xScale} />
		{#each yTicks as tick}
			<rect
				x={0}
				width={dimensions.innerWidth}
				y={yScale(tick)}
				height={yScale.bandwidth()}
				stroke-width={2}
				fill="var(--colors-foreground)"
			/>
		{/each}
		{#each series as [key, values]}
			<line
				x1={xScale(getX(values[0]))}
				x2={xScale(getX(values[values.length - 1]))}
				y1={yScale(key) + yScale.bandwidth() / 2}
				y2={yScale(key) + yScale.bandwidth() / 2}
				stroke="var(--colors-grid)"
				stroke-width={2}
			/>
			{#each values as value}
				<circle
					cx={xScale(getX(value))}
					cy={yScale(getY(value)) + yScale.bandwidth() / 2}
					r={8}
					fill={colorScale(getColor(value))}
				/>
			{/each}
		{/each}
	</Chart>
</div>

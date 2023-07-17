<script lang="ts">
	import { DEFAULT_MARGIN, colorPalette } from '../util';
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { max } from 'd3-array';
	import Chart from '../primatives/Chart.svelte';
	import Bar from '@visualisations/primatives/Bar.svelte';
	import GridRows from '../helpers/GridRows.svelte';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';
	import AxisBottom from '@visualisations/helpers/AxisBottom.svelte';

	export let margins = DEFAULT_MARGIN;
	export let width = 0;
	export let height = 0;
	export let data: any[];
	export let x: string;
	export let y: string;
	export let color = colorPalette[0];
	export let yFormat = (d: any) => d;

	// dimensions
	$: dimensions = {
		width,
		height,
		margins,
		innerHeight: Math.max(height - margins.top - margins.bottom, 0),
		innerWidth: Math.max(width - margins.left - margins.right, 0)
	};

	// Accessors
	$: getY = (d: any) => d[y];
	$: getX = (d: any) => d[x];

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
			{#each data as datum, i}
				<Bar
					x={xScale(getX(datum))}
					y={yScale(getY(datum))}
					width={xScale.bandwidth()}
					height={dimensions.innerHeight - yScale(getY(datum))}
					fill={color}
				/>
			{/each}
			<AxisLeft scale={yScale} formatTick={yFormat} />
			<AxisBottom
				scale={xScale}
				tickValues={dimensions.innerWidth > 400
					? xScale.domain().filter((_, i) => i % 5 === 0)
					: xScale.domain().filter((_, i) => i % 10 === 0)}
			/>
		</Chart>
	{/if}
</div>

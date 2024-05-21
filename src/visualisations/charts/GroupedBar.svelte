<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
	import { max } from 'd3-array';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';
	import AxisBottom from '@visualisations/helpers/AxisBottom.svelte';
	import Bar from '@visualisations/primatives/Bar.svelte';
	import LegendOrdinal from '@visualisations/helpers/LegendOrdinal.svelte';
	import GridRows from '@visualisations/helpers/GridRows.svelte';

	export let data: any[];
	export let margins = { top: 10, left: 40, right: 10, bottom: 30 };
	export let x: string;
	export let y: string;
	export let color: string;
	export let yFormat = (d: any) => d;

	let width = 0;
	let height = 0;

	// Set dimensions
	$: dimensions = {
		width: width,
		height: height,
		margins: margins,
		innerHeight: height - margins.top - margins.bottom,
		innerWidth: width - margins.left - margins.right
	};

	// Accessors
	$: getX = (d: any) => d[x];
	$: getY = (d: any) => d[y];
	$: getColor = (d: any) => d[color];

	// Scales
	$: xKeys = [...new Set(data.map(getX))];
	$: xScale = scaleBand(xKeys, [0, dimensions.innerWidth]).padding(0.2);

	$: colorKeys = [...new Set(data.map(getColor))];
	$: colorScale = scaleOrdinal(colorKeys, ['#deebf7', '#9ecae1', '#3182bd']);
	$: groupedScale = scaleBand(colorKeys, [0, xScale.bandwidth()]).padding(0.05);

	$: yScale = scaleLinear([0, max(data.map(getY))], [dimensions.innerHeight, 0]);
</script>

<div class="flex flex-col w-full h-full">
	<LegendOrdinal scale={colorScale} />
	<div class="w-full h-full grow" bind:clientWidth={width} bind:clientHeight={height}>
		<Chart {dimensions}>
			<GridRows scale={yScale} />
			{#each data as datum}
				<Bar
					x={xScale(getX(datum)) + groupedScale(getColor(datum))}
					width={groupedScale.bandwidth()}
					height={dimensions.innerHeight - yScale(getY(datum))}
					y={yScale(getY(datum))}
					fill={colorScale(getColor(datum))}
				/>
			{/each}
			<AxisLeft scale={yScale} hideAxisLine formatTick={yFormat} hideTicks />
			<AxisBottom scale={xScale} />
		</Chart>
	</div>
</div>

<script lang="ts">
	import { pie } from 'd3-shape';
	import { scaleOrdinal } from 'd3-scale';
	import { colorPalette } from '../util';
	import { DEFAULT_MARGIN } from '../util';
	import Chart from '../primatives/Chart.svelte';
	import Arc from '../primatives/Arc.svelte';
	import LegendOrdinal from '@visualisations/helpers/LegendOrdinal.svelte';

	export let data: any[];
	export let color: string;
	export let value: string;

	let width = 0;
	let height = 0;

	let margins = DEFAULT_MARGIN;

	$: dimensions = {
		width,
		height,
		margins,
		innerHeight: Math.max(height - margins.top - margins.bottom, 0),
		innerWidth: Math.max(width - margins.left - margins.right, 0)
	};

	$: radius = Math.min(dimensions.innerWidth, dimensions.innerHeight) / 2;

	$: getColor = (d: any) => d[color];
	$: getValue = (d: any) => d[value];

	$: colorScale = scaleOrdinal().domain(data.map(getColor)).range(colorPalette);

	$: arcs = pie().value(getValue)(data);

	$: console.log(data);
</script>

<div class="w-full h-full flex flex-col">
	<LegendOrdinal scale={colorScale} />
	<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
		<Chart {dimensions}>
			<g transform={`translate(${dimensions.innerWidth / 2}, ${dimensions.innerHeight / 2})`}>
				{#each arcs as arc}
					<Arc
						fill={colorScale(arc.data[color])}
						innerRadius={radius * 0.5}
						outerRadius={radius}
						startAngle={arc.startAngle}
						endAngle={arc.endAngle}
					/>
				{/each}
			</g>
		</Chart>
	</div>
</div>

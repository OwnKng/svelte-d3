<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleBand, scaleRadial, scaleOrdinal } from 'd3-scale';
	import { group, extent } from 'd3-array';
	import LegendOrdinal from '@visualisations/helpers/LegendOrdinal.svelte';
	import Circle from '@visualisations/primatives/Circle.svelte';
	import Arc from '@visualisations/primatives/Arc.svelte';
	import { colorPalette } from '@visualisations/util';

	export let data: any[];
	export let x: string;
	export let y: string;
	export let color: string;
	export let yFormat = (d: any) => d;
	export let colors = colorPalette;

	let width = 500;
	let height = 500;
	const margins = {
		top: 20,
		right: 20,
		bottom: 20,
		left: 20
	};

	$: dimensions = {
		width,
		height,
		margins,
		innerWidth: Math.max(width - margins.left - margins.right, 0),
		innerHeight: Math.max(height - margins.top - margins.bottom, 0)
	};

	$: outerRadius = Math.min(dimensions.innerWidth, dimensions.innerHeight) / 2;
	$: innerRadius = outerRadius * 0.5;

	// accessors
	$: getX = (d: any) => d[x];
	$: getY = (d: any) => d[y];
	$: getColor = (d: any) => d[color];

	// Reshape the data
	$: series = group(data, getX);

	// scales
	$: xKeys = [...new Set(data.map(getX))];

	$: xScale = scaleBand()
		.domain(xKeys)
		.range([0, 2 * Math.PI]);

	$: yScale = scaleRadial().domain(extent(data, getY)).range([innerRadius, outerRadius]).nice();

	$: colorScale = scaleOrdinal()
		.domain([...new Set(data.map(getColor))])
		.range(colors);

	// Axis grid
	$: grid = xScale.domain().filter((_, i) => i % 2 === 0);
	$: yTicks = width < 400 ? yScale.ticks(2) : yScale.ticks(4);
</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
	<LegendOrdinal scale={colorScale} />
	<Chart {dimensions}>
		<g transform={`translate(${dimensions.innerWidth / 2}, ${dimensions.innerHeight / 2})`}>
			{#each grid as key}
				<Arc
					{innerRadius}
					{outerRadius}
					startAngle={xScale(key)}
					endAngle={xScale(key) + xScale.bandwidth()}
					fill="var(--colors-grid)"
					cornerRadius={5}
					stroke="transparent"
				/>
			{/each}
			{#each series as [key, values]}
				{@const angle = xScale(key) + xScale.bandwidth() / 2 - Math.PI / 2}
				{@const yMin = yScale(getY(values[0]))}
				{@const yMax = yScale(getY(values[values.length - 1]))}
				<line
					x1={yMin * Math.cos(angle)}
					y1={yMin * Math.sin(angle)}
					x2={yMax * Math.cos(angle)}
					y2={yMax * Math.sin(angle)}
					stroke="var(--colors-text)"
					stroke-width="2px"
				/>
				{#each values as value}
					{@const radius = yScale(getY(value))}
					<Circle
						x={radius * Math.cos(angle)}
						y={radius * Math.sin(angle)}
						radius={6}
						stroke="var(--colors-background)"
						fill={colorScale(getColor(value))}
					/>
				{/each}
			{/each}
			{#each xKeys as tick}
				{@const angle = xScale(tick) + xScale.bandwidth() / 2}
				{@const r = yScale(yScale.domain()[0])}
				<text
					transform={`translate(${r * Math.sin(angle)}, ${-r * Math.cos(angle)}) rotate(${
						(angle * 180) / Math.PI < 180
							? (angle * 180) / Math.PI - 90
							: (angle * 180) / Math.PI + 90
					})`}
					text-anchor={(angle * 180) / Math.PI < 180 ? 'end' : 'start'}
					dominant-baseline="middle"
					fill="var(--colors-text)"
					style="font-size: 10px;"
					stroke="var(--colors-background)"
					stroke-width="2px"
					paint-order="stroke"
					dx={((angle * 180) / Math.PI < 180 ? -1 : 1) * 5}
				>
					{tick}
				</text>
			{/each}
			{#each yTicks as tick}
				<text
					x={0}
					y={-yScale(tick)}
					text-anchor="middle"
					alignment-baseline="baseline"
					fill="var(--colors-text)"
					style="font-size: 12px;"
					stroke="var(--colors-background)"
					stroke-width="2px"
					paint-order="stroke"
					pointer-events="none"
				>
					{yFormat(tick)}
				</text>
			{/each}
		</g>
	</Chart>
</div>

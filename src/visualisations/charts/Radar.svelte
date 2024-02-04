<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleBand, scaleRadial, scaleOrdinal } from 'd3-scale';
	import { lineRadial, curveCardinalClosed } from 'd3-shape';
	import { max, group } from 'd3-array';
	import Area from '@visualisations/primatives/Area.svelte';
	import Line from '@visualisations/primatives/Line.svelte';
	import Circle from '@visualisations/primatives/Circle.svelte';
	import LegendOrdinal from '@visualisations/helpers/LegendOrdinal.svelte';

	export let data: any[];
	export let x: string;
	export let y: string;
	export let color: string;

	let width = 0;
	let height = 0;

	const margins = {
		top: 15,
		right: 10,
		bottom: 5,
		left: 10
	};

	$: dimensions = {
		width,
		height,
		margins,
		innerWidth: width - margins.left - margins.right,
		innerHeight: height - margins.top - margins.bottom
	};

	$: outerRadius = Math.min(dimensions.innerWidth, dimensions.innerHeight) / 2;

	// Accessors
	$: getX = (d: any) => d[x];
	$: getY = (d: any) => d[y];
	$: getColor = (d: any) => d[color];

	// Scales
	$: xScale = scaleBand(data.map(getX), [0, 2 * Math.PI]);
	$: xKeys = xScale.domain();

	$: yScale = scaleRadial([0, max(data, getY)], [0, outerRadius]).nice();
	$: yTicks = yScale.ticks(4);

	$: colorKeys = [...new Set(data.map(getColor))];
	$: colorScale = scaleOrdinal(colorKeys, ['#f472b6', '#0dcaf0', '#c084fc']);

	// Group data
	$: grouped = group(data, getColor);

	$: lineGenerator = lineRadial()
		.angle((d) => xScale(getX(d)))
		.radius((d) => yScale(getY(d)))
		.curve(curveCardinalClosed);

	// Converts pollar coords to align with D3's radial functions (i.e. 0 degrees is at the top)
	$: radialCoords = (d: any) => {
		const angle = xScale(getX(d));
		const r = yScale(getY(d));

		return {
			x: r * Math.sin(angle),
			y: -r * Math.cos(angle)
		};
	};
</script>

<div class="w-full h-full flex flex-col">
	<LegendOrdinal scale={colorScale} symbol="circle" />
	<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
		<Chart {dimensions}>
			<g transform={`translate(${dimensions.innerWidth / 2}, ${dimensions.innerHeight / 2})`}>
				<circle cx={0} cy={0} r={outerRadius} fill="var(--colors-midnight-75)" />
				{#each yTicks as tick}
					<circle cx={0} cy={0} r={yScale(tick)} fill="none" stroke="var(--colors-midnight-50)" />
				{/each}
				{#each xKeys as tick}
					{@const angle = xScale(tick)}
					<line
						stroke="var(--colors-midnight)"
						stroke-width={2}
						stroke-linecap="round"
						x1={0}
						y1={0}
						x2={outerRadius * Math.sin(angle)}
						y2={-outerRadius * Math.cos(angle)}
					/>
				{/each}
				{#each colorKeys as key}
					<g>
						<Area path={lineGenerator(grouped.get(key))} opacity={0.2} color={colorScale(key)} />
						<Line path={lineGenerator(grouped.get(key))} color={colorScale(key)} />
					</g>
				{/each}
				{#each data as d}
					{@const { x, y } = radialCoords(d)}
					<Circle
						{x}
						{y}
						radius={6}
						fill={colorScale(getColor(d))}
						stroke="var(--colors-midnight)"
					/>
				{/each}
				{#each xKeys as tick}
					{@const angle = xScale(tick)}
					<text
						x={outerRadius * Math.sin(angle)}
						y={-outerRadius * Math.cos(angle) - 5}
						text-anchor="middle"
						font-size="12px"
						alignment-baseline="baseline"
						fill="var(--colors-text)"
						style="font-size: 0.75rem;"
						stroke="var(--colors-background)"
						stroke-width="2px"
						paint-order="stroke"
						pointer-events="none"
					>
						{tick}
					</text>
				{/each}
				{#each yTicks as tick}
					<text
						y={-yScale(tick)}
						alignment-baseline="central"
						text-anchor="start"
						fill="var(--colors-text)"
						style="font-size: 0.75rem;"
						stroke="var(--colors-background)"
						stroke-width="2px"
						paint-order="stroke"
						pointer-events="none"
					>
						{tick}
					</text>
				{/each}
			</g>
		</Chart>
	</div>
</div>

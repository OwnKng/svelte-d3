### Polar Stack

```svelte
<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleBand, scaleRadial, scaleOrdinal } from 'd3-scale';
	import Arc from '@visualisations/primatives/Arc.svelte';
	import { stack } from 'd3-shape';
	import { index } from 'd3-array';
	import LegendOrdinal from '@visualisations/helpers/LegendOrdinal.svelte';

	export let data: any[];
	export let x: string;
	export let y: string;
	export let color: string;
	export let yFormat = (d: any) => d;

	// set dimensions
	let width = 500;
	let height = 500;

	const margins = {
		top: 10,
		right: 0,
		bottom: 0,
		left: 0
	};

	$: dimensions = {
		width,
		height,
		margins,
		innerWidth: width - margins.left - margins.right,
		innerHeight: height - margins.top - margins.bottom
	};

	$: outerRadius = Math.min(dimensions.innerWidth, dimensions.innerHeight) / 2;
	$: innerRadius = outerRadius * 0.5;
	$: labelRadius = innerRadius * 0.85;

	// accessors
	$: getX = (d: any) => d[x];
	$: getY = (d: any) => d[y];
	$: getColor = (d: any) => d[color];

	$: keys = [...new Set(data.map((d) => getColor(d)))];

	// scales
	$: xScale = scaleBand()
		.domain(data.map(getX))
		.range([0, 2 * Math.PI])
		.padding(0.08);

	$: yScale = scaleRadial().domain([0, 100]).range([innerRadius, outerRadius]).nice();

	$: colorScale = scaleOrdinal().domain(keys).range(['#ecfdf5', '#a7f3d0', '#34d399']);

	// data reshaping
	$: stackGenerator = stack()
		.keys(keys)
		.value(([_, nested], key) => {
			return nested.get(key) ? getY(nested.get(key)) : 0;
		});

	$: stackedData = stackGenerator(
		index(
			data,
			(d) => getX(d),
			(d) => getColor(d)
		)
	);

	// ticks
	$: xTicks = xScale.domain();
	$: yTicks = width < 400 ? yScale.ticks(2) : yScale.ticks(4);
</script>

<div>
	<LegendOrdinal scale={colorScale} symbol="square" />
	<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
		<Chart {dimensions}>
			<g transform={`translate(${dimensions.innerWidth / 2}, ${dimensions.innerHeight / 2})`}>
				<Arc
					{innerRadius}
					{outerRadius}
					startAngle={0}
					endAngle={2 * Math.PI}
					fill="var(--colors-foreground)"
					stroke="transparent"
				/>
				{#each stackedData as series}
					{#each series as segment}
						<Arc
							innerRadius={yScale(segment[0])}
							outerRadius={yScale(segment[1])}
							startAngle={xScale(segment.data[0])}
							endAngle={xScale.bandwidth() + xScale(segment.data[0])}
							fill={colorScale(series.key)}
							stroke={colorScale(series.key)}
						/>
					{/each}
				{/each}
				{#each xTicks as tick}
					{@const angle = xScale(tick) + xScale.bandwidth() / 2}
					{@const r = yScale(0)}
					<text
						transform={`translate(${r * Math.sin(angle)}, ${-r * Math.cos(angle)}) rotate(${
							(angle * 180) / Math.PI < 180
								? (angle * 180) / Math.PI - 90
								: (angle * 180) / Math.PI + 90
						})`}
						text-anchor={(angle * 180) / Math.PI < 180 ? 'end' : 'start'}
						dominant-baseline="middle"
						fill="var(--colors-text)"
						style="font-size: 0.75rem;"
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
						style="font-size: 0.75rem;"
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
</div>
```

### Diverging Bar

```svelte
<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
	import Bar from '../primatives/Bar.svelte';
	import LegendOrdinal from '@visualisations/helpers/LegendOrdinal.svelte';
	import GridRows from '@visualisations/helpers/GridRows.svelte';
	import { colorPalette } from '@visualisations/util';
	import Axis from '@visualisations/helpers/Axis.svelte';

	export let data: any[];
	export let x: string;
	export let y1: string;
	export let y2: string;
	export let yFormat = (d: any) => Math.abs(d) + '%';

	let width = 500;
	let height = 500;

	const margins = {
		top: 20,
		right: 20,
		bottom: 30,
		left: 10
	};

	$: dimensions = {
		width,
		height,
		margins,
		innerWidth: width - margins.left - margins.right,
		innerHeight: height - margins.top - margins.bottom
	};

	// accessors
	$: getX = (d: any) => d[x];
	$: getY1 = (d: any) => d[y1];
	$: getY2 = (d: any) => d[y2];

	$: yMax = [...data.map(getY1), ...data.map(getY2)].reduce((a, b) => Math.max(a, b));

	// scales
	$: xScale = scaleBand().domain(data.map(getX)).range([0, dimensions.innerWidth]).padding(0.08);
	$: xTicks = xScale.domain().filter((_, i) => !(i % 10));

	$: yScale = scaleLinear().domain([-yMax, yMax]).range([dimensions.innerHeight, 0]).nice();

	$: colorScale = scaleOrdinal().domain([y1, y2]).range(colorPalette);
</script>

<div>
	<LegendOrdinal scale={colorScale} symbol="square" />
	<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
		<Chart {dimensions}>
			<GridRows scale={yScale} />
			{#each data as datum, i}
				<Bar
					x={xScale(getX(datum))}
					y={yScale(getY1(datum))}
					width={xScale.bandwidth()}
					height={yScale(0) - yScale(getY1(datum))}
					fill={colorScale(y1)}
				/>
				<Bar
					x={xScale(getX(datum))}
					y={yScale(0)}
					width={xScale.bandwidth()}
					height={yScale(getY2(datum) * -1) - yScale(0)}
					fill={colorScale(y2)}
				/>
			{/each}
			<Axis
				orientation="y"
				scale={yScale}
				numberOfTicks={5}
				hideAxisLine
				hideTicks
				formatTick={yFormat}
				left={dimensions.innerWidth}
				style="text-anchor: middle; alignment-baseline: text-after-edge;"
			/>
			<Axis
				orientation="x"
				scale={xScale}
				tickValues={xTicks}
				hideAxisLine
				hideTicks
				bottom={yScale(0) + 10}
				style="fill:var(--colors-background); stroke:var(--colors-text); font-size: 12px; font-weight: bold;"
			/>
			<line
				y1={yScale(0)}
				y2={yScale(0)}
				x1={0}
				x2={dimensions.innerWidth}
				stroke="var(--colors-background)"
			/>
		</Chart>
	</div>
</div>
```

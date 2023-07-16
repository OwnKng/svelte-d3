<script lang="ts">
	import { stack } from 'd3-shape';
	import { index, sum, max, rollup } from 'd3-array';
	import { DEFAULT_MARGIN } from '../util';
	import Chart from '../primatives/Chart.svelte';
	import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
	import { colorPalette } from '../util';

	import Bar from '@visualisations/primatives/Bar.svelte';
	import LegendOrdinal from '@visualisations/helpers/LegendOrdinal.svelte';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';

	export let margins = DEFAULT_MARGIN;
	export let width = 0;
	export let height = 0;

	export let data: any[];
	export let getY = (d: any) => d.y;
	export let getX = (d: any) => d.x;
	export let getColor = (d: any) => d.color;
	export let yFormat = (d: any) => d;
	export let xFormat = (d: any) => d;

	$: dimensions = {
		width,
		height,
		margins,
		innerHeight: Math.max(height - margins.top - margins.bottom, 0),
		innerWidth: Math.max(width - margins.left - margins.right, 0)
	};

	$: keys = [...new Set(data.map((d) => getColor(d)))];

	const totals = Array.from(
		rollup(
			data,
			(v) => sum(v, (d: any) => getY(d)),
			(d) => getX(d)
		),
		([key, value]) => ({
			x: key,
			y: value
		})
	);

	$: yMax = max(totals, (d) => d.y);

	$: xScale = scaleBand().domain(data.map(getX)).range([0, dimensions.innerWidth]);
	$: yScale = scaleLinear().domain([0, yMax]).range([dimensions.innerHeight, 0]).nice();

	$: colorScale = scaleOrdinal().domain(keys).range(colorPalette);

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
</script>

<div class="w-full h-full relative" bind:clientWidth={width} bind:clientHeight={height}>
	<LegendOrdinal scale={colorScale} symbol="square" />
	{#if width > 100}
		<Chart {dimensions}>
			{#each stackedData as stack}
				{#each stack as datum}
					<Bar
						x={xScale(datum.data[0])}
						y={yScale(datum[1])}
						height={yScale(datum[0]) - yScale(datum[1])}
						width={xScale.bandwidth()}
						fill={colorScale(stack.key)}
					/>
				{/each}
			{/each}
			<AxisLeft hideAxisLine={true} scale={yScale} formatTick={yFormat} />
		</Chart>
	{/if}
</div>

<script lang="ts">
	import Chart from '../primatives/Chart.svelte';
	import { scaleLinear } from 'd3-scale';
	import { max, min, bin, sum } from 'd3-array';
	import AxisBottom from '../helpers/AxisBottom.svelte';
	import Gradient from '../helpers/Gradient.svelte';
	import Bar from '@visualisations/primatives/Bar.svelte';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';
	import Grid from '@visualisations/helpers/Grid.svelte';

	export let data: any[] = [];
	export let x: string;
	export let percent: boolean = true;
	export let xFormat = (d: any) => d;
	export let yFormat = (d: any) => d;
	export let margins = {
		top: 5,
		right: 40,
		bottom: 30,
		left: 40
	};
	export let thresholds = 20;
	export let gradientColors = ['#2dd4bf', '#ccfbf1'];
	const gradientId = crypto.randomUUID();

	let w = 0;
	let h = 0;

	$: dimensions = {
		width: w,
		height: h,
		margins: margins,
		innerHeight: h - margins.top - margins.bottom,
		innerWidth: w - margins.left - margins.right
	};

	$: getX = (d: any) => d[x];

	$: xScale = scaleLinear([min(data, getX), max(data, getX)], [0, dimensions.innerWidth]).nice();

	$: bins = bin().value(getX).thresholds(thresholds)(data);

	$: yMax = percent ? sum(bins.map((bin) => bin.length)) : 1;

	$: yScale = scaleLinear(
		[
			0,
			percent
				? max(bins.map((bin) => bin.length)) / sum(bins.map((bin) => bin.length))
				: max(bins.map((bin) => bin.length))
		],
		[dimensions.innerHeight, 0]
	).nice();
</script>

<div class="w-full h-full grow relative" bind:clientHeight={h} bind:clientWidth={w}>
	{#if w > 100}
		<Chart {dimensions}>
			<defs>
				<Gradient id={gradientId} colors={gradientColors} y2="100%" x2="0" />
			</defs>
			<Grid orientation="y" scale={yScale} />
			{#each bins as bin}
				<Bar
					x={xScale(bin.x0)}
					y={yScale(bin.length / yMax)}
					width={xScale(bin.x1) - xScale(bin.x0)}
					height={dimensions.innerHeight - yScale(bin.length / yMax)}
					style="fill: url(#{gradientId}); stroke-width: 1px; stroke: var(--colors-background);"
				/>
			{/each}
			<AxisBottom scale={xScale} formatTick={xFormat} />
			<AxisLeft scale={yScale} formatTick={yFormat} />
		</Chart>
	{/if}
</div>

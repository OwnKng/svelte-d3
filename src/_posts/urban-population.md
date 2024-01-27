### Code

```svelte
<script lang="ts">
	import { scaleBand, scaleLinear } from 'd3-scale';
	import Chart from '@visualisations/primatives/Chart.svelte';
	import AxisTop from '@visualisations/helpers/AxisTop.svelte';
	import { pie } from 'd3-shape';
	import { descending } from 'd3-array';
	import Bar from '@visualisations/primatives/Bar.svelte';
	import Grid from '@visualisations/helpers/Grid.svelte';
	import { format } from 'd3-format';

	export let data: {
		country: string;
		population: number;
		urban_population: number;
		rural_population: number;
	}[] = [];

	export let x1 = 'urban_population';
	export let x2 = 'rural_population';
	export let y = 'population';
	export let label = 'iso3c';
	export let xFormat = (d) => format('.0%')(Math.abs(d / 100));
	export let margins = {
		top: 20,
		right: 20,
		bottom: 0,
		left: 20
	};

	let width = 0;
	let height = 0;

	$: dimensions = {
		width,
		height,
		margins,
		innerHeight: height - margins.top - margins.bottom,
		innerWidth: width - margins.left - margins.right
	};

	$: getX1 = (d: any) => d[x1];
	$: getX2 = (d: any) => d[x2];
	$: getY = (d: any) => d[y];
	$: getLabel = (d: any) => d[label];

	$: yKeys = [...new Set(data.map(getX1))];
	$: yScale = scaleLinear([0, Math.PI * 2], [0, dimensions.innerHeight]);

	$: xScale = scaleLinear([-100, 100], [0, dimensions.innerWidth]);

	// Create rects
	$: rects = pie()
		.sort((a, b) => descending(getX1(a), getX1(b)))
		.value((d) => getY(d))(data);
</script>

<div class="w-full h-full flex flex-col">
	<div class="w-full h-8 flex relative" style="margin-left: {margins.left}px;">
		<svg width={dimensions.innerWidth} height={16}>
			<g class="Labels">
				<text
					x={xScale(0) - 5}
					y={0}
					text-anchor="end"
					alignment-baseline="hanging"
					fill="var(--colors-midnight-25)">&larr; Rural</text
				>
				<text
					x={xScale(0) + 5}
					y={0}
					text-anchor="start"
					alignment-baseline="hanging"
					fill="var(--colors-primary)">Urban &rarr;</text
				>
			</g>
		</svg>
	</div>
	<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
		{#if width > 200}
			<Chart {dimensions}>
				<Grid scale={xScale} />
				{#each rects as rect}
					<g>
						<Bar
							y={yScale(rect.startAngle)}
							height={yScale(rect.endAngle) - yScale(rect.startAngle)}
							x={xScale(0)}
							width={xScale(getX1(rect.data)) - xScale(0)}
							fill="var(--colors-primary)"
						/>
						<Bar
							y={yScale(rect.startAngle)}
							height={yScale(rect.endAngle) - yScale(rect.startAngle)}
							x={xScale(getX2(rect.data) * -1)}
							width={xScale(getX2(rect.data)) - xScale(0)}
							fill="var(--colors-midnight-50)"
						/>
						{#if rect.value > 50 * 10 ** 6}
							<text
								x={xScale(getX1(rect.data)) + 5}
								alignment-baseline="middle"
								text-anchor="start"
								font-size="10"
								fill="var(--colors-primary)"
								stroke="var(--colors-midnight)"
								stroke-width="2"
								paint-order="stroke"
								y={yScale(rect.startAngle) + (yScale(rect.endAngle) - yScale(rect.startAngle)) / 2}
							>
								{getLabel(rect.data)}
							</text>
						{/if}
					</g>
				{/each}
				<line x1={xScale(0)} x2={xScale(0)} y1={0} y2={dimensions.innerHeight} stroke="white" />
				<AxisTop
					scale={xScale}
					bottom={dimensions.innerHeight}
					formatTick={xFormat}
					hideAxisLine
					hideTicks
				/>
			</Chart>
		{/if}
	</div>
</div>
```

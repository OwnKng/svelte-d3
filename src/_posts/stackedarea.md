### Stacked Area

```svelte
<script lang="ts">
	import { stack } from 'd3-shape';
	import { index, sum, max, rollup, bisector, extent } from 'd3-array';
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import { area } from 'd3-shape';
	import Area from '@visualisations/primatives/Area.svelte';
	import LegendOrdinal from '@visualisations/helpers/LegendOrdinal.svelte';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';
	import AxisBottom from '@visualisations/helpers/AxisBottom.svelte';
	import TooltipWithBounds from '@visualisations/helpers/TooltipWithBounds.svelte';
	import AxisTop from '@visualisations/helpers/AxisTop.svelte';

	export let width = 0;
	export let height = 0;

	export let margins = {
		top: 40,
		right: 10,
		bottom: 40,
		left: 50
	};

	export let x: string;
	export let y: string;
	export let color: string;
	export let data: any[];

	export let yFormat = (d: any) => d;
	export let xFormat = (d: any) => d;

	$: dimensions = {
		width,
		height,
		margins,
		innerHeight: Math.max(height - margins.top - margins.bottom, 0),
		innerWidth: Math.max(width - margins.left - margins.right, 0)
	};

	// accessors
	$: getY = (d: any) => d[y];
	$: getX = (d: any) => d[x];
	$: getColor = (d: any) => d[color];

	$: keys = [...new Set(data.map((d) => getColor(d)))];

	// scales
	$: totals = Array.from(
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

	$: xScale = scaleLinear().domain(extent(data, getX)).range([0, dimensions.innerWidth]);

	$: yScale = scaleLinear().domain([0, yMax]).range([dimensions.innerHeight, 0]).nice();

	$: colorScale = scaleOrdinal()
		.domain(keys)
		.range(['var(--colors-primary)', 'var(--colors-foreground)']);

	// stack
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

	$: areaGenerator = area()
		.x((d) => xScale(d.data[0]))
		.y0((d) => yScale(d[0]))
		.y1((d) => yScale(d[1]));

	//_ tooltip
	$: tooltip = {
		left: 0,
		top: 0,
		data: null
	};

	$: bisect = bisector(getX).left;

	$: handleMouseOver = (event: MouseEvent) => {
		const xInverted = xScale.invert(event.offsetX - margins.left);
		const xRounded = Math.min(Math.round(xInverted), xScale.domain()[1]);

		const selected = data.filter((d) => getX(d) === xRounded);

		tooltip.left = xScale(xRounded);
		tooltip.data = selected;
	};

	$: handleMouseLeave = () => (tooltip.data = null);
</script>

<div class="w-full h-full flex flex-col">
	<LegendOrdinal scale={colorScale} />
	<div class="w-full h-full relative" bind:clientWidth={width} bind:clientHeight={height}>
		<Chart {dimensions}>
			{#each stackedData as stack}
				<Area path={areaGenerator(stack)} color={colorScale(stack.key)} />
			{/each}
			<AxisTop scale={xScale} bottom={dimensions.innerHeight} hideAxisLine />
			<AxisLeft scale={yScale} formatTick={yFormat} />
			<AxisBottom scale={xScale} formatTick={xFormat} />
			{#if tooltip.data}
				<line
					x1={tooltip.left}
					x2={tooltip.left}
					y1={0}
					y2={dimensions.innerHeight}
					stroke="var(--colors-text)"
				/>
			{/if}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<rect
				width={dimensions.innerWidth}
				height={dimensions.innerHeight}
				fill="transparent"
				on:mousemove={handleMouseOver}
				on:mouseleave={handleMouseLeave}
			/>
		</Chart>
		{#if tooltip.data}
			<TooltipWithBounds
				left={tooltip.left}
				top={tooltip.top}
				parentDimensions={dimensions}
				offsetY={50}
			>
				<span class="font-bold">{getX(tooltip.data[0])}</span>
				<div class="divide-y px-1">
					{#each tooltip.data as row}
						<div class="flex justify-between items-center gap-1">
							<div class="flex gap-1 w-full items-center">
								<div
									class="w-[12px] h-[12px] rounded-full"
									style="background: {colorScale(getColor(row))}"
								/>
								<span class="whitespace-nowrap">{getColor(row)}</span>
							</div>
							<span>{yFormat(getY(row))}</span>
						</div>
					{/each}
				</div>
			</TooltipWithBounds>
		{/if}
	</div>
</div>
```

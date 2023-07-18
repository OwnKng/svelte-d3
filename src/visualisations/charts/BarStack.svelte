<script lang="ts">
	import { stack } from 'd3-shape';
	import { index, sum, max, rollup, bisector } from 'd3-array';
	import { DEFAULT_MARGIN } from '../util';
	import Chart from '../primatives/Chart.svelte';
	import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
	import { colorPalette } from '../util';

	import Bar from '@visualisations/primatives/Bar.svelte';
	import LegendOrdinal from '@visualisations/helpers/LegendOrdinal.svelte';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';
	import GridRows from '@visualisations/helpers/GridRows.svelte';
	import AxisBottom from '@visualisations/helpers/AxisBottom.svelte';
	import Tooltip from '@visualisations/helpers/Tooltip.svelte';

	import type { TooltipData } from '../types';
	import TooltipWithBounds from '@visualisations/helpers/TooltipWithBounds.svelte';

	export let margins = DEFAULT_MARGIN;
	export let width = 0;
	export let height = 0;
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

	//_ scales
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

	$: xScale = scaleBand().domain(data.map(getX)).range([0, dimensions.innerWidth]).padding(0.125);
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

	//_ tooltip
	$: tooltip = {
		left: 0,
		top: 0,
		data: null
	} as TooltipData;

	$: bisect = bisector(getX).left;

	$: handleMouseMove = (xKey: string) => {
		const highlighted = data.filter((d) => getX(d) === xKey);

		const yMax = sum(highlighted, (d: any) => getY(d));

		tooltip.left = xScale(xKey);
		tooltip.top = yScale(yMax);
		tooltip.data = highlighted;
	};

	$: handleMouseOut = () => (tooltip.data = null);
</script>

<div class="w-full h-full flex flex-col">
	<LegendOrdinal scale={colorScale} symbol="square" />
	<div class="w-full h-full relative" bind:clientWidth={width} bind:clientHeight={height}>
		{#if width > 100}
			<Chart {dimensions}>
				<GridRows scale={yScale} />
				<AxisLeft hideAxisLine={true} hideTicks={true} scale={yScale} formatTick={yFormat} />
				<AxisBottom
					hideAxisLine={true}
					hideTicks={true}
					scale={xScale}
					formatTick={xFormat}
					tickValues={dimensions.innerWidth > 400
						? xScale.domain().filter((_, i) => i % 5 === 0)
						: xScale.domain().filter((_, i) => i % 10 === 0)}
				/>

				{#each stackedData as stack}
					{#each stack as datum}
						<Bar
							x={xScale(datum.data[0])}
							y={yScale(datum[1])}
							height={yScale(datum[0]) - yScale(datum[1])}
							width={xScale.bandwidth()}
							fill={colorScale(stack.key)}
							on:mousemove={() => handleMouseMove(datum.data[0])}
							on:mouseleave={handleMouseOut}
						/>
					{/each}
				{/each}
				{#if tooltip.data}
					<rect
						x={tooltip.left}
						y={tooltip.top}
						height={dimensions.innerHeight - tooltip.top}
						width={xScale.bandwidth()}
						fill="transparent"
						style="stroke: white; pointer-events: none;"
					/>
				{/if}
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
		{/if}
	</div>
</div>

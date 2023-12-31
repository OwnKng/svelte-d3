### Multiline

```svelte
<script lang="ts">
	import { extent, group, bisector, max } from 'd3-array';
	import { DEFAULT_MARGIN, colorPalette } from '../util';
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import Line from '../primatives/Line.svelte';
	import Chart from '../primatives/Chart.svelte';
	import Axis from '../helpers/Axis.svelte';
	import Grid from '../helpers/Grid.svelte';
	import Tooltip from '../helpers/Tooltip.svelte';
	import type { TooltipData } from '../types';
	import { line } from 'd3-shape';
	import LegendOrdinal from '../helpers/LegendOrdinal.svelte';
	import { curveMonotoneX } from 'd3-shape';

	export let data: any[];
	export let x: string;
	export let y: string;
	export let color: string;

	let getX = (d: any) => d[x];
	let getY = (d: any) => d[y];
	let getColor = (d: any) => d[color];
	export let xFormat = (d: any) => d;
	export let yFormat = (d: any) => d;

	export let margins = DEFAULT_MARGIN;
	export let width = 0;
	export let height = 0;

	$: dimensions = {
		width,
		height,
		margins,
		innerHeight: Math.max(height - margins.top - margins.bottom, 0),
		innerWidth: Math.max(width - margins.left - margins.right, 0)
	};

	$: grouped = group(data, getColor);

	$: xScale = scaleLinear()
		.domain(extent(data, getX))
		.range([0, dimensions.innerWidth])
		.clamp(true);
	$: yScale = scaleLinear().domain(extent(data, getY)).range([dimensions.innerHeight, 0]).nice();
	$: colorScale = scaleOrdinal().domain(grouped.keys()).range(colorPalette);

	$: lineGenerator = (d: any) =>
		line()
			.x((d) => xScale(getX(d)))
			.y((d) => yScale(getY(d)))
			.curve(curveMonotoneX)(d) as string;

	// Tooltips
	$: tooltip = {
		left: 0,
		top: 0,
		data: null
	} as TooltipData;

	const bisect = bisector(getX).left;

	$: handleMouseOver = (event: MouseEvent) => {
		const xInverted = xScale.invert(event.offsetX - margins.left);
		const index = bisect(data, xInverted);

		const datum = data[index];

		const highlighted = data.filter((d) => getX(datum) - getX(d) === 0);
		const yMax = max(highlighted, getY);

		tooltip.data = highlighted;
		tooltip.left = xScale(getX(datum));
		tooltip.top = yScale(yMax);
	};

	$: handleMouseLeave = () => {
		tooltip.data = null;
	};
</script>

<div class="w-full h-full flex flex-col">
	<LegendOrdinal scale={colorScale} />
	<div class="w-full h-full relative" bind:clientWidth={width} bind:clientHeight={height}>
		{#if width > 100}
			<Chart {dimensions}>
				<Grid orientation="y" scale={yScale} />
				{#each grouped.keys() as group, i}
					<Line path={lineGenerator(grouped.get(group))} color={colorScale(group)} />
				{/each}
				{#if tooltip.data}
					<line
						x1={tooltip.left}
						x2={tooltip.left}
						y1={dimensions.innerHeight}
						y2={tooltip.top}
						stroke="var(--colors-grid)"
					/>
					{#each tooltip.data as row}
						<circle
							cx={xScale(getX(row))}
							cy={yScale(getY(row))}
							r={5}
							fill={colorScale(getColor(row))}
							class="stroke-slate-900"
						/>
					{/each}
				{/if}
				<Axis orientation="x" scale={xScale} formatTick={xFormat} />
				<Axis orientation="y" scale={yScale} formatTick={yFormat} />
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<rect
					width={innerWidth}
					height={innerHeight}
					on:mousemove={handleMouseOver}
					on:mouseleave={handleMouseLeave}
					fill="transparent"
				/>
			</Chart>
			{#if tooltip.data}
				<Tooltip left={tooltip.left} top={tooltip.top}>
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
				</Tooltip>
			{/if}
		{/if}
	</div>
</div>
```

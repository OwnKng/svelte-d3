<script lang="ts">
	import Chart from '../primatives/Chart.svelte';
	import { scaleLinear } from 'd3-scale';
	import { extent, min, max, bisector } from 'd3-array';
	import { DEFAULT_MARGIN } from '../util';
	import Line from '../primatives/Line.svelte';
	import Axis from '../helpers/Axis.svelte';
	import Area from '../primatives/Area.svelte';
	import { curveMonotoneX, area, line } from 'd3-shape';
	import { colorPalette } from '../util';
	import Grid from '@visualisations/helpers/Grid.svelte';
	import Tooltip from '@visualisations/helpers/Tooltip.svelte';

	export let data: any[];
	export let x: string;
	export let y: string;

	export let filled = false;
	export let color = colorPalette[0];

	export let margins = DEFAULT_MARGIN;
	export let width = 0;
	export let height = 0;
	export let yMax: number | null = null;
	export let yMin: number | null = null;

	export let xFormat = (d: any) => d;
	export let yFormat = (d: any) => d;

	//_ dimensions
	$: dimensions = {
		width,
		height,
		margins,
		innerHeight: Math.max(height - margins.top - margins.bottom, 0),
		innerWidth: Math.max(width - margins.left - margins.right, 0)
	};

	//_ accessors
	$: getX = (d: any) => d[x];
	$: getY = (d: any) => d[y];

	//_ scales
	$: xScale = scaleLinear()
		.domain(extent(data, getX))
		.range([0, dimensions.innerWidth])
		.clamp(true);

	$: yScale = scaleLinear()
		.domain([filled ? 0 : yMin ? yMin : min(data, getY), yMax ? yMax : max(data, getY)])
		.range([dimensions.innerHeight, 0])
		.nice();

	//_ data
	$: getXScaled = (d: any) => xScale(getX(d));
	$: getYScaled = (d: any) => yScale(getY(d));

	$: path = line().x(getXScaled).y(getYScaled).curve(curveMonotoneX)(data) as string;

	$: areaPath = area()
		.x(getXScaled)
		.y0(() => yScale(0))
		.y1(getYScaled)
		.curve(curveMonotoneX)(data) as string;

	// tooltip
	$: tooltip = {
		left: 0,
		top: 0,
		data: null
	};

	$: bisect = bisector(getX).left;

	$: handleMouseOver = (event: MouseEvent) => {
		const xInverted = xScale.invert(event.offsetX - margins.left);
		const index = bisect(data, xInverted, 0);

		const datum = data[index];

		tooltip.data = datum;
		tooltip.left = getXScaled(datum) + margins.left;
		tooltip.top = getYScaled(datum) - 10;
	};

	$: handleMouseLeave = () => {
		tooltip.data = null;
	};
</script>

<div class="relative w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
	{#if width > 100}
		<Chart {dimensions}>
			<Grid orientation="y" scale={yScale} />
			{#if filled}
				<Area path={areaPath} {color} opacity={0.2} />
			{/if}
			<Line {path} {color} />
			<Axis orientation="x" scale={xScale} numberOfTicks={3} formatTick={xFormat} />
			<Axis
				orientation="y"
				scale={yScale}
				formatTick={yFormat}
				hideAxisLine={true}
				hideTicks={true}
			/>
			{#if tooltip.data}
				<circle
					cx={getXScaled(tooltip.data)}
					cy={getYScaled(tooltip.data)}
					r={10}
					fill={color}
					stroke="black"
				/>
			{/if}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<rect
				width={innerWidth}
				height={innerHeight}
				fill="transparent"
				on:mousemove={handleMouseOver}
				on:mouseleave={handleMouseLeave}
			/>
		</Chart>
		{#if tooltip.data}
			<Tooltip left={tooltip.left} top={tooltip.top}>
				{yFormat(getY(tooltip.data))}
			</Tooltip>
		{/if}
	{/if}
</div>

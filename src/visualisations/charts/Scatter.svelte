<script lang="ts">
	import { DEFAULT_MARGIN } from '../util';
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import { extent } from 'd3-array';
	import Chart from '../primatives/Chart.svelte';
	import Circle from '../primatives/Circle.svelte';
	import Axis from '../helpers/Axis.svelte';
	import Tooltip from '../helpers/Tooltip.svelte';
	import LegendOrdinal from '../helpers/LegendOrdinal.svelte';
	import { Delaunay } from 'd3-delaunay';
	import { colorPalette } from '../util';
	import { format } from 'd3-format';
	import Panel from '@visualisations/helpers/Panel.svelte';

	export let margins = DEFAULT_MARGIN;
	export let width = 0;
	export let height = 0;

	export let x: string;
	export let y: string;
	export let color: string;

	export let data: any[];
	export let xFormat = (x: number) => format(',')(x);
	export let yFormat = (y: number) => format(',')(y);
	export let colors = colorPalette;

	// dimensions
	$: dimensions = {
		width,
		height,
		margins,
		innerHeight: Math.max(height - margins.top - margins.bottom, 0),
		innerWidth: Math.max(width - margins.left - margins.right, 0)
	};

	//_ Accessors
	$: getY = (d: any) => d[y];
	$: getX = (d: any) => d[x];
	$: getColor = (d: any) => d[color];

	//_ scales
	$: xScale = scaleLinear().domain(extent(data, getX)).range([0, dimensions.innerWidth]).nice();
	$: yScale = scaleLinear().domain(extent(data, getY)).range([dimensions.innerHeight, 0]).nice();
	$: colorScale = scaleOrdinal()
		.domain([...new Set(data.map(getColor))])
		.range(colors);

	//_ data
	$: getXScaled = (d: any) => xScale(getX(d));
	$: getYScaled = (d: any) => yScale(getY(d));
	$: getColorScaled = (d: any) => colorScale(getColor(d)) as string;

	//_ tooltip
	$: voronoi = Delaunay.from(data.map((d) => [getXScaled(d), getYScaled(d)]));

	$: tooltipLeft = 0;
	$: tooltipTop = 0;
	$: tooltipData = null;

	$: handleMouseOver = (event: MouseEvent) => {
		const x = event.offsetX - margins.left;
		const y = event.offsetY - margins.top;

		const index = voronoi.find(x, y);
		const tooltipPoint = data[index];

		if (tooltipPoint) {
			tooltipData = tooltipPoint;
			tooltipLeft = getXScaled(tooltipPoint) + margins.left;
			tooltipTop = getYScaled(tooltipPoint) + margins.bottom + 10;
		}
	};
</script>

<div class="w-full h-full flex flex-col">
	<div>
		<LegendOrdinal scale={colorScale} />
	</div>
	<div class="w-full h-full relative" bind:clientWidth={width} bind:clientHeight={height}>
		{#if width > 100}
			<Chart {dimensions}>
				<Panel width={dimensions.innerWidth} height={dimensions.innerHeight} {xScale} {yScale} />
				<Axis scale={xScale} orientation="x" formatTick={xFormat} />
				<Axis scale={yScale} orientation="y" formatTick={yFormat} />
				{#each data as datum, i}
					<Circle
						x={getXScaled(datum)}
						y={getYScaled(datum)}
						radius={10}
						fill={getColorScaled(datum)}
						stroke={tooltipData && tooltipData === datum ? 'white' : 'transparent'}
					/>
				{/each}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<rect
					width={dimensions.innerWidth}
					height={dimensions.innerHeight}
					on:mousemove={handleMouseOver}
					on:mouseleave={() => (tooltipData = null)}
					fill="transparent"
				/>
			</Chart>
			{#if tooltipData}
				<Tooltip left={tooltipLeft} top={tooltipTop}>
					<span class="px-2 text-slate-900">{getColor(tooltipData)}</span>
				</Tooltip>
			{/if}
		{/if}
	</div>
</div>

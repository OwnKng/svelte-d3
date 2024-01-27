<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleLinear } from 'd3-scale';
	import { area, curveMonotoneX, line } from 'd3-shape';
	import { extent, bisector } from 'd3-array';
	import ClipPath from '@visualisations/helpers/ClipPath.svelte';
	import AxisBottom from '@visualisations/helpers/AxisBottom.svelte';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';
	import Panel from '@visualisations/helpers/Panel.svelte';
	import Tooltip from '@visualisations/helpers/Tooltip.svelte';

	export let data: any[];
	export let x: string;
	export let y: string;
	export let margins = { top: 30, right: 20, bottom: 40, left: 60 };
	export let threshold = 0;
	export let id = Math.random();
	export let aboveColor = '#22d3ee';
	export let belowColor = '#ef4444';
	export let yFormat = (d: any) => d;

	let width = 0;
	let height = 0;

	$: dimensions = {
		width: width,
		height: height,
		margins: margins,
		innerWidth: width - margins.left - margins.right,
		innerHeight: height - margins.top - margins.bottom
	};

	$: getX = (d: any) => d[x];
	$: getY = (d: any) => d[y];

	// Scale
	$: xScale = scaleLinear(extent(data, getX), [0, dimensions.innerWidth]).clamp(true);
	$: yScale = scaleLinear(extent(data, getY), [dimensions.innerHeight, 0]).nice();

	//
	$: below = data.map((d) => (getY(d) < threshold ? d : { ...d, y: threshold }));
	$: above = data.map((d) => (getY(d) >= threshold ? d : { ...d, y: threshold }));

	// Clip paths
	$: belowPath = area()
		.x((d) => xScale(getX(d)))
		.y0(() => yScale(yScale.domain()[0]))
		.y1(() => yScale(threshold))
		.curve(curveMonotoneX);

	$: abovePath = area()
		.x((d) => xScale(getX(d)))
		.y0(() => yScale(yScale.domain()[1]))
		.y1(() => yScale(threshold))
		.curve(curveMonotoneX);

	// Area
	$: areaGenerator = area()
		.x((d) => xScale(getX(d)))
		.y0(() => yScale(threshold))
		.y1((d) => yScale(getY(d)))
		.curve(curveMonotoneX);

	// Line
	$: lineGenerator = line()
		.x((d) => xScale(getX(d)))
		.y((d) => yScale(getY(d)))
		.curve(curveMonotoneX);

	// Interaction
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
		tooltip.left = xScale(getX(datum)) + margins.left;
		tooltip.top = yScale(getY(datum)) - 10;
	};

	$: handleMouseLeave = () => {
		tooltip.data = null;
	};
</script>

<div class="w-full h-full" bind:clientHeight={height} bind:clientWidth={width}>
	<Chart {dimensions}>
		<Panel {xScale} {yScale} width={dimensions.innerWidth} height={dimensions.innerHeight} />
		<g>
			<ClipPath id="above-clip-path-{id}">
				<path d={abovePath(above)} />
			</ClipPath>
			<ClipPath id="below-clip-path-{id}">
				<path d={belowPath(below)} />
			</ClipPath>
		</g>
		<path
			d={areaGenerator(data)}
			clip-path="url(#above-clip-path-{id})"
			stroke-width={0}
			opacity={0.5}
			fill={aboveColor}
		/>
		<path
			d={areaGenerator(data)}
			clip-path="url(#below-clip-path-{id})"
			stroke-width={0}
			opacity={0.5}
			fill={belowColor}
		/>
		<path
			d={lineGenerator(above)}
			stroke={aboveColor}
			fill="none"
			clip-path="url(#above-clip-path-{id})"
			stroke-width={2}
		/>
		<path
			d={lineGenerator(below)}
			stroke={belowColor}
			fill="none"
			clip-path="url(#below-clip-path-{id})"
			stroke-width={2}
		/>
		<line
			x1={0}
			x2={dimensions.innerWidth}
			y1={yScale(threshold)}
			y2={yScale(threshold)}
			stroke="var(--colors-text)"
		/>
		{#if tooltip.data}
			<circle
				cx={xScale(getX(tooltip.data))}
				cy={yScale(getY(tooltip.data))}
				r={6}
				stroke="var(--colors-midnight)"
				fill={getY(tooltip.data) < threshold ? belowColor : aboveColor}
			/>
		{/if}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<rect
			x={0}
			y={0}
			width={dimensions.innerWidth}
			height={dimensions.innerHeight}
			fill="transparent"
			on:mousemove={handleMouseOver}
			on:mouseleave={handleMouseLeave}
		/>
		<AxisBottom scale={xScale} hideAxisLine hideTicks />
		<AxisLeft scale={yScale} hideAxisLine hideTicks formatTick={yFormat} />
	</Chart>
	{#if tooltip.data}
		<Tooltip left={tooltip.left} top={tooltip.top}>
			{yFormat(getY(tooltip.data))}
		</Tooltip>
	{/if}
</div>

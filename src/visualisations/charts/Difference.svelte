<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import { extent, min, max, bisector } from 'd3-array';
	import { curveMonotoneX, line, area } from 'd3-shape';
	import AxisBottom from '@visualisations/helpers/AxisBottom.svelte';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';
	import ClipPath from '@visualisations/helpers/ClipPath.svelte';
	import Panel from '@visualisations/helpers/Panel.svelte';
	import Tooltip from '@visualisations/helpers/Tooltip.svelte';
	import LegendOrdinal from '@visualisations/helpers/LegendOrdinal.svelte';

	export let data: any[];
	export let margins = { top: 30, right: 20, bottom: 40, left: 60 };
	export let x: string;
	export let y0: string;
	export let y1: string;
	export let id = Math.random();
	export let yFormat = (d: any) => d;
	export let colors = ['#34d399', '#C1EEFF'];

	let width = 0;
	let height = 0;

	$: dimensions = {
		width: width,
		height: height,
		margins: margins,
		innerWidth: width - margins.left - margins.right,
		innerHeight: height - margins.top - margins.bottom
	};

	// Accessors
	$: getX = (d: any) => d[x];
	$: getY0 = (d: any) => d[y0];
	$: getY1 = (d: any) => d[y1];

	$: xScale = scaleLinear(extent(data, getX), [0, dimensions.innerWidth]).clamp(true);

	$: yMin = Math.min(min(data, getY0), min(data, getY1));
	$: yMax = Math.max(max(data, getY0), max(data, getY1));

	$: yScale = scaleLinear([yMin, yMax], [dimensions.innerHeight, 0]).nice();
	$: colorScale = scaleOrdinal([y0, y1], colors);

	// Clip paths
	$: belowPath = area()
		.x((d) => xScale(getX(d)))
		.y0(() => yScale(yScale.domain()[0] || 0))
		.y1((d) => yScale(getY1(d)))
		.curve(curveMonotoneX);

	$: abovePath = area()
		.x((d) => xScale(getX(d)))
		.y0(() => yScale(yScale.domain()[1]))
		.y1((d) => yScale(getY1(d)))
		.curve(curveMonotoneX);

	$: areaGenerator = area()
		.x((d) => xScale(getX(d)))
		.y0((d) => yScale(getY0(d)))
		.y1((d) => yScale(getY1(d)))
		.curve(curveMonotoneX);

	$: pathGeneratorY0 = line()
		.x((d) => xScale(getX(d)))
		.y((d) => yScale(getY0(d)))
		.curve(curveMonotoneX);

	$: pathGeneratorY1 = line()
		.x((d) => xScale(getX(d)))
		.y((d) => yScale(getY1(d)))
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
		const index = bisect(data, xInverted);

		const datum = data[index];

		const highlighted = data.find((d) => getX(datum) - getX(d) === 0);
		const yMax = Math.max(getY0(highlighted), getY1(highlighted));

		tooltip.data = highlighted;
		tooltip.left = xScale(getX(datum));
		tooltip.top = yScale(yMax);
	};

	$: handleMouseLeave = () => (tooltip.data = null);
</script>

<div class="w-full h-full flex flex-col">
	<LegendOrdinal scale={colorScale} />
	<div class="w-full h-full flex flex-col relative">
		<div class="w-full h-full" bind:clientHeight={height} bind:clientWidth={width}>
			<Chart {dimensions}>
				<g>
					<ClipPath id="threshold-clip-below-{id}">
						<path d={belowPath(data)} />
					</ClipPath>
					<ClipPath id="threshold-clip-above-{id}">
						<path d={abovePath(data)} />
					</ClipPath>
				</g>
				<Panel {xScale} {yScale} height={dimensions.innerHeight} width={dimensions.innerWidth} />
				<path
					d={areaGenerator(data)}
					clip-path={`url(#threshold-clip-below-${id})`}
					fill={colorScale(y1)}
					stroke-width={0}
					opacity={0.5}
				/>
				<path
					d={areaGenerator(data)}
					clip-path={`url(#threshold-clip-above-${id})`}
					fill={colorScale(y0)}
					stroke-width={0}
					opacity={0.5}
				/>
				<path d={pathGeneratorY1(data)} stroke={colorScale(y1)} fill="none" stroke-width={2} />
				<path d={pathGeneratorY0(data)} stroke={colorScale(y0)} fill="none" stroke-width={2} />
				<AxisBottom scale={xScale} />
				<AxisLeft scale={yScale} hideAxisLine hideTicks formatTick={yFormat} />
				{#if tooltip.data}
					<g>
						<line
							x1={tooltip.left}
							x2={tooltip.left}
							y1={yScale(getY0(tooltip.data))}
							y2={yScale(getY1(tooltip.data))}
							stroke="var(--colors-grid)"
						/>
						<circle
							cx={xScale(getX(tooltip.data))}
							cy={yScale(getY0(tooltip.data))}
							r="6"
							stroke="var(--colors-grid)"
							fill={colorScale(y0)}
						/>
						<circle
							cx={xScale(getX(tooltip.data))}
							cy={yScale(getY1(tooltip.data))}
							r="6"
							stroke="var(--colors-grid)"
							fill={colorScale(y1)}
						/>
					</g>
				{/if}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<rect
					width={dimensions.innerWidth}
					height={dimensions.innerHeight}
					on:mousemove={handleMouseOver}
					on:mouseleave={handleMouseLeave}
					fill="transparent"
				/>
			</Chart>
			{#if tooltip.data}
				<Tooltip left={tooltip.left} top={tooltip.top}>
					<span class="font-bold">{getX(tooltip.data)}</span>
					<div class="divide-y px-1">
						<div class="flex gap-1 w-full items-center">
							<div
								class="w-[12px] h-[12px] rounded-full"
								style={`background-color: ${colorScale(y1)};`}
							/>
							<span>{yFormat(getY1(tooltip.data))}</span>
						</div>
						<div class="flex gap-1 w-full items-center">
							<div
								class="w-[12px] h-[12px] rounded-full"
								style={`background-color: ${colorScale(y0)};`}
							/>
							<span>{yFormat(getY0(tooltip.data))}</span>
						</div>
					</div>
				</Tooltip>
			{/if}
		</div>
	</div>
</div>

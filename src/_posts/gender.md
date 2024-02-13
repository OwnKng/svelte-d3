```svelte
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
	import { onMount } from 'svelte';
	import { format } from 'd3-format';
	import { createSlider, melt } from '@melt-ui/svelte';

	export let data: {
		age: number;
		country: string;
		year: number;
		female: number;
		male: number;
	}[] = [];

	export let margins = { top: 30, right: 10, bottom: 60, left: 60 };

	export let x = 'age';
	export let y0 = 'male';
	export let y1 = 'female';

	export let id = Math.random();
	export let yFormat = (d: any) => format('.3s')(d);
	export let colors = ['#F4D06F', '#C1EEFF'];

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
		const index = bisect(filtered, xInverted);

		const datum = filtered[index];

		const highlighted = filtered.find((d) => getX(datum) - getX(d) === 0);
		const yMax = Math.max(getY0(highlighted), getY1(highlighted));

		tooltip.data = highlighted;
		tooltip.left = xScale(getX(datum));
		tooltip.top = yScale(yMax);
	};

	$: handleMouseLeave = () => (tooltip.data = null);

	//_ Managing transitions
	const {
		elements: { root, range, thumbs },
		states: { value }
	} = createSlider({
		defaultValue: [1950],
		min: 1950,
		max: 2021,
		step: 1
	});

	$: filtered = data.filter((pop) => pop.year === $value[0]);
	let paused = false;

	onMount(() => {
		const interval = setInterval(() => {
			if (paused) return;
			value.update((val) => [val[0] + 1]);

			if ($value[0] === 2021) {
				value.set([1950]);
			}
		}, 100);

		return () => clearInterval(interval);
	});
</script>

<div>
	<div class="w-full flex gap-2">
		<span style="color: {colorScale(y0)}">More men</span>
		<span style="color: {colorScale(y1)}">More women</span>
	</div>
	<div class="flex gap-2 items-center">
		<button
			class="bg-midnight-75 px-2 py-1 rounded shadow border border-midnight-25 text-sm shadow"
			on:click={() => (paused = !paused)}
			aria-label={paused ? 'Play' : 'Pause'}
		>
			{#if paused}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-play"
					viewBox="0 0 16 16"
				>
					<path
						d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-pause"
					viewBox="0 0 16 16"
				>
					<path
						d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"
					/>
				</svg>
			{/if}
		</button>
		<span use:melt={$root} class="relative flex h-[20px] w-full items-center">
			<span class="h-[3px] w-full bg-midnight-25">
				<span use:melt={$range} class="h-[3px] bg-white" />
			</span>
			<span
				use:melt={$thumbs[0]}
				class="h-5 w-5 rounded-full bg-white border border-midnight focus:ring-4 focus:!ring-black/40"
			/>
		</span>
	</div>
	<div class="w-full h-graph flex flex-col relative">
		<div class="w-full h-full" bind:clientHeight={height} bind:clientWidth={width}>
			<Chart {dimensions}>
				<g>
					<ClipPath id="threshold-clip-below-{id}">
						<path d={belowPath(filtered)} />
					</ClipPath>
					<ClipPath id="threshold-clip-above-{id}">
						<path d={abovePath(filtered)} />
					</ClipPath>
				</g>
				<Panel {xScale} {yScale} height={dimensions.innerHeight} width={dimensions.innerWidth} />
				<path
					d={areaGenerator(filtered)}
					clip-path={`url(#threshold-clip-below-${id})`}
					fill={colorScale(y1)}
					stroke-width={0}
					opacity={0.5}
				/>
				<path
					d={areaGenerator(filtered)}
					clip-path={`url(#threshold-clip-above-${id})`}
					fill={colorScale(y0)}
					stroke-width={0}
					opacity={0.5}
				/>
				<path d={pathGeneratorY1(filtered)} stroke={colorScale(y1)} fill="none" stroke-width={2} />
				<path d={pathGeneratorY0(filtered)} stroke={colorScale(y0)} fill="none" stroke-width={2} />
				<AxisBottom scale={xScale} label="Age in years" />
				<AxisLeft
					scale={yScale}
					hideAxisLine
					hideTicks
					formatTick={yFormat}
					label="Population, '000s"
				/>
				<text
					text-anchor="end"
					alignment-baseline="middle"
					font-size="28px"
					fill="var(--colors-text)"
					stroke="var(--colors-text)"
					paint-order="stroke"
					x={dimensions.innerWidth}
					y={margins.top}>{$value[0]}</text
				>
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
```

### Arrows

```svelte
<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleLinear, scaleLog } from 'd3-scale';
	import { extent } from 'd3-array';
	import AxisBottom from '@visualisations/helpers/AxisBottom.svelte';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';
	import Arrow from '@visualisations/primatives/Arrow.svelte';
	import Gradient from '@visualisations/helpers/Gradient.svelte';
	import { Delaunay } from 'd3-delaunay';
	import Tooltip from '@visualisations/helpers/Tooltip.svelte';
	import Grid from '@visualisations/helpers/Grid.svelte';
	import AxisTop from '@visualisations/helpers/AxisTop.svelte';

	export let data: any[];
	export let x1: string;
	export let x2: string;
	export let y1: string;
	export let y2: string;
	export let label: string;
	export let margins = { top: 20, right: 20, bottom: 80, left: 80 };
	export let startColor = '#cffafe';
	export let endColor = '#06b6d4';
	export let formatX = (d: any) => d;
	export let formatY = (d: any) => d;
	export let xLabel = '';
	export let yLabel = '';

	$: colors = [startColor, endColor];
	$: ids = new Array(data.length).fill(0).map(() => crypto.randomUUID());

	const arrowId = crypto.randomUUID();

	// Dimensions
	let width = 0;
	let height = 0;

	$: dimensions = {
		width,
		height,
		margins,
		innerWidth: width - margins.left - margins.right,
		innerHeight: height - margins.top - margins.bottom
	};

	// Accessors
	$: getX1 = (d: any) => d[x1];
	$: getX2 = (d: any) => d[x2];
	$: getY1 = (d: any) => d[y1];
	$: getY2 = (d: any) => d[y2];
	$: getLabel = (d: any) => d[label];

	// Scales
	$: [yMin, yMax] = extent([...extent(data, getY1), ...extent(data, getY2)]);

	$: [xMin, xMax] = extent([...extent(data, getX1), ...extent(data, getX2)]);

	$: xScale = scaleLog([xMin, xMax], [0, dimensions.innerWidth]).nice();

	$: yScale = scaleLinear([yMin, yMax], [dimensions.innerHeight, 0]).nice();

	// Interactivity
	let tooltip = {
		left: 0,
		top: 0,
		data: null
	};

	$: delaunay = Delaunay.from(data.map((d) => [xScale(getX1(d)), yScale(getY1(d))]));

	$: handleMouseOver = (event: MouseEvent) => {
		const x = event.offsetX - margins.left;
		const y = event.offsetY - margins.top;

		const index = delaunay.find(x, y);
		const tooltipPoint = data[index];

		if (tooltipPoint) {
			tooltip.data = tooltipPoint;
			tooltip.left = xScale(getX1(tooltipPoint)) + margins.left;
			tooltip.top = yScale(getY1(tooltipPoint)) + margins.bottom + 12;
		}
	};
</script>

<div class="w-full h-full relative" bind:clientWidth={width} bind:clientHeight={height}>
	<Chart {dimensions}>
		<defs>
			<marker
				id="arrow"
				viewBox="0 0 10 10"
				refX="5"
				refY="2.5"
				markerWidth="10"
				markerHeight="10"
				orient="auto"
			>
				<path d="M0,0v5l7,-2.5Z" fill={endColor} />
			</marker>
			{#each data as datum, i}
				<Gradient
					id={ids[i]}
					x1={xScale(getX1(datum))}
					x2={xScale(getX2(datum))}
					y1={yScale(getY1(datum))}
					y2={yScale(getY2(datum))}
					{colors}
				/>
			{/each}
		</defs>
		<Grid scale={xScale} numberOfTicks={3} />
		<AxisBottom scale={xScale} formatTick={formatX} numberOfTicks={3} label={xLabel} />
		<AxisLeft scale={yScale} formatTick={formatY} label={yLabel} />
		<AxisTop
			scale={xScale}
			formatTick={formatX}
			numberOfTicks={3}
			bottom={dimensions.innerHeight}
			hideAxisLine
			hideTicks
		/>
		{#each data as datum, i}
			<Arrow
				id={arrowId}
				x1={xScale(getX1(datum))}
				x2={xScale(getX2(datum))}
				y1={yScale(getY1(datum))}
				y2={yScale(getY2(datum))}
				style="stroke: url(#{ids[i]}); opacity: {tooltip.data
					? tooltip.data === datum
						? 1.0
						: 0.25
					: 1.0};"
			/>
		{/each}
		{#each data as datum}
			<circle
				cx={xScale(getX1(datum))}
				cy={yScale(getY1(datum))}
				r={3}
				fill="#cffafe"
				stroke="var(--colors-background)"
			/>
		{/each}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<rect
			x={0}
			y={0}
			width={dimensions.innerWidth}
			height={dimensions.innerHeight}
			fill="transparent"
			on:mousemove={handleMouseOver}
			on:mouseleave={() => (tooltip.data = null)}
		/>
	</Chart>
	{#if tooltip.data}
		<Tooltip left={tooltip.left} top={tooltip.top}>
			<span class="px-2 text-slate-900">{getLabel(tooltip.data)}</span>
		</Tooltip>
	{/if}
</div>
```

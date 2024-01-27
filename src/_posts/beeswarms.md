### Beeswarms

```svelte
<script lang="ts">
	import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';
	import { scaleSqrt, scaleOrdinal, scaleLog, scaleBand } from 'd3-scale';
	import { extent, median } from 'd3-array';
	import Chart from '@visualisations/primatives/Chart.svelte';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';
	import AxisBottom from '@visualisations/helpers/AxisBottom.svelte';
	import Grid from '@visualisations/helpers/Grid.svelte';
	import type { D3ForceSimulation } from 'd3-force';
	import Tooltip from '@visualisations/helpers/Tooltip.svelte';
	import Circle from '@visualisations/primatives/Circle.svelte';

	export let data: any[];
	export let y: string;
	export let x: string;
	export let radius: string;
	export let margins = { top: 30, right: 15, bottom: 40, left: 80 };
	export let color: string;
	export let xFormat: (d: any) => string = (d) => d;
	export let label: string;

	let width = 0;
	let height = 0;

	$: dimensions = {
		width: width,
		height: height,
		margins: margins,
		innerWidth: width - margins.left - margins.right,
		innerHeight: height - margins.top - margins.bottom
	};

	// Acessors
	$: getX = (d: any) => d[x];
	$: getY = (d: any) => d[y];
	$: getRadius = (d: any) => d[radius];
	$: getColor = (d: any) => d[color];
	$: getLabel = (d: any) => d[label];

	// Scales
	$: xScale = scaleLog(extent(data, getX), [0, dimensions.innerWidth]).nice();

	$: yKeys = [...new Set(data.map(getY))].sort(
		(a, b) =>
			median(data.filter((d) => getY(d) === a).map(getX)) -
			median(data.filter((d) => getY(d) === b).map(getX))
	);

	$: yScale = scaleBand(yKeys, [dimensions.innerHeight, 0]);

	$: rScale = scaleSqrt(extent(data, getRadius), [2, 28]);

	$: colorKeys = [...new Set(data.map(getColor))];
	$: colorScale = scaleOrdinal(colorKeys, ['#f472b6', '#0dcaf0', '#c084fc', '#4fd1c5', '#f6ad55']);

	// Interaction
	let selectedNode: { x: number; y: number } | null = null;

	function handleMouse(event: MouseEvent, nodes: any[]) {
		if (!simulation) return null;

		const x = event.offsetX - margins.left;
		const y = event.offsetY - margins.top;

		const node = simulation.find(x, y);

		selectedNode = node;
	}

	// Simulation
	let nodes: any = [];
	let simulation = null as D3ForceSimulation | null;

	$: {
		nodes = data.map((d) => ({ ...d }));

		simulation = forceSimulation(nodes)
			.force('y', forceY((d) => yScale(getY(d)) + yScale.bandwidth() / 2).strength(0.5))
			.force('x', forceX((d) => xScale(getX(d))).strength(0.25))
			.force(
				'collide',
				forceCollide((d) => rScale(getRadius(d)) + 1)
			)
			.stop()
			.tick(300);
	}
</script>

<div class="w-full h-full relative" bind:clientHeight={height} bind:clientWidth={width}>
	{#if width > 100}
		<Chart {dimensions}>
			<AxisLeft scale={yScale} />
			<AxisBottom scale={xScale} formatTick={xFormat} />
			<rect
				x={0}
				y={0}
				width={dimensions.innerWidth}
				height={dimensions.innerHeight}
				fill="var(--colors-foreground)"
				stroke="var(--colors-grid)"
			/>
			<Grid orientation="x" scale={xScale} />
			{#each nodes as node}
				<Circle
					x={node.x}
					y={node.y}
					radius={rScale(getRadius(node))}
					fill={colorScale(getColor(node))}
					stroke="none"
				/>
			{/each}
			{#if selectedNode}
				<circle
					cx={selectedNode.x}
					cy={selectedNode.y}
					r={rScale(getRadius(selectedNode))}
					fill="none"
					stroke="white"
					stroke-width="2"
				/>
			{/if}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<rect
				x={0}
				y={0}
				width={dimensions.innerWidth}
				height={dimensions.innerHeight}
				fill="transparent"
				on:mousemove={(event) => handleMouse(event, nodes)}
			/>
		</Chart>
		{#if selectedNode}
			<Tooltip
				left={selectedNode.x + margins.left}
				top={selectedNode.y + margins.top}
				offsetX={10}
				offsetY={10}
			>
				{getLabel(selectedNode)}
			</Tooltip>
		{/if}
	{/if}
</div>
```

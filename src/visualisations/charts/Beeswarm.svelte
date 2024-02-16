<script lang="ts">
	import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';
	import { scaleSqrt, scaleOrdinal, scaleLog } from 'd3-scale';
	import { extent } from 'd3-array';
	import { drawNodes } from '../helpers/simulations';
	import type { D3ForceSimulation } from 'd3-force';
	import Chart from '@visualisations/primatives/Chart.svelte';

	import TooltipWithBounds from '@visualisations/helpers/TooltipWithBounds.svelte';

	import AxisTop from '@visualisations/helpers/AxisTop.svelte';
	import LegendOrdinal from '@visualisations/helpers/LegendOrdinal.svelte';
	import Grid from '@visualisations/helpers/Grid.svelte';

	export let data: any[];

	export let x: string;
	export let radius: string;
	export let margins = { top: 30, right: 20, bottom: 40, left: 60 };
	export let label: string;
	export let color: string;
	export let xFormat: (d: any) => string = (d) => d;

	let width = 0;
	let height = 400;

	$: dimensions = {
		width: width,
		height: height,
		margins: margins,
		innerWidth: width - margins.left - margins.right,
		innerHeight: height - margins.top - margins.bottom
	};

	// Acessors
	$: getX = (d: any) => d[x];
	$: getRadius = (d: any) => d[radius];
	$: getLabel = (d: any) => d[label];
	$: getColor = (d: any) => d[color];

	// Scales
	$: xScale = scaleLog(extent(data, getX), [0, dimensions.innerWidth]).nice();
	$: rScale = scaleSqrt(extent(data, getRadius), [2, width < 400 ? 12 : 32]);
	$: colorScale = scaleOrdinal(
		[...new Set(data.map(getColor))],
		['#5de4c7', '#f6e05e', '#f6ad55', '#fc8181', '#90cdf4', '#a0aec0']
	);

	// Simulation
	let canvas: HTMLCanvasElement;

	let nodes: any[];

	let simulation: D3ForceSimulation;

	$: if (canvas) {
		canvas.width = dimensions.innerWidth;
		canvas.height = dimensions.innerHeight;

		nodes = data.map((d) => ({ ...d }));

		simulation = forceSimulation(nodes)
			.force('y', forceY(() => dimensions.innerHeight * 0.5).strength(0.1))
			.force('x', forceX((d) => xScale(getX(d))).strength(0.25))
			.force(
				'collide',
				forceCollide((d) => rScale(getRadius(d)) + 1)
			)
			.on('tick', () =>
				drawNodes({
					canvas: canvas,
					nodes: nodes,
					nodeRadius: (d) => rScale(getRadius(d)),
					nodeFill: (d) => colorScale(getColor(d))
				})
			);
	}

	// Interaction
	let selectedNode: { x: number; y: number } | null = null;

	function handleMouse(event: MouseEvent, nodes: any[]) {
		if (!simulation) return null;

		const x = event.offsetX;
		const y = event.offsetY;

		const node = simulation.find(x, y);

		selectedNode = node;
	}
</script>

<div class="w-full h-full flex flex-col gap-2">
	<div>
		<LegendOrdinal scale={colorScale} direction="row" />
	</div>
	<div class="w-full h-full relative" bind:clientHeight={height} bind:clientWidth={width}>
		{#if width > 100}
			<Chart {dimensions}>
				<AxisTop
					scale={xScale}
					formatTick={xFormat}
					bottom={dimensions.innerHeight}
					hideAxisLine
					hideTicks
				/>
				{#if selectedNode}
					<circle
						cx={selectedNode.x}
						cy={selectedNode.y}
						r={rScale(getRadius(selectedNode))}
						fill="var(--colors-foreground)"
						stroke="white"
						stroke-width="2"
					/>
				{/if}
				<Grid orientation="x" scale={xScale} />
			</Chart>
			<canvas
				class="absolute"
				style="left: {margins.left}px; top:{margins.top}px"
				bind:this={canvas}
				on:mousemove={(event) => handleMouse(event, nodes)}
				on:mouseleave={() => (selectedNode = null)}
			/>
			{#if selectedNode}
				<TooltipWithBounds
					left={selectedNode.x + margins.left}
					top={selectedNode.y + margins.top}
					offsetX={10}
					offsetY={10}
				>
					{getLabel(selectedNode)}
				</TooltipWithBounds>
			{/if}
		{/if}
	</div>
</div>

<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import Arrow from './ArrowStraight.svelte';
	import { range } from 'd3-array';
	import { line, curveBasisClosed } from 'd3-shape';

	let width = 0;
	let height = 0;
	let margins = { top: 20, left: 20, right: 20, bottom: 20 };

	const points = range(0, Math.PI * 2, Math.PI * 0.25);

	$: dimensions = {
		width,
		height,
		margins,
		innerWidth: width - margins.left - margins.right,
		innerHeight: height - margins.top - margins.bottom
	};

	$: radius = Math.min(dimensions.innerWidth, dimensions.innerHeight) / 2;

	const pollar = (theta: number, radius: number) => [
		Math.cos(theta) * radius,
		-Math.sin(theta) * radius
	];

	// Text labels
	$: circlePoints = range(0, Math.PI * 4, Math.PI * 0.01)
		.reverse()
		.map((d) => pollar(d, radius));
	$: path = line()
		.x(([x]) => x)
		.y(([_, y]) => y)
		.curve(curveBasisClosed)(circlePoints);
</script>

<div class="w-full h-full" bind:clientHeight={height} bind:clientWidth={width}>
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
				fill="var(--colors-midnight-25)"
			>
				<path d="M0,0v5l7,-2.5Z" />
			</marker>
		</defs>
		<g transform={`translate(${dimensions.innerWidth / 2}, ${dimensions.innerHeight / 2})`}>
			{#each points as point}
				{@const [x, y] = pollar(point, radius * 0.95)}
				{@const [x2, y2] = pollar(point, dimensions.innerWidth)}
				<line x1={0} y1={0} {x2} {y2} stroke="var(--colors-foreground)" />
				<Arrow x1={0} y1={0} x2={x} y2={y} color="var(--colors-midnight-25)" />
			{/each}
			<path
				d={path}
				id="textPath"
				fill="transparent"
				stroke="var(--colors-midnight-25)"
				stroke-width="2"
			/>
		</g>
	</Chart>
</div>

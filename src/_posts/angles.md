### Angles

```svelte
<script>
	import Chart from '@visualisations/primatives/Chart.svelte';
	import Group from '@visualisations/primatives/Group.svelte';
	import Arc from '@visualisations/primatives/Arc.svelte';
	import { scaleBand } from 'd3-scale';

	export let startAngle = 0;
	export let endAngle = 0;
	export let thickness = 10;

	let width = 0;
	let height = 0;
	const margins = { top: 40, right: 40, bottom: 40, left: 40 };

	$: dimensions = {
		width: width,
		height: height,
		margins: margins,
		innerWidth: Math.max(width - margins.left - margins.right, 0),
		innerHeight: Math.max(height - margins.top - margins.bottom, 0)
	};

	$: outerRadius = Math.min(dimensions.innerWidth, dimensions.innerHeight) / 2;
	$: innerRadius = outerRadius * 0.75;
	$: labelRadius = outerRadius * 1.1;

	$: hasPassed = startAngle > endAngle;
	$: end = hasPassed ? 2 * Math.PI + endAngle : endAngle;

	$: labels = Array.from(
		{ length: 12 },
		(_, i) => Math.round(((i * 30 * Math.PI) / 180) * 10) / 10
	);

	$: scale = scaleBand()
		.domain(labels)
		.range([0, 2 * Math.PI]);

	// Ticks
	$: ticks = Array.from({ length: 60 }, (_, i) => i);
</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
	<Chart {dimensions}>
		<Group left={dimensions.innerWidth / 2} top={dimensions.innerHeight / 2}>
			<Arc
				{innerRadius}
				{outerRadius}
				startAngle={0}
				endAngle={Math.PI * 2}
				fill="var(--colors-foreground)"
				stroke="var(--colors-background)"
			/>
			{#each ticks as tick}
				{@const angle = (tick * Math.PI) / 30}
				{@const length = tick % 5 === 0 ? 30 : 15}
				<line
					transform={`translate(${outerRadius * Math.sin(angle)}, ${
						-outerRadius * Math.cos(angle)
					})`}
					x1={0}
					y1={0}
					x2={-length * Math.sin(angle)}
					y2={length * Math.cos(angle)}
					stroke="var(--colors-text)"
					opacity={tick % 5 === 0 ? 1 : 0.5}
					stroke-width="2px"
					stroke-linejoin="round"
				/>
			{/each}
			<Arc
				innerRadius={20}
				{outerRadius}
				{startAngle}
				endAngle={end}
				animated
				fill="var(--colors-text)"
				style="fill-opacity: 0.25; stroke-opacity: 0.25;"
				stroke="var(--colors-text)"
			/>
			<Arc
				innerRadius={outerRadius - thickness}
				{outerRadius}
				{startAngle}
				endAngle={end}
				animated
				fill="var(--colors-primary)"
				stroke="transparent"
			/>
			{#each labels as label}
				{@const angle = scale(label)}
				<text
					transform={`translate(${labelRadius * Math.sin(angle)}, ${
						-labelRadius * Math.cos(angle)
					})`}
					text-anchor="middle"
					alignment-baseline="middle"
					fill="var(--colors-background)"
					style="font-size: 12px;"
					stroke="var(--colors-text)"
				>
					{label}
				</text>
			{/each}
		</Group>
	</Chart>
</div>
```

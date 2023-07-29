<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleBand, scaleRadial } from 'd3-scale';
	import Arc from '@visualisations/primatives/Arc.svelte';

	export let x: string;
	export let y: string;
	export let data: any[];

	export let yFormat = (y: any) => y;

	// dimensions
	let width = 0;
	let height = 0;

	let margin = {
		top: 10,
		left: 0,
		right: 0,
		bottom: 10
	};

	$: dimensions = {
		width: width,
		height: height,
		margins: margin,
		innerWidth: Math.max(width - margin.left - margin.right, 0),
		innerHeight: Math.max(height - margin.top - margin.bottom)
	};

	$: outerRadius = Math.min(dimensions.innerWidth, dimensions.innerHeight) / 2;
	$: innerRadius = outerRadius * 0.5;
	$: labelRadius = innerRadius * 0.85;

	// Accessors
	$: getX = (d: any) => d[x];
	$: getY = (d: any) => d[y];

	// scales
	$: xScale = scaleBand()
		.domain(data.map(getX))
		.range([0, 2 * Math.PI])
		.padding(0.05);

	$: yScale = scaleRadial().domain([0, 100]).range([innerRadius, outerRadius]).nice();

	// Axis ticks
	$: xTicks = xScale.domain().filter((d: any, i: number) => !(i % 5));
	$: yTicks = width < 400 ? yScale.ticks(2) : yScale.ticks(4);

	// Tooltip
	$: tooltip = {
		left: 0,
		top: 0,
		angle: 0,
		data: null
	};

	const handleMousemove = (datum: any) => {
		tooltip.data = getY(datum);

		const r = yScale(getY(datum));
		const angle = xScale(getX(datum)) + xScale.bandwidth() / 2;

		tooltip.left = r * Math.sin(angle);
		tooltip.top = -r * Math.cos(angle);
		tooltip.angle = angle;
	};

	const handleMouseLeave = () => {
		tooltip.data = null;
	};
</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
	<Chart {dimensions}>
		<g transform={`translate(${dimensions.innerWidth / 2}, ${dimensions.innerHeight / 2})`}>
			{#each data as datum, i}
				<Arc
					{innerRadius}
					outerRadius={yScale(100)}
					startAngle={xScale(getX(datum))}
					endAngle={xScale(getX(datum)) + xScale.bandwidth()}
					fill="var(--colors-foreground)"
					cornerRadius={2}
					stroke="var(--colors-background)"
					on:mousemove={() => handleMousemove(datum)}
					on:mouseleave={handleMouseLeave}
				/>
			{/each}
			{#each data as datum}
				<Arc
					{innerRadius}
					outerRadius={yScale(getY(datum))}
					startAngle={xScale(getX(datum))}
					endAngle={xScale(getX(datum)) + xScale.bandwidth()}
					fill="var(--colors-primary)"
					cornerRadius={2}
					stroke="transparent"
					style="pointer-events: none;"
				/>
			{/each}
			{#each xTicks as tick}
				<text
					x={labelRadius * Math.sin(xScale(tick) + xScale.bandwidth() / 2)}
					y={-labelRadius * Math.cos(xScale(tick) + xScale.bandwidth() / 2)}
					text-anchor="middle"
					alignment-baseline="middle"
					fill="var(--colors-text)"
					style="font-size: 0.75rem;"
					pointer-events="none"
				>
					{tick}
				</text>
			{/each}
			{#each yTicks as tick}
				<text
					x={0}
					y={-yScale(tick)}
					text-anchor="middle"
					alignment-baseline="baseline"
					fill="var(--colors-text)"
					style="font-size: 0.75rem;"
					stroke="var(--colors-background)"
					stroke-width="2px"
					paint-order="stroke"
					pointer-events="none"
				>
					{yFormat(tick)}
				</text>
			{/each}
			<circle cx={0} cy={0} r={innerRadius} fill="transparent" stroke="var(--colors-text)" />
			{#if tooltip.data}
				<text
					transform={`translate(${tooltip.left}, ${tooltip.top}) rotate(${
						(tooltip.angle * 180) / Math.PI
					})`}
					text-anchor="middle"
					alignment-baseline="baseline"
					fill="var(--colors-text)"
					style="font-size: 0.75rem;"
					stroke="var(--colors-background)"
					stroke-width="2px"
					paint-order="stroke"
					dy="-5px"
					pointer-events="none"
				>
					{yFormat(tooltip.data)}
				</text>
			{/if}
		</g>
	</Chart>
</div>

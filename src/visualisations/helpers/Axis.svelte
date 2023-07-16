<script lang="ts">
	import { getContext } from 'svelte';

	export let orientation = 'x';
	export let scale: any;
	export let label: string | undefined = undefined;
	export let formatTick = (d: any) => d;
	export let tickLength = 10;
	export let numberOfTicks = 4;
	export let hideAxisLine = false;

	const { dimensions: dimensionsStore } = getContext('Chart');
	$: dimensions = $dimensionsStore;

	$: ticks = scale.ticks(numberOfTicks);
</script>

<g
	class="Axis Axis--dimension-{orientation}"
	transform={`translate(0, ${orientation == 'x' ? dimensions.innerHeight : 0})`}
>
	{#if !hideAxisLine}
		<line
			class="Axis__line"
			x2={orientation == 'x' ? dimensions.innerWidth : 0}
			y2={orientation == 'y' ? dimensions.innerHeight : 0}
		/>
	{/if}
	{#each ticks as tick, i}
		<g
			transform={`translate(${(orientation == 'x' ? [scale(tick), 0] : [0, scale(tick)]).join(
				', '
			)})`}
		>
			<text
				class="Axis__tick"
				x={orientation === 'y' ? -16 : 0}
				y={orientation === 'x' ? 25 : 0}
				text-anchor={orientation == 'y' ? 'end' : 'middle'}
				alignment-baseline="middle"
			>
				{formatTick(tick)}
			</text>
			<line x2={orientation == 'x' ? 0 : -tickLength} y2={orientation == 'y' ? 0 : tickLength} />
		</g>
	{/each}
	{#if label}
		<text
			class="Axis__label"
			style="transform: translate({(orientation == 'x'
				? [dimensions.innerWidth / 2, 60]
				: [-56, dimensions.innerHeight / 2]
			)
				.map((d) => d + 'px')
				.join(', ')}) {orientation == 'y' ? 'rotate(-90deg)' : ''}"
		>
			{label}
		</text>
	{/if}
</g>

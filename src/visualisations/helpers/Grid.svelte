<script lang="ts">
	import { getContext } from 'svelte';

	export let orientation = 'x';
	export let scale: any;
	export let numberOfTicks = 4;
	export let stroke = 'var(--colors-grid)';
	export let strokeWidth = 2;

	const { dimensions: dimensionsStore } = getContext('Chart');
	$: dimensions = $dimensionsStore;

	$: ticks = scale.ticks(numberOfTicks);
</script>

<g
	class="Grid Grid--dimension-{orientation}"
	transform={`translate(0, ${orientation == 'x' ? dimensions.innerHeight : 0})`}
>
	{#each ticks as tick}
		<line
			transform={`translate(${(orientation == 'x' ? [scale(tick), 0] : [0, scale(tick)]).join(
				', '
			)})`}
			y2={orientation === 'x' ? -dimensions.innerHeight : 0}
			x2={orientation === 'y' ? dimensions.innerWidth : 0}
			stroke-width={strokeWidth}
			{stroke}
		/>
	{/each}
</g>

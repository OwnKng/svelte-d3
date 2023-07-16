<script lang="ts">
	import type { ScaleOrdinal } from 'd3-scale';
	const iconHeight = 15;

	export let scale: any;
	export let symbol = 'circle';

	const keys = scale.domain();
</script>

<div class="flex gap-2">
	{#each keys as key}
		<div class="flex gap-1 items-center">
			<svg width={iconHeight} height={iconHeight}>
				{#if symbol === 'circle'}
					<circle
						cx={iconHeight * 0.5}
						cy={iconHeight * 0.5}
						r={iconHeight * 0.5}
						fill={scale(key)}
					/>
				{:else}
					<rect x={0} y={0} width={iconHeight} height={iconHeight} fill={scale(key)} />
				{/if}
			</svg>
			{key}
		</div>
	{/each}
</div>

<script lang="ts">
	export let left = 0;
	export let top = 0;
	export let offsetX = 10;
	export let offsetY = 10;
	import { fade } from 'svelte/transition';
</script>

<div
	in:fade
	class="Tooltip absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-slate-900 text-sm shadow border rounded-sm"
	style="top: {top - offsetY}px; left: {left - offsetX}px;"
>
	<slot />
</div>

<style>
	.Tooltip {
		transition: top 0.3s ease-out, left 0.3s ease-out;
		transition-delay: 50ms;
		pointer-events: none;
	}
</style>

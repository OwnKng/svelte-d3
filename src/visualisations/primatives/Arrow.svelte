<script lang="ts">
	import { draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let x1: number;
	export let x2: number;
	export let y1: number;
	export let y2: number;
	export let id: string;
	export let style = '';

	$: r = Math.hypot(x1 - x2, y1 - y2) * 2;
	$: path = `M${x1},${y1} A${r},${r} 0,0,1 ${x2},${y2}`;

	let loaded = false;

	onMount(() => {
		loaded = true;
	});
</script>

{#if loaded}
	<g>
		<path
			in:draw={{
				duration: 2000,
				easing: quintOut
			}}
			d={path}
			stroke="red"
			fill="transparent"
			marker-end="url(#arrow)"
			{style}
		/>
	</g>
{/if}

<style>
	path {
		transition: opacity 0.2s ease-in-out;
	}
</style>

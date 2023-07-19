<script lang="ts">
	export let x = 0;
	export let y = 0;
	export let width = 0;
	export let height = 0;
	export let fill = 'black';
	export let style = '';

	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<rect
	class="Bar"
	transition:slide={{ delay: 100, duration: 500, easing: quintOut, axis: 'y' }}
	{x}
	{y}
	{height}
	{width}
	{fill}
	{style}
	on:mousemove
	on:mouseleave
/>

<style>
	.Bar {
		transition: y 0.5s ease;
	}
</style>

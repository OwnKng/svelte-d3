<script lang="ts">
	export let x = 0;
	export let y = 0;
	export let width = 0;
	export let height = 0;
	export let fill = 'black';
	export let styles = '';

	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
</script>

	<rect
		class="Bar"
		transition:slide={{ delay: 100, duration: 500, easing: quintOut, axis: 'y' }}
		{x}
		{y}
		{height}
		{width}
		{fill}
		style={styles}
	/>


### Line

```svelte
<script lang="ts">
	import { draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let path = '';
	export let color = 'black';

	export let style = '';

	let loaded = false;

	onMount(() => {
		loaded = true;
	});
</script>

{#if loaded}
	<path
		in:draw={{
			duration: 2000,
			easing: quintOut
		}}
		class={`Line`}
		d={path}
		{style}
		fill="transparent"
		stroke={color}
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
{/if}

<style>
	.Line {
		transition: all 0.3s ease-out;
	}
</style>
```

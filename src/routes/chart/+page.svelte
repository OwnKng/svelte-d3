<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import type { PageData } from './$types';

	let w = 100;
	let h = 100;

	export let data: PageData;
</script>

<h1 class="text-3xl font-bold mb-8">Chart</h1>

<h2>A responsive chart wrapper that can be filled with other elements</h2>
<span>My height is {h}px and my width is {w}px</span>

<div
	class="w-full h-graph border border-zinc-700 rounded"
	bind:clientWidth={w}
	bind:clientHeight={h}
>
	<Chart />
</div>
<div class="mt-8">
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

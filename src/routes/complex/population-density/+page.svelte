<script>
	import SpikeMap from './SpikeMap.svelte';
	import { population } from './data/population';

	export let data;
</script>

<div class="pb-2">
	<h1 class="text-3xl font-bold">UK Population Density</h1>
	<p class="text-zinc-400">Excludes areas with less than 1,000 people</p>
</div>
<figure class="w-full">
	<SpikeMap data={population} />
</figure>
<span class="text-sm text-zinc-400"
	>Based on analysis of
	<a class="underline" href="https://ghsl.jrc.ec.europa.eu/download.php">
		Global Human Settlement Layer</a
	></span
>

<h2 class="mt-4">Code</h2>
<svelte:component this={data.content} />

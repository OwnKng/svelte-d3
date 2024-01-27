<script lang="ts">
	import Button from '@components/Button.svelte';
	import { population } from './population';
	import UrbanPopulation from './UrbanPopulation.svelte';

	let selectedYear = 2020;

	export let data;
</script>

<div class="pb-2">
	<h1 class="text-3xl font-bold">Urban Population</h1>
	<p class="text-zinc-400">Overall population size and % of population living in cities</p>
</div>
<div class="flex flex-col py-2">
	<span class="font-bold text-sm">Year</span>
	<div class="flex gap-2">
		{#each [1980, 2000, 2020] as year}
			<Button active={selectedYear === year} on:click={() => (selectedYear = year)}>{year}</Button>
		{/each}
	</div>
</div>
<figure class="w-full h-[800px]">
	<UrbanPopulation
		data={population.filter((d) => d.year === selectedYear)}
		x1="urban_population"
		x2="rural_population"
	/>
</figure>
<span class="text-sm text-gray-500">Source: World Bank</span>

<h2 class="mt-4">Code</h2>
<svelte:component this={data.content} />

<script lang="ts">
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
	<div
		class="flex w-fit rounded-sm shadow divide-x divide-midnight-25 border border-midnight-25 text-sm"
	>
		{#each [1980, 2000, 2020] as year}
			<button
				class="{selectedYear === year
					? 'bg-midnight-25'
					: 'bg-midnight-75'} px-4 py-1 hover:underline"
				on:click={() => (selectedYear = year)}>{year}</button
			>
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

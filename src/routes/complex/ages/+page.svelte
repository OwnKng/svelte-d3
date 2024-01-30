<script lang="ts">
	import { group } from 'd3-array';
	import { population_x_age } from './population_x_age';
	import { population_x_world } from './world';
	import Distribution from './Distribution.svelte';
	import { scaleThreshold } from 'd3-scale';
	import Button from '@components/Button.svelte';
	import World from './World.svelte';
	import { format } from 'd3-format';

	let colorScale = scaleThreshold(
		[20, 65, 100],
		['var(--colors-midnight-25)', 'var(--colors-primary)', 'var(--colors-midnight-25)']
	);

	let selected = 2020;

	const order = population_x_age
		.filter((d) => d.year === 2020)
		.sort((a, b) => b.median_age - a.median_age)
		.map((d) => d.location);

	$: locations = [...new Set(population_x_age.map((d) => d.location))].sort(
		(a, b) => order.indexOf(a) - order.indexOf(b)
	);
	$: grouped = group(population_x_age, (d) => d.location);

	$: world = population_x_world.filter((d) => d.year === selected);
</script>

<div class="pb-2">
	<h1 class="text-3xl font-bold">Share of population by age</h1>
</div>
<div class="sticky top-0 bg-midnight z-20 pt-4 pb-2 flex flex-col gap-1">
	<p>
		<span class="bg-primary text-midnight px-1 rounded shadow-sm">Working age</span> and
		<span class="bg-midnight-25 text-white px-1 rounded shadow-sm">Non-working age</span>
	</p>
	<div class="flex gap-2">
		{#each [1980, 2000, 2020] as year}
			<Button active={selected == year} on:click={() => (selected = year)}>
				{year}
			</Button>
		{/each}
	</div>
</div>
<div>
	<h3>World</h3>
	<figure class="w-full h-[420px]">
		<World data={world} x="age_group" y="share" {colorScale} yFormat={(d) => format('.0%')(d)} />
	</figure>
</div>
<div class="w-full grid md:grid-cols-4 md:gap-4 grid-cols-2 gap-3 pt-4">
	{#each locations as location}
		{@const filtered = grouped.get(location).filter((d) => d.year === selected)}
		<figure class="w-full h-[120px] flex flex-col overflow-hidden">
			<div>
				<h3 class="pb-0 text-xs md:text-sm font-normal whitespace-nowrap">{location}</h3>
			</div>
			<div class="w-full h-full bg-midnight-75 rounded-sm shadow-sm">
				<Distribution data={filtered} x="age_group" y="share" {colorScale} />
			</div>
		</figure>
	{/each}
</div>

<script lang="ts">
	import { group } from 'd3-array';
	import { population_x_age } from './population_x_age';
	import Distribution from './Distribution.svelte';
	import { scaleThreshold } from 'd3-scale';
	import Button from '@components/Button.svelte';

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
</script>

<div class="sticky top-0 bg-midnight border-b z-20 px-2 pt-4 pb-2 border-midnight-75">
	{#each [1980, 2000, 2020] as year}
		<Button on:click={() => (selected = year)}>
			{year}
		</Button>
	{/each}
</div>
<div class="w-full grid md:grid-cols-4 md:gap-2 grid-cols-3 gap-1 pt-4">
	{#each locations as location}
		{@const filtered = grouped.get(location).filter((d) => d.year === selected)}
		<div
			class="w-full h-[120px] flex flex-col border border-midnight-25 rounded-sm overflow-hidden shadow divide-y divide-midnight-25"
		>
			<div class="bg-midnight-50">
				<h3 class="text-xs md:text-sm px-2 py-1 font-normal whitespace-nowrap">{location}</h3>
			</div>
			<div class="w-full h-full">
				<Distribution
					data={filtered}
					x="age_group"
					y="share"
					median={filtered[0].median_age}
					{colorScale}
				/>
			</div>
		</div>
	{/each}
</div>

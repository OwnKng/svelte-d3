<script lang="ts">
	import Button from '@components/Button.svelte';
	import Error from '@components/Error.svelte';
	import Skeleton from '@components/Skeleton.svelte';
	import AreaStack from '@visualisations/charts/AreaStack.svelte';
	import { format } from 'd3-format';

	export let data;

	let selected = 'United States';
</script>

<h1 class="text-3xl font-bold mb-8">Stacked Area</h1>

<div>
	{#await data.streamed.data}
		<div class="w-full h-graph rounded">
			<Skeleton />
		</div>
	{:then value}
		<div>
			<span class="uppercase text-xs">Select Country</span>
			<div class="flex gap-2 flex-wrap mb-2">
				{#each ['United States', 'United Kingdom', 'Japan', 'China', 'India'] as country}
					<Button on:click={() => (selected = country)} active={selected === country}>
						{country}
					</Button>
				{/each}
			</div>
		</div>
		<h3 class="text-lg font-bold mb-2">Labor force composition</h3>
		<figure class="w-full h-graph rounded">
			<AreaStack
				data={value.series
					.filter((d) => d.country === selected)
					.flatMap(({ value, date, ...d }) => {
						return [
							{ ...d, date: parseInt(date), gender: 'Female', value },
							{ ...d, date: parseInt(date), gender: 'Male', value: 100 - value }
						];
					})}
				x="date"
				y="value"
				color="gender"
				yFormat={(d) => format('.0%')(d / 100)}
			/>
		</figure>
		<span class="text-sm text-gray-500">Source: World Bank</span>
	{:catch error}
		<Error />
	{/await}
</div>
<div>
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

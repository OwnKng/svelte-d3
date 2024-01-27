<script lang="ts">
	import type { PageData } from './$types';
	import Error from '@components/Error.svelte';
	import Skeleton from '@components/Skeleton.svelte';
	import Button from '@components/Button.svelte';
	import Difference from '@visualisations/charts/Difference.svelte';
	import { format } from 'd3-format';

	export let data: PageData;

	let selected = 'United States';

	const countries = ['United States', 'China', 'Japan', 'France', 'United Kingdom', 'Germany'];
</script>

<h1 class="text-3xl font-bold mb-8">Difference</h1>

{#await data.streamed.data}
	<div class="w-full h-graph rounded">
		<Skeleton />
	</div>
{:then value}
	<div class="flex gap-2 flex-wrap mb-2">
		{#each countries as country}
			<Button active={selected === country} on:click={() => (selected = country)}>{country}</Button>
		{/each}
	</div>
	<h3 class="text-lg font-bold mb-2">Imports and exports, % of GDP</h3>
	<figure class="w-full h-graph rounded">
		<Difference
			data={value
				.filter((v) => v.country === selected)
				.slice()
				.sort((a, b) => a.year - b.year)}
			x="year"
			y0="imports"
			y1="exports"
			yFormat={(d) => format('.1%')(d / 100)}
		/>
	</figure>
	<span class="text-sm text-gray-500">Source: World Bank</span>
{:catch}
	<Error />
{/await}

<h2 class="mt-4">Code</h2>
<svelte:component this={data.content} />

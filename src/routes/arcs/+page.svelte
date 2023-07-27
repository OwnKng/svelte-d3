<script lang="ts">
	import Arcs from '@visualisations/charts/Arcs.svelte';
	import type { PageData } from './$types';
	import Skeleton from '@components/Skeleton.svelte';

	import Error from '@components/Error.svelte';

	export let data: PageData;

	let selected = 'United States';
</script>

{#await data.streamed.data}
	<div class="w-full h-graph rounded">
		<Skeleton />
	</div>
{:then value}
	<div>
		<span class="uppercase text-xs">Select Country</span>
		<div class="flex gap-2 flex-wrap mb-2">
			<button
				on:click={() => (selected = 'United States')}
				class="border rounded px-3 py-1 shadow rounded-full
		{selected === 'United States'
					? 'bg-emerald-400 text-zinc-900 border-emerald-600'
					: 'border-zinc-400 text-zinc-200'}"
			>
				United States
			</button>
			<button
				on:click={() => (selected = 'China')}
				class="border rounded px-3 py-1 shadow rounded-full
		{selected === 'China'
					? 'bg-emerald-400 text-zinc-900 border-emerald-600'
					: 'border-zinc-400 text-zinc-200'}"
			>
				China
			</button>
			<button
				on:click={() => (selected = 'India')}
				class="border rounded px-3 py-1 shadow rounded-full
		{selected === 'India'
					? 'bg-emerald-400 text-zinc-900 border-emerald-600'
					: 'border-zinc-400 text-zinc-200'}"
			>
				India
			</button>
		</div>
	</div>
	<h3 class="text-lg font-bold mb-2">
		{value.indicator}
	</h3>
	<figure class="w-full h-graph">
		<Arcs
			data={value.series
				.filter((d) => d.country === selected)
				.flatMap((d) => [
					{ category: 'Rural', value: d.value },
					{ category: 'Urban', value: 100 - d.value }
				])}
			color="category"
			value="value"
		/>
	</figure>
	<span class="text-sm text-gray-500">Source: World Bank</span>
{:catch error}
	<Error />
{/await}

<h2>Code</h2>
<svelte:component this={data.content} />

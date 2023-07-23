<script lang="ts">
	import type { PageData } from './$types';
	import { formatPercent } from '@utils';
	import Skelteton from '@components/Skeleton.svelte';
	import BarChart from '@visualisations/charts/BarChart.svelte';

	export let data: PageData;

	let selected = 'United States';
</script>

<h1 class="text-3xl font-bold mb-8">Bars</h1>

{#await data.streamed.data}
	<div class="w-full h-graph rounded">
		<Skelteton />
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
					: 'border-zinc-400 text-zinc-200'}
            "
			>
				United States
			</button>
			<button
				on:click={() => (selected = 'United Kingdom')}
				class="border rounded px-3 py-1 shadow rounded-full
            {selected === 'United Kingdom'
					? 'bg-emerald-400 text-zinc-900 border-emerald-600'
					: 'border-zinc-400 text-zinc-200'}"
			>
				United Kingdom
			</button>
			<button
				on:click={() => (selected = 'Japan')}
				class="border rounded px-3 py-1 shadow rounded-full
            {selected === 'Japan'
					? 'bg-emerald-400 text-zinc-900 border-emerald-600'
					: 'border-zinc-400 text-zinc-200'}"
			>
				Japan
			</button>
		</div>
	</div>
	<h3 class="text-lg font-bold mb-2">
		{value.indicator}
	</h3>
	<figure class="w-full h-graph">
		<BarChart
			data={value.series.filter((d) => d.country === selected)}
			x="date"
			y="value"
			yFormat={(y) => formatPercent(y, 0, 0.01)}
		/>
	</figure>
	<span class="text-sm text-gray-500">Source: World Bank</span>
{:catch error}
	<p>{error.message}</p>
{/await}
<div class="mt-8">
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

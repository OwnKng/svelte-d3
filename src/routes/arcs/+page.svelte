<script lang="ts">
	import Arcs from '@visualisations/charts/Arcs.svelte';
	import type { PageData } from './$types';
	import Skeleton from '@components/Skeleton.svelte';

	import Error from '@components/Error.svelte';
	import Button from '@components/Button.svelte';

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
			<Button on:click={() => (selected = 'United States')} active={selected === 'United States'}>
				United States
			</Button>
			<Button on:click={() => (selected = 'China')} active={selected === 'China'}>China</Button>
			<Button on:click={() => (selected = 'India')} active={selected === 'India'}>India</Button>
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

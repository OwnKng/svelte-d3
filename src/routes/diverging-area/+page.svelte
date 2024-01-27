<script lang="ts">
	import DivergingArea from '@visualisations/charts/DivergingArea.svelte';
	import Skeleton from '@components/Skeleton.svelte';
	import Error from '@components/Error.svelte';
	import { format } from 'd3-format';

	export let data;
</script>

<h1 class="text-3xl font-bold mb-8">Diverging Area</h1>

{#await data.streamed.data}
	<div class="w-full h-graph rounded">
		<Skeleton />
	</div>
{:then values}
	<h3 class="text-lg font-bold mb-2">GDP growth, % annual</h3>
	<figure class="w-full h-graph rounded">
		<DivergingArea
			data={values.series}
			x="date"
			y="value"
			yFormat={(d) => format('.1%')(d / 100)}
		/>
	</figure>
	<span class="text-sm text-gray-500">Source: World Bank</span>
{:catch}
	<Error />
{/await}

<h2 class="mt-4">Code</h2>
<svelte:component this={data.content} />

<script lang="ts">
	import DivergingArea from '@visualisations/charts/DivergingArea.svelte';
	import Skeleton from '@components/Skeleton.svelte';
	import Error from '@components/Error.svelte';

	export let data;
</script>

{#await data.streamed.data}
	<div class="w-full h-graph rounded">
		<Skeleton />
	</div>
{:then values}
	<h3 class="text-lg font-bold mb-2">Imports and exports, % of GDP</h3>
	<figure class="w-full h-graph rounded">
		<DivergingArea data={values.series} x="date" y="value" />
	</figure>
	<span class="text-sm text-gray-500">Source: World Bank</span>
{:catch}
	<Error />
{/await}

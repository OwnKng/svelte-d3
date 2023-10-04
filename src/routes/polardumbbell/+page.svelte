<script lang="ts">
	import Error from '@components/Error.svelte';
	import Skeleton from '@components/Skeleton.svelte';
	import PolarDumbell from '@visualisations/charts/PolarDumbell.svelte';

	export let data: any;
</script>

<h1 class="text-3xl font-bold mb-8">Polar Dumbbell</h1>

{#await data.streamed.data}
	<div class="w-full h-graph rounded">
		<Skeleton />
	</div>
{:then value}
	<h3>{value.indicator}</h3>
	<figure class="w-full h-graph">
		<PolarDumbell data={value.series} x="countryCode" y="value" color="date" />
	</figure>
	<span class="text-sm text-gray-500">Source: World Bank</span>
{:catch}
	<Error />
{/await}
<h2>Code</h2>
<svelte:component this={data.content} />

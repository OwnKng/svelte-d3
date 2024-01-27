<script lang="ts">
	import BarStack from '@visualisations/charts/BarStack.svelte';
	import { format } from 'd3-format';
	import Skeleton from '@components/Skeleton.svelte';
	import Error from '@components/Error.svelte';

	export let data;
</script>

<h1 class="text-3xl font-bold mb-8">Stacked Bar</h1>

{#await data.streamed.data}
	<div class="w-full h-graph rounded">
		<Skeleton />
	</div>
{:then value}
	<h3 class="text-lg font-bold mb-2">
		{value.indicator}
	</h3>
	<figure class="w-full h-graph">
		<BarStack
			data={value.series}
			x="date"
			y="value"
			color="country"
			xFormat={(d) => d}
			yFormat={(d) => format('.2s')(d)}
		/>
	</figure>
	<span class="text-sm text-gray-500">Source: World Bank</span>
{:catch error}
	<Error />
{/await}

<h2>Code</h2>
<svelte:component this={data.content} />

<script lang="ts">
	import MultiLine from '@visualisations/charts/MultiLine.svelte';
	import { format } from 'd3-format';
	import Skeleton from '@components/Skeleton.svelte';
	import type { PageData } from './$types';
	import Error from '@components/Error.svelte';

	export let data: PageData;
</script>

<h1 class="text-3xl font-bold mb-8">Multiple lines</h1>

{#await data.streamed.data}
	<div class="w-full h-graph rounded">
		<Skeleton />
	</div>
{:then value}
	<h3 class="text-lg font-bold mb-2">
		{value.indicator}
	</h3>
	<figure class="w-full h-graph">
		<MultiLine
			data={value.series.filter((d) => d.value !== null).sort((a, b) => a.date - b.date)}
			x="date"
			y="value"
			color="country"
			xFormat={(d) => d}
			yFormat={(d) => format('$.2s')(d)}
		/>
	</figure>
{:catch error}
	<Error />
{/await}

<span class="text-sm text-gray-500">Source: World Bank</span>
<h2>Code</h2>
<svelte:component this={data.content} />

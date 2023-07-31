<script lang="ts">
	import type { PageData } from './$types';
	import Error from '@components/Error.svelte';
	import Skeleton from '@components/Skeleton.svelte';
	import PolarStack from '@visualisations/charts/PolarStack.svelte';
	import { format } from 'd3-format';

	export let data: PageData;
</script>

<h1 class="text-3xl font-bold mb-8">Polar Stack</h1>

{#await data.streamed.data}
	<div class="w-full h-graph rounded">
		<Skeleton />
	</div>
{:then value}
	<h3 class="text-lg font-bold mb-2">% of population by age</h3>
	<figure class="w-full h-graph rounded">
		<PolarStack
			data={value}
			x="countryCode"
			y="value"
			color="indicator"
			yFormat={(y) => format('.0%')(y / 100)}
		/>
	</figure>
	<span class="text-sm text-gray-500">Source: World Bank</span>
{:catch}
	<Error />
{/await}

<h2>Code</h2>
<svelte:component this={data.content} />

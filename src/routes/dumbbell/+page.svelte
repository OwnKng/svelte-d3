<script lang="ts">
	import type { PageData } from './$types';
	import Error from '@components/Error.svelte';
	import Skeleton from '@components/Skeleton.svelte';
	import Dumbell from '@visualisations/charts/Dumbell.svelte';

	export let data: PageData;
</script>

<h1 class="text-3xl font-bold mb-8">Dumbbell</h1>

{#await data.streamed.data}
	<div class="w-full h-graph rounded">
		<Skeleton />
	</div>
{:then value}
	<h3 class="text-lg font-bold mb-2">
		{value.indicator}
	</h3>
	<div class="w-full h-graph rounded">
		<Dumbell data={value.series} x="value" y="country" color="date" />
	</div>
{:catch}
	<Error />
{/await}
<h2>Code</h2>
<svelte:component this={data.content} />

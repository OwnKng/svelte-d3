<script lang="ts">
	import Beeswarms from '@visualisations/charts/Beeswarms.svelte';
	import { format } from 'd3-format';
	import { gdpPerCap } from '$lib/_data/gdp';

	export let data;
</script>

<h1 class="text-3xl font-bold mb-8">Beeswarms</h1>

<h2>GDP per capita</h2>
<p>Point size shows population</p>
<figure class="w-full h-graph">
	<Beeswarms
		data={gdpPerCap}
		x="gdp_per_cap"
		y="region"
		radius="population"
		color="region"
		label="country"
		xFormat={(d) => format('.2s')(d)}
	/>
</figure>
<span class="text-sm text-gray-500">Source: World Bank</span>
<div class="mt-8">
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

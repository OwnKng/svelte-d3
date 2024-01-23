<script lang="ts">
	import Beeswarm from '@visualisations/charts/Beeswarm.svelte';
	import { format } from 'd3-format';
	import { gdpPerCap } from '$lib/_data/gdp';

	export let data;
</script>

<h1 class="text-3xl font-bold mb-8">Beeswarm</h1>

<h2>GDP per capita</h2>
<p>Point size shows population</p>
<figure class="w-full h-[340px]">
	<Beeswarm
		data={gdpPerCap}
		x="gdp_per_cap"
		radius="population"
		color="region"
		label="country"
		xFormat={(d) => format('.2s')(d).replace('G', 'B')}
	/>
</figure>
<span class="text-sm text-gray-500">Source: World Bank</span>

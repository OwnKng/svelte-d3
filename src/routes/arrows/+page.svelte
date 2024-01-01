<script lang="ts">
	import { pivotLonger, innerJoin } from '@utils';
	import Arrows from '@visualisations/charts/Arrows.svelte';
	import { format } from 'd3-format';

	export let data;

	$: gdp_wide = pivotLonger(data.gdpPerCap, 'country', 'date', 'value', 'gdp');
	$: life_exp_wide = pivotLonger(data.lifeExp, 'country', 'date', 'value', 'life_exp');

	$: joined = innerJoin(gdp_wide, life_exp_wide, 'country');
</script>

<h1 class="text-3xl font-bold mb-8">Arrows</h1>
<h2>Changes to GDP per capita and life expectancy, 1980 - 2020</h2>
<figure class="w-full h-graph">
	<Arrows
		data={joined}
		x1="gdp_1980"
		x2="gdp_2020"
		y1="life_exp_1980"
		y2="life_exp_2020"
		label="country"
		formatX={(d) => format('.2s')(d)}
		xLabel="GDP per capita"
		yLabel="Life expectancy"
	/>
</figure>
<span class="text-sm text-gray-500">Source: World Bank</span>
<div>
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

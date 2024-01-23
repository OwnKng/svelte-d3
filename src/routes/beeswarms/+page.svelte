<script lang="ts">
	import Beeswarms from '@visualisations/charts/Beeswarms.svelte';
	import { randomExponential, randomNormal } from 'd3-random';
	import { format } from 'd3-format';
	import { gdpPerCap } from '$lib/_data/gdp';

	const one = randomNormal(100, 20);
	const two = randomNormal(200, 20);
	const three = randomNormal(300, 20);

	const radiusScale = randomExponential(20);

	let data = new Array(60)
		.fill(0)
		.map((_, i) =>
			i < 20
				? { v: 'alpha', h: one(), r: radiusScale() }
				: i < 40
				? { v: 'beta', h: two(), r: radiusScale() }
				: { v: 'gamma', h: three(), r: radiusScale() }
		);
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
		xFormat={(d) => format('.2s')(d).replace('G', 'B')}
	/>
</figure>
<span class="text-sm text-gray-500">Source: World Bank</span>

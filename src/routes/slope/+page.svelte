<script lang="ts">
	import Slope from '@visualisations/charts/Slope.svelte';
	import { randomNormal } from 'd3-random';

	const observations = [
		{
			group: 'Group one',
			x: 'Alpha'
		},
		{
			group: 'Group one',
			x: 'Bravo'
		},
		{
			group: 'Group one',
			x: 'Charlie'
		},
		{
			group: 'Group one',
			x: 'Delta'
		},
		{
			group: 'Group one',
			x: 'Echo'
		},
		{
			group: 'Group one',
			x: 'Fravo'
		},
		{
			group: 'Group two',
			x: 'Alpha'
		},
		{
			group: 'Group two',
			x: 'Bravo'
		},
		{
			group: 'Group two',
			x: 'Charlie'
		},
		{
			group: 'Group two',
			x: 'Delta'
		},
		{
			group: 'Group two',
			x: 'Echo'
		},
		{
			group: 'Group two',
			x: 'Fravo'
		}
	];

	const randomSmall = randomNormal(50, 10);
	const randomLarge = randomNormal(80, 20);

	let chartData = observations.map((d) => ({
		...d,
		y: d.group === 'Group one' ? randomSmall() : randomLarge()
	}));

	function regenerateData() {
		chartData = chartData.map((d) => ({
			...d,
			y: d.group === 'Group one' ? randomSmall() : randomLarge()
		}));
	}
</script>

<div class="w-full h-graph border">
	<Slope data={chartData} x="x" y="y" color="group" />
</div>

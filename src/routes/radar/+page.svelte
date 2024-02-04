<script lang="ts">
	import Button from '@components/Button.svelte';
	import Radar from '@visualisations/charts/Radar.svelte';
	import { randomNormal } from 'd3-random';

	export let data;

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

<h1 class="text-3xl font-bold mb-8">Radar</h1>

<Button on:click={regenerateData}>Regenerate data</Button>
<div class="w-full h-graph">
	<Radar data={chartData} x="x" y="y" color="group" />
</div>
<div class="mt-8">
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

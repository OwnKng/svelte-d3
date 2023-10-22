<script>
	import Voronoi from '@visualisations/charts/Voronoi.svelte';

	export let data;

	const points = Array(120)
		.fill(0)
		.map((_, i) => ({
			x: Math.random() * 100,
			y: Math.random() * 100,
			id: i
		}));
</script>

<div class="w-full h-graph">
	<Voronoi data={points} x="x" y="y" />
</div>
<div>
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

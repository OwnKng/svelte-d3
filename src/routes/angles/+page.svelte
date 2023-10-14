<script lang="ts">
	import Button from '@components/Button.svelte';
	import Angles from '@visualisations/charts/Angles.svelte';

	export let data;

	let angles = new Array(4)
		.fill(0)
		.map(() => [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2]);

	const regenerate = () => {
		angles = new Array(4)
			.fill(0)
			.map(() => [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2]);
	};
</script>

<h1 class="text-3xl font-bold mb-8">Angles</h1>
<Button on:click={regenerate}>Regenerate data</Button>
<div class="w-full grid lg:grid-cols-2">
	{#each angles as datum}
		<div class="h-graph w-full">
			<Angles startAngle={datum[0]} endAngle={datum[1]} />
		</div>
	{/each}
</div>

<h2>Code</h2>

<svelte:component this={data.content} />

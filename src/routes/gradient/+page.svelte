<script lang="ts">
	import Gradient from '@visualisations/helpers/Gradient.svelte';

	export let data;

	let w = 0;
	let h = 0;
</script>

<h1 class="text-3xl font-bold mb-8">Gradient</h1>
<div class="w-full h-graph">
	<div class="w-full h-full rounded-lg overflow-hidden" bind:clientWidth={w} bind:clientHeight={h}>
		<svg width={w} height={h}>
			<defs>
				<Gradient id="gradient" x1="0" x2="100%" y1="0" y2="100%" colors={['#06b6d4', '#cffafe']} />
			</defs>
			<rect x={0} y={0} width={w} height={h} fill="url(#gradient)" />
		</svg>
	</div>
</div>
<div>
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

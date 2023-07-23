<script lang="ts">
	import LegendOrdinal from '@visualisations/helpers/LegendOrdinal.svelte';
	import { scaleOrdinal } from 'd3-scale';
	import { colorPalette } from '@visualisations/util';
	import type { PageData } from './$types';

	export let data: PageData;

	$: colorScale = scaleOrdinal().domain(['Alpha', 'Beta', 'Gamma']).range(colorPalette);
</script>

<h1 class="text-3xl font-bold mb-8">Legend</h1>

<div class="w-full relative mb-12">
	<LegendOrdinal scale={colorScale} />
</div>
<div>
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

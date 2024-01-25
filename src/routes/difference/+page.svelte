<script lang="ts">
	import { format } from 'd3-format';
	import Difference from '@visualisations/charts/Difference.svelte';

	export let data;
</script>

<div>
	<h2>
		GDP per capita in the <span
			class="text-midnight rounded px-2 shadow"
			style="background-color: #C1EEFF;">United Kingdom</span
		>
		and
		<span class="text-midnight rounded px-2 shadow" style="background-color: #34d399;">Japan</span>
	</h2>
	<figure class="w-full h-graph">
		<Difference
			data={data.streamed.series}
			x="date"
			y0="Japan"
			y1="United Kingdom"
			aboveFill="#34d399"
			belowFill="#C1EEFF"
			yFormat={(d) => format('.2s')(d)}
		/>
	</figure>
</div>

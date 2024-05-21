<script>
	import GroupedBar from '@visualisations/charts/GroupedBar.svelte';
	import { format } from 'd3-format';

	export let data;
</script>

<div class="w-full h-graph">
	<GroupedBar
		data={data.data}
		x="date"
		y="value"
		color="indicator"
		yFormat={(x) => format('.0%')(x / 100)}
	/>
</div>

<script lang="ts">
	import Axis from './Axis.svelte';

	export let scale: any;
	export let label = '';
	export let numberOfTicks = 4;

	export let formatTick = (d: any) => d;
</script>

<Axis orientation="x" {scale} {label} {formatTick} {numberOfTicks} />

<script lang="ts">
	import Axis from './Axis.svelte';

	export let scale: any;
	export let label = '';
	export let numberOfTicks = 4;
	export let hideAxisLine = false;
	export let hideTicks = false;
	export let tickValues: any[] = [];

	export let formatTick = (d: any) => d;
</script>

<Axis
	orientation="y"
	{scale}
	{label}
	{formatTick}
	{numberOfTicks}
	{hideAxisLine}
	{hideTicks}
	{tickValues}
/>

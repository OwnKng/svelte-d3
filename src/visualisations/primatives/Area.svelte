<script lang="ts">
	export let path = '';
	export let color = 'black';
	export let style = '';
	export let opacity = 1;
</script>

<path class={`Area`} d={path} {style} fill={color} {opacity} />

<style>
	.Area {
		transition: all 0.3s ease-out;
	}
</style>

<script lang="ts">
	export let path = '';
	export let color = 'black';
	export let style = '';
</script>

<path class={`Area`} d={path} {style} fill={color} opacity={0.2} />

<script lang="ts">
	export let x = 0;
	export let y = 0;
	export let width = 0;
	export let height = 0;
	export let fill = 'black';
	export let stroke = 'none';
	export let style = '';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<rect class="Bar" {x} {y} {height} {width} {fill} {style} {stroke} on:mousemove on:mouseleave />

<style>
	.Bar {
		transition: all 0.5s ease;
	}
</style>

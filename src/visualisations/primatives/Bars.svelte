<script lang="ts">
	export let data: Iterable<any>;
	export let x: (d: any) => number;
	export let y: (d: any) => number;
	export let height: (d: any) => number;
	export let width: (d: any) => number;
	export let fill: any;
</script>

{#each data as datum, i}
	<rect
		x={x(datum)}
		y={y(datum)}
		height={height(datum)}
		width={width(datum)}
		fill={typeof fill === 'function' ? fill(datum) : fill}
	/>
{/each}

<style>
	.rect {
		transition: all 0.3s ease-out;
	}
</style>

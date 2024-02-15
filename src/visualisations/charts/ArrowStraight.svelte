<script lang="ts">
	export let x1: number;
	export let x2: number;
	export let y1: number;
	export let y2: number;
	export let style = '';
	export let color = 'black';

	$: path = `M${x1},${y1} L${x2},${y2}`;
</script>

<g>
	<path d={path} stroke={color} fill="transparent" marker-end="url(#arrow)" {style} />
</g>

<script lang="ts">
	import { symbol, symbolTriangle } from 'd3-shape';

	export let size = 100;
	export let x = 0;
	export let y = 0;
	export let fill = 'black';
	export let filled = true;
	export let stroke = 'black';

	$: triangle = symbol().type(symbolTriangle).size(size);
</script>

<path
	d={triangle()}
	transform={`translate(${x}, ${y})`}
	fill={filled ? fill : 'transparent'}
	{stroke}
/>

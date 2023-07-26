<script lang="ts">
	import { arc } from 'd3-shape';

	export let innerRadius = 0;
	export let outerRadius = 0;
	export let startAngle = 0;
	export let endAngle = 0;

	export let d: any[];
	export let fill = 'black';
	export let stroke = 'black';
	export let style = '';

	$: path = arc().innerRadius(innerRadius).outerRadius(outerRadius);
</script>

<path
	{...$$restProps}
	d={path({
		startAngle,
		endAngle
	})}
	{fill}
	{stroke}
	{style}
/>

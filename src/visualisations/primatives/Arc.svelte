<script lang="ts">
	import { arc } from 'd3-shape';

	export let innerRadius = 0;
	export let outerRadius = 0;
	export let startAngle = 0;
	export let endAngle = 0;
	export let cornerRadius = 0;
	export let padAngle = 0;

	export let fill = 'black';
	export let stroke = 'black';
	export let style = '';

	$: path = arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius)
		.startAngle(startAngle)
		.endAngle(endAngle)
		.cornerRadius(cornerRadius)
		.padAngle(padAngle) as any;
</script>

<path class="Arc" d={path()} {fill} {stroke} {style} />

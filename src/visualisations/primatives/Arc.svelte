<script lang="ts">
	import { arc } from 'd3-shape';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let innerRadius = 0;
	export let outerRadius = 0;
	export let startAngle = 0;
	export let endAngle = 0;
	export let cornerRadius = 0;
	export let padAngle = 0;
	export let animated = false;
	export let opacity = 1;

	export let fill = 'transparent';
	export let stroke = 'black';
	export let style = '';

	$: value = tweened(startAngle, { duration: 1000, easing: cubicOut });
	$: value.set(endAngle);

	$: path = arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius)
		.startAngle(startAngle)
		.endAngle(animated ? $value : endAngle)
		.cornerRadius(cornerRadius)
		.padAngle(padAngle) as any;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<path class="Arc" d={path()} {fill} {stroke} {style} on:mousemove on:mouseleave />

<script>
	export let width = 7;
	export let length = 0;
	export let x = 0;
	export let y = 0;
	export let fill = 'black';
	export let opacity = 0.5;
</script>

<g transform={`translate(${x},${y})`}>
	<path d={`M${-width / 2},0L0,${-length}L${width / 2},0`} {fill} {opacity} />
	<path d={`M${-width / 2},0L0,${-length}L${width / 2},0`} fill="none" stroke={fill} />
</g>

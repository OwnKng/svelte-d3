### Panel

```svelte
<script lang="ts">
	export let width = 0;
	export let height = 0;

	export let xScale: any;
	export let numTicksX = 4;
	export let numTicksY = 4;
	export let yScale: any;

	$: xTicks = xScale.ticks(numTicksX);
	$: yTicks = yScale.ticks(numTicksY);
</script>

<g class="Panel">
	<rect class="Panel__Background" x={0} {width} {height} />
	<g class="Panel_Columns" transform={`translate(0, ${height})`}>
		{#each xTicks as tick}
			<line transform={`translate(${[xScale(tick), 0].join(', ')})`} y2={-height} x2={0} />
		{/each}
	</g>
	<g class="Panel_Rows">
		{#each yTicks as tick}
			<line transform={`translate(${[0, yScale(tick)].join(', ')})`} y2={0} x2={width} />
		{/each}
	</g>
</g>
```

# Hello world!

```svelte
<script lang="ts">
	export let x: number;
	export let y: number;
	export let radius: number = 10;
	export let fill: string = 'black';
	export let stroke: string = 'transparent';
	export let style = '';
</script>

<circle class="Circle" cx={x} cy={y} r={radius} {fill} {style} {stroke} />

<style>
	circle {
		transition: all 0.3s ease-out;
	}
</style>
```

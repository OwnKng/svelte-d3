<script lang="ts">
	import TooltipWithBounds from '@visualisations/helpers/TooltipWithBounds.svelte';

	import Chart from '@visualisations/primatives/Chart.svelte';
	import { DEFAULT_MARGIN } from '@visualisations/util';

	let w = 0;
	let h = 0;
	let margins = DEFAULT_MARGIN;

	$: dimensions = {
		width: w,
		height: h,
		margins,
		innerHeight: Math.max(h - margins.top - margins.bottom, 0),
		innerWidth: Math.max(w - margins.left - margins.right, 0)
	};

	let m = { x: margins.left, y: margins.top };

	function handleMouseMove(event: MouseEvent) {
		m.x = event.offsetX;
		m.y = event.offsetY;
	}
</script>

<h1 class="text-3xl font-bold mb-8">Tooltips</h1>

<h2 class="text-2xl font-bold">TooltipWithBounds</h2>

<div>
	<div class="h-graph w-full relative" bind:clientWidth={w} bind:clientHeight={h}>
		<Chart {dimensions}>
			<circle cx={m.x - margins.left} cy={m.y - margins.top} r={10} fill="var(--colors-primary)" />
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<rect
				x={0}
				y={0}
				width={dimensions.innerWidth}
				height={dimensions.innerHeight}
				on:mousemove={handleMouseMove}
				fill="transparent"
				stroke="var(--colors-grid)"
			/>
		</Chart>
		<TooltipWithBounds left={m.x} top={m.y} parentDimensions={dimensions}>
			<div>
				<h3 class="font-bold">I know my limit!</h3>
				<p>This tooltip stays inside the box</p>
			</div>
		</TooltipWithBounds>
	</div>
</div>

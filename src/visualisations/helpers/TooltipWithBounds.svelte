<script lang="ts">
	export let left = 0;
	export let top = 0;
	export let offsetX = 10;
	export let offsetY = 10;

	export let parentDimensions = {
		width: 100,
		height: 100
	};

	$: width = 0;
	$: height = 0;

	$: rightPlacementClippedPx = left + offsetX + width - parentDimensions.width;
	$: leftPlacementClippedPx = width - left - offsetX;
	$: placeTooltipLeft = rightPlacementClippedPx > 0 && leftPlacementClippedPx < 0;

	$: bottomPlacementClippedPx = top + offsetY + height - parentDimensions.height;
	$: topPlacementClippedPx = height - top - offsetY;
	$: placeTooltipTop = bottomPlacementClippedPx > 0 && topPlacementClippedPx < 0;

	$: adjustedLeft = Math.round(placeTooltipLeft ? left - width - offsetX : left + offsetX);

	$: adjustedTop = Math.round(placeTooltipTop ? top - height - offsetY : top + offsetY);

	$: transform = `translate(${adjustedLeft}px, ${adjustedTop}px)`;
</script>

<div
	bind:clientWidth={width}
	bind:clientHeight={height}
	class="Tooltip w-fit whitespace-nowrap bg-white text-slate-900 text-sm shadow border rounded-sm px-1"
	style="transform: {transform};"
>
	<slot />
</div>

<style>
	.Tooltip {
		position: absolute;
		top: 0px;
		left: 0px;
		pointer-events: none;
	}
</style>

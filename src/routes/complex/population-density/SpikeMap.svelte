<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { max, descending } from 'd3-array';
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { geoAzimuthalEqualArea, geoPath } from 'd3-geo';
	import Spike from './Spike.svelte';
	import { format } from 'd3-format';

	// _ Geojson data of the UK shape
	import uk from './data/uk.json';

	export let data: any[] = [];
	export let x = 'lon';
	export let y = 'lat';
	export let height = 'population';
	export let margins = { top: 10, left: 10, right: 10, bottom: 10 };

	let w = 0;
	let h = 0;

	$: sorted = data.sort((a, b) => descending(getHeight(a), getHeight(b)));

	$: dimensions = {
		width: w,
		height: h,
		margins: margins,
		innerWidth: w - margins.left - margins.right,
		innerHeight: h - margins.top - margins.bottom
	};

	// Accessors
	$: getX = (d: any) => d[x];
	$: getY = (d: any) => d[y];
	$: getHeight = (d: any) => d[height];

	// Scales
	$: heightScale = scaleLinear([0, max(data, getHeight)], [0, w < 500 ? 120 : 250]);

	$: projection = geoAzimuthalEqualArea()
		.translate([dimensions.innerWidth / 2, dimensions.innerHeight / 2])
		.fitSize([dimensions.innerWidth, dimensions.innerHeight], uk)
		.precision(0.1);

	$: pathGenerator = geoPath().projection(projection);
</script>

<div class="w-full md:h-map h-graph relative" bind:clientWidth={w} bind:clientHeight={h}>
	<Chart {dimensions}>
		{#each uk.features as d}
			<path
				d={pathGenerator(d)}
				fill="var(--colors-midnight-75)"
				stroke="var(--colors-midnight-25)"
			/>
		{/each}
		{#each sorted as d}
			{@const [x, y] = projection([getX(d), getY(d)])}
			<Spike
				{x}
				{y}
				length={heightScale(getHeight(d))}
				fill="var(--colors-primary)"
				width={w < 500 ? 7 : 12}
			/>
		{/each}
	</Chart>
	<div style="bottom: {margins.bottom}px" class="absolute left-0 flex items-end gap-1 text-sm">
		{#each heightScale.ticks(4) as tick}
			<div class="text-xs text-white w-full h-full flex flex-col justify-end items-center">
				<svg class="w-full" height={heightScale(tick)} width="12">
					<Spike
						x={12}
						y={heightScale(tick)}
						length={heightScale(tick)}
						fill="var(--colors-primary)"
						width={w < 500 ? 7 : 12}
					/>
				</svg>
				{format('.3s')(tick)}
			</div>
		{/each}
	</div>
</div>

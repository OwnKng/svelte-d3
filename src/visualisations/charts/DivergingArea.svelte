<script lang="ts">
	import Chart from '@visualisations/primatives/Chart.svelte';
	import { scaleLinear } from 'd3-scale';
	import { area, curveBasis, line } from 'd3-shape';
	import { extent } from 'd3-array';
	import ClipPath from '@visualisations/helpers/ClipPath.svelte';
	import AxisBottom from '@visualisations/helpers/AxisBottom.svelte';
	import AxisLeft from '@visualisations/helpers/AxisLeft.svelte';
	import Gradient from '@visualisations/helpers/Gradient.svelte';
	import Line from '@visualisations/primatives/Line.svelte';

	export let data: any[];
	export let x: string;
	export let y: string;
	export let margins = { top: 30, right: 20, bottom: 40, left: 60 };
	export let threshold = 0;
	export let id = Math.random();
	export let aboveColors = ['#2dd4bf', '#ccfbf1'];
	export let belowColors = ['#f56565', '#fed7d7'];

	const aboveColorsId = crypto.randomUUID();
	const belowColorsId = crypto.randomUUID();

	let width = 0;
	let height = 0;

	$: dimensions = {
		width: width,
		height: height,
		margins: margins,
		innerWidth: width - margins.left - margins.right,
		innerHeight: height - margins.top - margins.bottom
	};

	$: getX = (d: any) => d[x];
	$: getY = (d: any) => d[y];

	// Scale
	$: xScale = scaleLinear(extent(data, getX), [0, dimensions.innerWidth]).clamp(true);
	$: yScale = scaleLinear(extent(data, getY), [dimensions.innerHeight, 0]).nice();

	// Below 0
	$: below = data.map((d) => (getY(d) < threshold ? d : { ...d, y: threshold }));
	$: above = data.map((d) => (getY(d) >= threshold ? d : { ...d, y: threshold }));

	// Clip paths
	$: belowPath = area()
		.x((d) => xScale(getX(d)))
		.y0(() => yScale(yScale.domain()[0]))
		.y1(() => yScale(threshold))
		.curve(curveBasis);

	$: abovePath = area()
		.x((d) => xScale(getX(d)))
		.y0(() => yScale(yScale.domain()[1]))
		.y1(() => yScale(threshold))
		.curve(curveBasis);

	// Area
	$: areaGenerator = area()
		.x((d) => xScale(getX(d)))
		.y0(() => yScale(threshold))
		.y1((d) => yScale(getY(d)))
		.curve(curveBasis);

	// Line
	$: lineGenerator = line()
		.x((d) => xScale(getX(d)))
		.y((d) => yScale(getY(d)))
		.curve(curveBasis);
</script>

<div class="w-full h-full" bind:clientHeight={height} bind:clientWidth={width}>
	<Chart {dimensions}>
		<defs>
			<Gradient id={aboveColorsId} colors={aboveColors} y2="100%" x2="0" />
			<Gradient id={belowColorsId} colors={belowColors} y2="-100%" x2="0" />
		</defs>
		<g>
			<ClipPath id="above-clip-path-{id}">
				<path d={abovePath(above)} />
			</ClipPath>
			<ClipPath id="below-clip-path-{id}">
				<path d={belowPath(below)} />
			</ClipPath>
		</g>
		<path
			d={areaGenerator(data)}
			clip-path="url(#above-clip-path-{id})"
			stroke-width={0}
			style="fill: url(#{aboveColorsId});"
		/>
		<path
			d={areaGenerator(data)}
			clip-path="url(#below-clip-path-{id})"
			stroke-width={0}
			style="fill: url(#{belowColorsId});"
		/>
		<Line path={lineGenerator(above)} />
		<Line path={lineGenerator(below)} />
		<line
			x1={0}
			x2={dimensions.innerWidth}
			y1={yScale(threshold)}
			y2={yScale(threshold)}
			stroke="var(--colors-grid)"
		/>
		<AxisBottom scale={xScale} />
		<AxisLeft scale={yScale} />
	</Chart>
</div>

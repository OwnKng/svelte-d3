### Axis

```svelte
<script lang="ts">
	import { getContext } from 'svelte';

	export let orientation = 'x';
	export let scale: any;
	export let label: string | undefined = undefined;
	export let formatTick = (d: any) => d;
	export let tickLength = 10;
	export let numberOfTicks = 4;
	export let hideAxisLine = false;
	export let hideTicks = false;
	export let tickValues: any[] = [];
	export let bottom = 0;
	export let left = 0;
	export let style = '';

	//@ts-ignore
	const { dimensions: dimensionsStore } = getContext('Chart');
	$: dimensions = $dimensionsStore;

	$: ticks = tickValues.length
		? tickValues
		: scale.ticks
		? scale.ticks(numberOfTicks)
		: scale.domain();

	$: padding = scale.bandwidth ? scale.bandwidth() / 2 : 0;
</script>

<g
	class="Axis Axis--dimension-{orientation}"
	transform={`translate(${left}, ${orientation == 'x' ? dimensions.innerHeight - bottom : 0})`}
>
	{#if !hideAxisLine}
		<line
			class="Axis__line"
			x2={orientation == 'x' ? dimensions.innerWidth : 0}
			y2={orientation == 'y' ? dimensions.innerHeight : 0}
		/>
	{/if}
	{#each ticks as tick, i}
		<g
			transform={`translate(${(orientation == 'x'
				? [scale(tick) + padding, 0]
				: [0, scale(tick) + padding]
			).join(', ')})`}
		>
			<text
				class="Axis__tick"
				x={orientation === 'y' ? -16 : 0}
				y={orientation === 'x' ? 25 : 0}
				text-anchor={orientation == 'y' ? 'end' : 'middle'}
				alignment-baseline="middle"
				{style}
			>
				{formatTick(tick)}
			</text>
			{#if !hideTicks}
				<line x2={orientation == 'x' ? 0 : -tickLength} y2={orientation == 'y' ? 0 : tickLength} />
			{/if}
		</g>
	{/each}

	{#if label}
		<text
			class="Axis__label"
			style="transform: translate({(orientation == 'x'
				? [dimensions.innerWidth / 2, 60]
				: [-56, dimensions.innerHeight / 2]
			)
				.map((d) => d + 'px')
				.join(', ')}) {orientation == 'y' ? 'rotate(-90deg)' : ''}"
		>
			{label}
		</text>
	{/if}
</g>
```

### AxisLeft

```svelte
<script lang="ts">
	import Axis from './Axis.svelte';

	export let scale: any;
	export let label = '';
	export let numberOfTicks = 4;
	export let hideAxisLine = false;
	export let hideTicks = false;
	export let tickValues: any[] = [];

	export let formatTick = (d: any) => d;
</script>

<Axis
	orientation="y"
	{scale}
	{label}
	{formatTick}
	{numberOfTicks}
	{hideAxisLine}
	{hideTicks}
	{tickValues}
/>
```

### AxisBottom

```svelte
<script lang="ts">
	import Axis from './Axis.svelte';

	export let scale: any;
	export let label = '';
	export let numberOfTicks = 4;
	export let hideAxisLine = false;
	export let hideTicks = false;
	export let tickValues: any[] = [];

	export let formatTick = (d: any) => d;
</script>

<Axis
	orientation="x"
	{scale}
	{label}
	{formatTick}
	{numberOfTicks}
	{tickValues}
	{hideAxisLine}
	{hideTicks}
/>
```

### AxisTop

```svelte
<script lang="ts">
	import { getContext } from 'svelte';

	export let scale: any;
	export let label: string | undefined = undefined;
	export let formatTick = (d: any) => d;
	export let tickLength = 5;
	export let numberOfTicks = 4;
	export let hideAxisLine = false;
	export let hideTicks = false;
	export let tickValues: any[] = [];
	export let bottom = 0;
	export let left = 0;
	export let style = '';

	//@ts-ignore
	const { dimensions: dimensionsStore } = getContext('Chart');
	$: dimensions = $dimensionsStore;

	$: ticks = tickValues.length
		? tickValues
		: scale.ticks
		? scale.ticks(numberOfTicks)
		: scale.domain();

	$: padding = scale.bandwidth ? scale.bandwidth() / 2 : 0;
</script>

<g
	class="Axis Axis--dimension-x"
	transform={`translate(${left}, ${dimensions.innerHeight - bottom})`}
>
	{#if !hideAxisLine}
		<line class="Axis__line" x2={dimensions.innerWidth} y2={0} />
	{/if}
	{#each ticks as tick, i}
		<g transform={`translate(${[scale(tick) + padding, 0].join(', ')})`}>
			<text
				class="Axis__tick"
				x={0}
				y={-15}
				text-anchor={'middle'}
				alignment-baseline="middle"
				{style}
			>
				{formatTick(tick)}
			</text>
			{#if !hideTicks}
				<line x2={0} y2={-tickLength} />
			{/if}
		</g>
	{/each}

	{#if label}
		<text
			class="Axis__label"
			style="transform: translate({[dimensions.innerWidth / 2, 60]
				.map((d) => d + 'px')
				.join(', ')}) "
		>
			{label}
		</text>
	{/if}
</g>
```

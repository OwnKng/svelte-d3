### Chart

```svelte
<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Group from './Group.svelte';

	export let dimensions = {
		width: 100,
		height: 100,
		margins: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		},
		innerWidth: 0,
		innerHeight: 0
	};

	let currentDimensions = writable(dimensions);

	$: {
		currentDimensions.set(dimensions);
	}

	setContext('Chart', {
		dimensions: currentDimensions
	});
</script>

<svg class="Chart" width={dimensions.width} height={dimensions.height}>
	<Group left={dimensions.margins.left} top={dimensions.margins.top}>
		<slot />
	</Group>
</svg>
```

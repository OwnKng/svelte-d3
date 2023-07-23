<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="text-3xl font-bold mb-8">Group</h1>

<div>
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

<script lang="ts">
	export let data;
</script>

<h1 class="text-3xl font-bold mb-8">Arrow</h1>

<div>
	<h2>Code</h2>
	<svelte:component this={data.content} />
</div>

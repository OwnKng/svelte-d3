<script lang="ts">
	import Grid from './Grid.svelte';

	export let scale = (d: any) => d;
</script>

<Grid orientation="y" {scale} />

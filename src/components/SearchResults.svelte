<script lang="ts">
	export let searchTerm: string;
	export let term: string;

	$: match = term.toLowerCase().match(searchTerm.toLowerCase());

	$: start = match?.index ?? 0;
	$: end = start + match?.[0].length ?? 0;
</script>

{#if match}
	<span>
		{term.slice(0, start)}<span class="bg-primary text-midnight-50">{term.slice(start, end)}</span
		>{term.slice(end)}
	</span>
{:else}
	<span>{term}</span>
{/if}

<script lang="ts">
	let open = false;
	import { navigating } from '$app/stores';

	$: closeNav = () => (open = false);

	$: navigating.subscribe(closeNav);
</script>

<div class="relative">
	<button class="text-lg text-emerald-400 font-bold mb-4 underline" on:click={() => (open = !open)}
		>Menu</button
	>
	{#if open}
		<div
			class="absolute bg-zinc-800 shadow-sm w-full border border-zinc-700 pl-2 pt-2 pb-4 rounded z-50"
		>
			<slot />
		</div>
	{/if}
</div>

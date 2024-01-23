<script lang="ts">
	let open = false;
	import { navigating } from '$app/stores';
	import { fly } from 'svelte/transition';

	$: closeNav = () => (open = false);

	$: navigating.subscribe(closeNav);
</script>

<div class="relative">
	<button class="text-lg px-2 text-primary font-bold mb-4 underline" on:click={() => (open = !open)}
		>Menu</button
	>
	{#if open}
		<div
			transition:fly={{ y: 100, duration: 200 }}
			class="absolute bg-midnight-75 shadow-sm w-full border-t border-midnight-50 pl-2 pt-2 pb-4 z-50"
		>
			<slot />
		</div>
	{/if}
</div>

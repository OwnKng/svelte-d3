<script lang="ts">
	import { navigating } from '$app/stores';
	import { fly } from 'svelte/transition';

	let open = false;

	$: closeNav = () => (open = false);

	$: navigating.subscribe(closeNav);
</script>

<div class="relative py-2 border-t border-b border-midnight-50 my-1">
	<div class="px-2">
		<button
			class="text-lg text-sm flex gap-2 w-fit px-1 items-center"
			on:click={() => (open = !open)}
		>
			<div class="w-6 h-full w-6 flex flex-col gap-1">
				<div class="bg-white h-0.5 w-6 rounded" />
				<div class="bg-white h-0.5 w-6 rounded" />
				<div class="bg-white h-0.5 w-6 rounded" />
			</div>
			Menu
		</button>
	</div>
	{#if open}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			transition:fly={{ x: -200, duration: 200 }}
			class="fixed w-full top-0 h-screen z-40 backdrop-blur-sm"
			on:click={(e) => {
				e.stopPropagation();
				open = false;
			}}
		>
			<div
				class="absolute pt-8 pb-40 overflow-y-auto top-0 left-0 h-full w-5/6 bg-midnight-75 shadow-sm border-r border-midnight-50 pl-2 pb-4 z-50"
			>
				<slot />
			</div>
		</div>
	{/if}
</div>

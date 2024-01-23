<script lang="ts">
	export let active = false;
</script>

<button
	class="px-3 py-1 border text-zinc-100 rounded shadow hover:bg-midnight-50 hover:border-midnight-25 transition"
	on:click
	class:bg-midnight-50={active}
	class:bg-midnight-75={!active}
	class:border-midnight-25={active}
	class:border-midnight-50={!active}
>
	<slot />
</button>

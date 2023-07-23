<script lang="ts">
	export let active: boolean;
	export let to: string;
</script>

<a class={`${active ? 'text-emerald-400' : 'text-zinc-300 underline'}`} href={to}>
	<slot />
</a>

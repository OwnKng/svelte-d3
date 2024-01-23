<script lang="ts">
	export let active: boolean;
	export let to: string;
</script>

<a class={`${active ? 'text-primary' : 'text-zinc-300 underline decoration-zinc-500'}`} href={to}>
	<slot />
</a>

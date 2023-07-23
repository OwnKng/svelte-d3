<script lang="ts">
	import { page } from '$app/stores';

	$: active = $page.url.pathname;
</script>

<div
	class="w-full h-graph bg-zinc-800 rounded flex items-center justify-center shadow my-2"
	data-sveltekit-reload
>
	<div class="flex-col gap-2 flex">
		<h3 class="text-xl">Uh oh! Something went wrong.</h3>
		<p>
			We were unable to load the data for this chart. Try again by <a
				class="underline text-emerald-400"
				href={active}
				>reloading the page
			</a>.
		</p>
	</div>
</div>

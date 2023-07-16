<script>
	import '@fontsource/nunito/400.css';
	import '@fontsource/nunito/800.css';
	import '@fontsource/source-code-pro';

	import '../app.css';

	import { page } from '$app/stores';

	$: active = $page.url.pathname;
</script>

<div class="w-full h-full min-h-screen bg-zinc-900 text-zinc-200">
	<div class="w-full max-w-content mx-auto">
		<header class="mb-12 pt-4 px-2 md:px-0">
			<a href="/" class="text-3xl text-zinc-50 font-bold">Svelte Viz</a>
			<p>A set of example graphs built with D3 and Svelte</p>
		</header>
		<div class="w-full flex flex-col gap-8 md:gap-2 md:grid md:grid-cols-4 px-2 md:px-0">
			<nav class="col-span-1">
				<p class="font-bold text-emerald-400">Examples</p>
				<ul class="flex flex-col gap-2 py-2">
					<li>
						<a
							class={`${
								active === '/scatterplot' ? 'text-emerald-400' : 'text-zinc-300 underline'
							}`}
							href="/scatterplot">Scatter plot</a
						>
					</li>
					<li>
						<a
							class={`${active === '/linechart' ? 'text-emerald-400' : 'text-zinc-300 underline'}`}
							href="/linechart">Line chart</a
						>
					</li>
					<li>
						<a
							class={`${active === '/multiline' ? 'text-emerald-400' : 'text-zinc-300 underline'}`}
							href="/multiline">Multiline chart</a
						>
					</li>
					<li>
						<a
							class={`${active === '/stackedbar' ? 'text-emerald-400' : 'text-zinc-300 underline'}`}
							href="/stackedbar">Stacked bar</a
						>
					</li>
				</ul>
			</nav>
			<main class="col-span-3">
				<slot />
			</main>
		</div>
	</div>
</div>

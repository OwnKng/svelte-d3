<script>
	import '@fontsource/nunito/400.css';
	import '@fontsource/nunito/800.css';
	import '@fontsource/source-code-pro';

	import '../app.css';
	import '../styles/code.css';

	import { page } from '$app/stores';

	$: active = $page.url.pathname;
</script>

<svelte:head>
	<title>Svelte Viz</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="A set of example graphs built with Svelte and D3" />
	<link rel="icon" type="image/png" href="/favicon.png" />
</svelte:head>

<div class="w-full h-full min-h-screen bg-zinc-900 text-zinc-200">
	<div class="w-full max-w-content mx-auto">
		<header class="mb-12 pt-4 px-2 md:px-0 flex items-start gap-8 justify-between">
			<div>
				<a href="/" class="text-3xl text-zinc-50 font-bold">Svelte Viz</a>
				<p>A set of example graphs built with Svelte and D3</p>
			</div>
			<div>
				<a href="" class="h-fit">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="currentColor"
						class="bi bi-github"
						viewBox="0 0 16 16"
					>
						<path
							d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
						/>
					</svg>
				</a>
			</div>
		</header>
		<div class="w-full flex flex-col gap-8 md:gap-2 md:grid md:grid-cols-4 px-2 md:px-0">
			<nav class="col-span-1 flex flex-col gap-3">
				<div>
					<p class="font-bold text-emerald-400">Primatives</p>
					<ul>
						<li>
							<a
								class={`${active === '/circle' ? 'text-emerald-400' : 'text-zinc-300 underline'}`}
								href="/circle">Circle</a
							>
						</li>
						<li>
							<a
								class={`${active === '/bar' ? 'text-emerald-400' : 'text-zinc-300 underline'}`}
								href="/bar">Bar</a
							>
						</li>
						<li>
							<a
								class={`${active === '/line' ? 'text-emerald-400' : 'text-zinc-300 underline'}`}
								href="/line">Line</a
							>
						</li>
					</ul>
				</div>
				<div>
					<p class="font-bold text-emerald-400">Charts</p>
					<ul>
						<li>
							<a
								class={`${
									active === '/scatterplot' ? 'text-emerald-400' : 'text-zinc-300 underline'
								}`}
								href="/scatterplot">Scatter</a
							>
						</li>
						<li>
							<a
								class={`${active === '/bars' ? 'text-emerald-400' : 'text-zinc-300 underline'}`}
								href="/bars">Bars</a
							>
						</li>
						<li>
							<a
								class={`${
									active === '/stackedbar' ? 'text-emerald-400' : 'text-zinc-300 underline'
								}`}
								href="/stackedbar">Stacked bars</a
							>
						</li>
						<li>
							<a
								class={`${
									active === '/linechart' ? 'text-emerald-400' : 'text-zinc-300 underline'
								}`}
								href="/linechart">Line</a
							>
						</li>
						<li>
							<a
								class={`${
									active === '/multiline' ? 'text-emerald-400' : 'text-zinc-300 underline'
								}`}
								href="/multiline">Multiline</a
							>
						</li>
					</ul>
				</div>
				<div>
					<p class="font-bold text-emerald-400">Helpers</p>
					<ul>
						<li>
							<a
								class={`${active === '/tooltip' ? 'text-emerald-400' : 'text-zinc-300 underline'}`}
								href="/tooltip">Tooltips</a
							>
						</li>
						<li>
							<a
								class={`${active === '/axis' ? 'text-emerald-400' : 'text-zinc-300 underline'}`}
								href="/axis">Axis</a
							>
						</li>
						<li>
							<a
								class={`${active === '/grid' ? 'text-emerald-400' : 'text-zinc-300 underline'}`}
								href="/grid">Grid</a
							>
						</li>
						<li>
							<a
								class={`${
									active === '/legendordinal' ? 'text-emerald-400' : 'text-zinc-300 underline'
								}`}
								href="/legendordinal">Legend Ordinal</a
							>
						</li>
					</ul>
				</div>
				<div>
					<p class="font-bold text-emerald-400">Misc</p>
					<ul>
						<li>
							<a
								class={`${active === '/facet' ? 'text-emerald-400' : 'text-zinc-300 underline'}`}
								href="/facet">Facet</a
							>
						</li>
					</ul>
				</div>
			</nav>
			<main class="col-span-3">
				<slot />
			</main>
		</div>
		<footer class="mt-12 text-sm text-zinc-300 px-2 md:px-0 pb-4">
			<p>Made by <a class="underline text-emerald-400" href="https://ownkng.dev">Owen King</a></p>
		</footer>
	</div>
</div>

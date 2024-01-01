<script lang="ts">
	import '@fontsource/nunito/400.css';
	import '@fontsource/nunito/800.css';
	import '@fontsource/source-code-pro';

	import '../app.css';
	import '../styles/code.css';
	import { links } from '../utils/links';

	import { page } from '$app/stores';
	import Link from '@components/Link.svelte';
	import MobileNavigation from '@components/MobileNav.svelte';

	$: active = $page.url.pathname;
</script>

<svelte:head>
	<title>Svelte x D3</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="A set of example graphs built with Svelte and D3" />
	<link rel="icon" type="image/png" href="/favicon.png" />
</svelte:head>

<div class="w-full h-full min-h-screen bg-background text-zinc-200">
	<div class="w-full max-w-content mx-auto">
		<header class="mb-12 pt-4 px-2 md:px-0 flex items-start gap-8 justify-between">
			<div>
				<a href="/" class="text-3xl text-zinc-50 font-bold">Svelte x D3</a>
				<p>A collection of data visualisations built with Svelte and D3</p>
			</div>
			<div>
				<a href="https://github.com/OwnKng/svelteviz" class="h-fit">
					<span class="sr-only">Github repo</span>
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
		<div class="md:hidden w-full px-2 relative">
			<MobileNavigation>
				<nav class="col-span-1 flex flex-col gap-3">
					{#each links as link}
						<div>
							<p class="font-bold text-emerald-400">{link.title}</p>
							<ul>
								{#each link.links as route}
									<li>
										<Link to={route.href} active={active === route.href}>{route.label}</Link>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</nav>
			</MobileNavigation>
		</div>
		<div class="w-full flex flex-col gap-8 md:gap-2 md:grid md:grid-cols-4 px-2 md:px-0">
			<nav class="col-span-1 flex flex-col gap-3 hidden md:flex">
				{#each links as link}
					<div>
						<p class="font-bold text-emerald-400">{link.title}</p>
						<ul>
							{#each link.links as route}
								<li>
									<Link to={route.href} active={active === route.href}>{route.label}</Link>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
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

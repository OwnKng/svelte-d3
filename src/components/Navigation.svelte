<script lang="ts">
	import { page } from '$app/stores';
	import { links } from '../utils/links';
	import Link from '@components/Link.svelte';
	import SearchResults from './SearchResults.svelte';
	import { navigating } from '$app/stores';

	let search = '';
	let input: HTMLInputElement;

	$: filtered = links.map((link) => {
		return {
			...link,
			links: link.links.filter((route) => {
				return route.label.toLowerCase().includes(search.toLowerCase());
			})
		};
	});

	$: active = $page.url.pathname;
	$: if ($navigating) search = '';
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === '/') {
			e.preventDefault();
			input.focus();
		}

		if (e.key === 'Escape') {
			input.blur();
		}
	}}
/>
<nav class="col-span-1 flex flex-col gap-3 hidden md:flex">
	<label for="search" class="sr-only"> Search </label>
	<input
		bind:this={input}
		id="search"
		placeholder="Search"
		autocomplete="off"
		bind:value={search}
		class="bg-midnight-75 rounded shadow py-2 px-1 focus:outline-0 mr-12 caret-primary"
	/>
	{#each filtered as link}
		<div>
			<p class="font-bold text-primary">{link.title}</p>
			<ul>
				{#each link.links as route}
					<li>
						<Link to={route.href} active={active === route.href}>
							<SearchResults searchTerm={search} term={route.label} />
						</Link>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>

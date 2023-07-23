<script lang="ts">
</script>

<div class="flex flex-col gap-8">
	<div>
		<h1 class="text-5xl font-bold mb-4"><span>&#128075;</span>{' '}Hey there.</h1>
		<p class="text-lg">
			Welcome! This is a collection of a few responsive and interactive data visualisations built
			using <a class="underline text-emerald-400" href="https://d3js.org/">D3</a> and
			<a class="underline text-emerald-400" href="https://kit.svelte.dev/">SvelteKit</a>.
		</p>
	</div>
	<div class="flex flex-col gap-4">
		<h2 class="text-2xl font-bold mb-0">Why?</h2>
		<ul class="flex flex-col gap-4 list-disc">
			<li>
				<p>
					D3 is an awesome library, but parts of it are focused on manipulating the DOM in a way
					that conflicts with Svelte's delcartive style. This collection uses D3 for things like
					manipulating data, creating scales, etc., but not for DOM manipulation.
				</p>
			</li>
			<li>
				<p>
					The collections are designed to be as generic as possible, so they can be copied and
					pasted into your own codebase with only a little adapatation. Basically, I wanted to
					create a repo where I had a bunch of graphs that I could reach for every time I need to
					create yet another bar chart, and I figured it might be useful to other people too.
				</p>
			</li>
		</ul>
		<p>
			These visualisations also use <a
				href="https://tailwindcss.com/"
				class="underline text-emerald-400">Tailwind</a
			> for some styling.
		</p>

		<p class="mt-4">
			Enjoy, <br />
			<a href="https://ownkng.dev" class="text-emerald-400 text-lg font-bold">Owen King</a>.
		</p>
	</div>
</div>

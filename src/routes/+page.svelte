<script lang="ts">
	import svelte_logo from '../lib/assets/svelte.png';
	import d3_logo from '../lib/assets/d3.png';
</script>

<div class="flex flex-col gap-8">
	<div class="flex items-center gap-4 justify-center pb-8">
		<img src={svelte_logo} alt="Svelte logo" class="w-16 h-auto" />
		<span class="text-5xl font-bold">x</span>
		<img src={d3_logo} alt="D3 logo" class="w-16 h-auto" />
	</div>
	<div>
		<h1 class="text-5xl font-bold mb-4"><span>&#128075;</span>{' '}Hey there.</h1>
		<p class="text-lg">
			Welcome! This is a collection of a few responsive and interactive data visualisations built
			using <a class="underline text-primary" href="https://d3js.org/">D3</a> and
			<a class="underline text-primary" href="https://svelte.dev/">Svelte</a>.
		</p>
	</div>
	<div class="flex flex-col gap-4">
		<h2 class="text-2xl font-bold mb-0">Why?</h2>
		<ul class="flex flex-col gap-4 list-disc">
			<li>
				<p>
					D3 is an awesome library, but parts of it are focused on manipulating the DOM in a way
					that conflicts with Svelte's delcartive syntax. This collection uses D3 for things like
					manipulating data, creating scales, etc., but not for DOM manipulation.
				</p>
			</li>
			<li>
				<p>
					The examples are designed to be as generic as possible, so they can be copied and pasted
					into your own codebase with only a little adapatation. Basically, I wanted to create a
					repo where I had a bunch of graphs that I could reach for every time I need to create yet
					another bar chart, and I figured it might be useful to other people too.
				</p>
			</li>
		</ul>
		<p>
			These visualisations also use <a
				href="https://tailwindcss.com/"
				class="underline text-primary">Tailwind</a
			> for some styling.
		</p>

		<p class="mt-4">
			Enjoy, <br />
			<a href="https://ownkng.dev" class="text-primary text-lg font-bold">Owen King</a>.
		</p>
	</div>
</div>

<style>
</style>

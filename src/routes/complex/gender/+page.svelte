<script lang="ts">
	import { population } from './population';
	import GenderChart from './GenderChart.svelte';

	export let data;
</script>

<div class="pb-2">
	<h1 class="text-3xl font-bold">Difference in male and female population in the UK</h1>
	<p class="text-zinc-400">1950 - 2021</p>
</div>
<figure class="w-full">
	<GenderChart data={population} x="age" y0="male" y1="female" />
</figure>
<span class="text-sm text-gray-500">Source: United Nations</span>

<p class="p-y">
	Inspired by this <a
		class="underline decoration-primary"
		href="https://flowingdata.com/2018/10/17/ask-the-question-visualize-the-answer/"
		>super article from Nathan Yau</a
	>.
</p>

<h2 class="mt-4">Code</h2>
<svelte:component this={data.content} />

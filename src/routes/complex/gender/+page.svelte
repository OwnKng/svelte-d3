<script lang="ts">
	import { population } from './population';
	import GenderChart from './GenderChart.svelte';
</script>

<div class="pb-2">
	<h1 class="text-3xl font-bold">Difference in male and female population in the UK</h1>
	<p class="text-zinc-400">1950 - 2021</p>
</div>
<figure class="w-full">
	<GenderChart data={population} x="age" y0="male" y1="female" />
</figure>
<span class="text-sm text-gray-500">Source: United Nations</span>

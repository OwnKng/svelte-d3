<script lang='ts'>
    import LegendOrdinal from "@visualisations/helpers/LegendOrdinal.svelte";
    import { scaleOrdinal } from "d3-scale";
    import { DEFAULT_MARGIN } from "@visualisations/util";
    import { colorPalette } from "@visualisations/util";

    $: colorScale = scaleOrdinal()
        .domain(["Alpha", "Beta", "Gamma"])
        .range(colorPalette);
</script>

<h1 class='text-3xl font-bold mb-8'>LegendOrdinal</h1>

<div class='h-graph w-full relative' >
    <LegendOrdinal
        scale={colorScale}
        color='var(--colors-primary)'
        style='stroke-width: 3;'
    />
</div>

<script>
  import { scaleLinear, scaleOrdinal } from "d3-scale";
  import { linkVertical, schemeAccent } from "d3"
  import { extent } from "d3-array";
  import { each } from "svelte/internal";

  export let width = 600;
  export let height = 600;
  export let circleRadius = 20;

  /** @type { Array<Object> } */
  export let items;
  /** @type { Array<Object> } */
  export let links;

  export let colorScale = scaleOrdinal([...new Set(items.map(i => i.type))],schemeAccent);

  const buffer = 20;
  const axisSpace = 50;

  let xExtent = extent(items, (d) => d.x);
  let yExtent = extent(items, (d) => d.y);

  let xScale = scaleLinear()
      .domain(xExtent)
      .range([buffer + axisSpace, width - buffer]);
    let yScale = scaleLinear()
      .domain(yExtent)
      .range([height - buffer - axisSpace, buffer]);

</script>

<svg {width} {height}>
    {#each items as item}
        {#if item.href}
            <a href={item.href} target="_blank">
                <circle
                    r= {circleRadius}
                    cx={xScale(item.x)}
                    cy={yScale(item.y)}
                    fill={colorScale(item.type)}
                />
            </a>
        {:else}
                <circle
                    r= {circleRadius}
                    cx={xScale(item.x)}
                    cy={yScale(item.y)}
                    fill={colorScale(item.type)}
                />
        {/if}
    {/each}
    {#each links as link}
        {@const source = items.find(e => e.id === link.nodes[0])}
        {@const target = items.find(e => e.id === link.nodes[1])}
        <path d={linkVertical()({source: [xScale(source.x), yScale(source.y)], target: [xScale(target.x), yScale(target.y)]})} fill="none" stroke="black" />
    {/each}

</svg>
<script>
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import { linkVertical, schemeAccent } from 'd3';
	import { extent } from 'd3-array';
	import { each } from 'svelte/internal';

	export let width = 0;
	export let height = 0;
	export let circleRadius = 20;

	/**
	 * @typedef item
	 * @type {Object}
	 * @property {number} x
	 * @property {number} y
	 * @property {string} label
	 * @property {string} color
	 * @property {number} id
	 * @property {string[]} links
	 * @property {string} type
	 * @property {string} href
	 */

	/** @type {item[]} */
	export let items;

	/**
	 * @typedef link
	 * @type {Object}
	 * @property {number} id
	 * @property {string} title
	 * @property {number[]} nodes
	 * @property {string} href
	 */

	/** @type { link[] } */
	export let links;

	export let colorScale = scaleOrdinal([...new Set(items.map((i) => i.type))], schemeAccent);

	const buffer = 20;
	const axisSpace = 50;

	$: xExtent = extent(items, (/** @type {item} */ d) => d.x);
	$: yExtent = extent(items, (/** @type {item} */ d) => d.y);

	$: xScale = scaleLinear()
		.domain(xExtent)
		.range([buffer + axisSpace, width - buffer]);
	$: yScale = scaleLinear()
		.domain(yExtent)
		.range([height - buffer - axisSpace, buffer]);

	const circleMouseover = (/** @type {Event} */ d) => {
		console.log(d);
		let circleRv = /** @type { EventTarget & {attributes: {r: {value: string}}} }*/ (d.target)
			?.attributes?.r?.value;
		if (circleRv) {
			console.log(circleRv);
			const r = parseInt(circleRv);
			if (r === circleRadius) {
				/** @type { EventTarget & {attributes: {r: {value: string}}} }*/ (
					d.target
				).attributes.r.value = `${circleRadius * 1.5}`;
			} else {
				/** @type { EventTarget & {attributes: {r: {value: string}}} }*/ (
					d.target
				).attributes.r.value = circleRadius.toString();
			}
		}
	};
</script>

<div class="plot" bind:clientWidth={width} bind:clientHeight={height}>
	<svg {width} {height}>
		{#each links as link}
			{@const source = items.find((e) => e.id === link.nodes[0]) ?? { x: 0, y: 0 }}
			{@const target = items.find((e) => e.id === link.nodes[1]) ?? { x: 0, y: 0 }}
			<path
				d={linkVertical()({
					source: [xScale(source.x), yScale(source.y)],
					target: [xScale(target.x), yScale(target.y)]
				})}
				fill="none"
				stroke="black"
			/>
		{/each}

		{#each items as item}
			{#if item.href}
				<a href={item.href} target="_blank" rel="noreferrer">
					<circle
						r={circleRadius}
						cx={xScale(item.x)}
						cy={yScale(item.y)}
						fill={colorScale(item.type)}
						on:mouseenter={circleMouseover}
						on:mouseleave={circleMouseover}
						on:focus={circleMouseover}
						on:blur={circleMouseover}
					/>
				</a>
			{:else}
				<circle
					r={circleRadius}
					cx={xScale(item.x)}
					cy={yScale(item.y)}
					fill={colorScale(item.type)}
				/>
			{/if}
		{/each}
	</svg>
</div>

<style lang="scss">
	.plot {
		height: 100%;
	}
</style>

<script>
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import { linkVertical, schemeAccent } from 'd3';
	import { extent } from 'd3-array';

	export let width = 0;
	export let height = 0;
	export let circleRadius = 20;

	/**
	 * @typedef item
	 * @type {Object}
	 * @property {number} x
	 * @property {number} y
	 * @property {number} id
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

	const buffer = 32;
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

	$: xPath = `M 0 0 H ${xScale.range()[1]}`;
</script>
<ul>
	<li>xScale: {xScale.range()}</li>
	<li>yScale: {yScale.range()}</li>
	<li>xExtent: {xExtent}</li>
</ul>
<div class="plot"
	bind:clientWidth={width}
	bind:clientHeight={height}>
	<svg width={width} height={height}>
		<g class="axis">
			<g transform="translate( {buffer} {5} )">
				<path d={xPath} stroke="black" />
			</g>
		</g>
		<!--<g class="axis">
			<g class="x-axis">
				<line x1={buffer} y1={yExtent[1]} x2={xScale.range()[1]} y2={yScale.range()[0]} stroke="black" />
				<text x={xScale.range()[1]} y={yScale.range()[0]} dy="1.5em">{xExtent[1]}</text>
				<text x={xScale.range()[0]} y={yScale.range()[0]} dy="1.5em">{xExtent[0]}</text>
			</g>
			<g class="y-axis">
				<line x1={xScale.range()[0]} y1={yScale.range()[0]} x2={xScale.range()[0]} y2={yScale.range()[1]} />
				<text x={xScale.range()[0]} y={yScale.range()[0]} dx="-1.5em" dy="0.5em">{yExtent[0]}</text>
				<text x={xScale.range()[0]} y={yScale.range()[1]} dx="-1.5em" dy="0.5em">{yExtent[1]}</text>
			</g>
		</g>-->

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
			<g transform="translate( {xScale(item.x)} {yScale(item.y)})">
				{#if item.href}
					<a href={item.href} target="_blank" rel="noreferrer">
						<circle
							r={circleRadius}
							cx={0}
							cy={0}
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
						cx={0}
						cy={0}
						fill={colorScale(item.type)}
					/>
				{/if}
			</g>
		{/each}
	</svg>
</div>

<style lang="scss">
	.plot {
		height: 100%;
	}
</style>
